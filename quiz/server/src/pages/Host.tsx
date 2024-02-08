import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../App";

function Host(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [seconds, setSeconds] = useState<number>(15);
    const [currentQuestion, setCurrentQuestion] = useState<{ question?: string; answer?: string; category?: string }>({});
    const [answer, setAnswer] = useState<string>("");
    
    const nameRef = useRef<string>("");
    const answerRef = useRef<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout>();


    function timer() {
        const clientTimer = setInterval(() => {
            setSeconds(prev => {
                if (prev - 1 <= 0) {
                    nextQuestion();
                    clearInterval(clientTimer);
                }
                return prev - 1;
            });
        }, 1000);
        timerRef.current = clientTimer;
    }

    async function nextQuestion() {
        const clientAnswer: boolean = answerRef.current;
        const clientName: string = nameRef.current;
        const clientTimer: NodeJS.Timeout | undefined = timerRef.current;

        clearInterval(clientTimer);
        if (clientAnswer) {
            await axios.post("/api/point", { value: 1, name: clientName });
        } else {
            await axios.post("/api/point", { value: -1, name: clientName });
        }
        setName("");
        setAnswer("");
        answerRef.current = false;
        axios.get("/api/question").then((res) => {
            setCurrentQuestion(res.data.question);
            setSeconds(15);
        });
    }

    useEffect(() => {
        if (answer.toLowerCase() === currentQuestion.answer?.toLowerCase()) {
            answerRef.current = true;
            nameRef.current = name;
            socket.emit("correct answer");
            nextQuestion();
        }
    }, [answer, currentQuestion, name]);

    useEffect(() => {
        nextQuestion();

        function onJoin() {
            console.log("connected");
            socket.emit("host");
        }
        function onClient(clientName: string) {
            nameRef.current = clientName
            setName(clientName);
            timer();
        }
        function handleAnswer(clientAnswer: string) {
            setAnswer(clientAnswer);
        }

        socket.on("connect", onJoin);
        socket.on("client connected", onClient);
        socket.on("answer changed", handleAnswer);

        return () => {
            socket.off("connect", onJoin);
            socket.off("client connected", onClient);
            socket.off("answer changed", handleAnswer);
        };
    }, []);

    return (
        <div>
            <p>{name}</p>
            <p>{seconds}</p>
            <p>{currentQuestion.question}</p>
            <p>{answer}</p>
        </div>
    );
}

export default Host;
