import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../App";

function Host(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [seconds, setSeconds] = useState<number>(15);
    const [currentQuestion, setCurrentQuestion] = useState<{ question?: string; answers?: string[]; category?: string }>({});
    const [answer, setAnswer] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);
    
    const nameRef = useRef<string>("");
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
        socket.emit("done answering");
        const clientAnswer: boolean = correctAnswer;
        const clientName: string = nameRef.current;
        const clientTimer: NodeJS.Timeout | undefined = timerRef.current;

        clearInterval(clientTimer);
        if (clientAnswer) {
            await axios.post("/api/point", { value: 1, name: clientName });
        } else {
            await axios.post("/api/point", { value: -1, name: clientName });
        }

        setTimeout(() => {
            setName("");
            setAnswer("");
            setCorrectAnswer(false);
            axios.get("/api/question").then((res) => {
                setCurrentQuestion(res.data.question);
                setSeconds(15);
            });
        }, 2000);
    }

    useEffect(() => {
        currentQuestion.answers?.forEach((currentAnswer) => {
            if (answer.toLowerCase() === currentAnswer.toLowerCase()) {
                console.log("a")
                setCorrectAnswer(true);
                nameRef.current = name;
                nextQuestion();
            };
        });
    }, [answer, currentQuestion, name]);

    useEffect(() => {
        setName("");
        setAnswer("");
        setCorrectAnswer(false);
        axios.get("/api/question").then((res) => {
            setCurrentQuestion(res.data.question);
            setSeconds(15);
        });

        function onJoin() {
            console.log("connected");
            socket.emit("host");
        };
        function onClient(clientName: string) {
            nameRef.current = clientName
            setName(clientName);
            timer();
        };
        function handleAnswer(clientAnswer: string) {
            setAnswer(clientAnswer);
        };

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
        <div className="flex flex-col justify-center items-center w-full">
            <p className="flex justify-center items-center m-4 bg-main2 border-contrast p-4 border-4 rounded-lg w-2/3 h-32">{seconds}</p>
            <p className="flex justify-center items-center m-4 bg-main2 border-contrast p-4 border-4 rounded-lg w-2/3 h-32">{currentQuestion.question}</p>
            <p className="flex justify-center items-center m-4 bg-main2 border-contrast p-4 border-4 rounded-lg w-2/3 h-32">{name}</p>
            <p className={`flex justify-center items-center m-4 bg-main2 border-contrast p-4 border-4 rounded-lg w-2/3 h-32 ${correctAnswer && "text-correct"}`}>{answer}</p>
        </div>
    );
}

export default Host;
