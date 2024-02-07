import { useEffect, useState } from "react";
import axios from "axios"
import { socket } from "../App";

function Host(): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [seconds, setSeconds] = useState<number>(10);
    const [currentQuestion, setCurrentQuestion] = useState<{"question"?: string, "answer"?: string, "category"?: string}>({})
    const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)

    function timer() {
        const clientTimer = setInterval(() => {
            setSeconds(prev => {
                console.log(prev)
                if (prev - 1 <= 0) {
                    nextQuestion()
                    clearInterval(clientTimer);
                };
                return prev - 1
            });
        }, 1000);
    }

    function nextQuestion() {
        if (correctAnswer) {
            axios.post("/api/point", {value})
        }
        setName("")
        setAnswer("")
        axios.get("/api/question").then((res) => {
            console.log(res.data.question);
            setCurrentQuestion(res.data.question)
            setSeconds(10)
        })
    }

    useEffect(() => {
        if (answer == currentQuestion.answer) {
            console.log("correct answer")
            setCorrectAnswer(true)
        }
    }, [answer, currentQuestion])

    useEffect(() => {
        nextQuestion()

        function onJoin() {
            // setJoined(true);
            console.log("connected");
            socket.emit("host");
        };
        function onDisconnect() {
            // setJoined(true);
            console.log("disconnected");
        };
        function handleAnswer(clientAnswer: string) {
            setAnswer(clientAnswer);
        };
        function onClient(clientName: string) {
            setName(clientName);
            timer();
        };

        socket.on("connect", onJoin);
        socket.on("disconnect", onDisconnect);
        socket.on("client connected", (clientName) => onClient(clientName));
        socket.on("answer changed", (clientAnswer) => handleAnswer(clientAnswer));

        return () => {
            socket.off("connect", onJoin);
            socket.off("disconnect", onDisconnect);
            socket.off("answer changed", (clientAnswer) => handleAnswer(clientAnswer));
        };
    }, []);
    
    return(
        <div>
            <p>{name}</p>
            <p>{seconds}</p>
            <p>{currentQuestion.question}</p>
            <p>{answer}</p>
        </div>
    )
}

export default Host