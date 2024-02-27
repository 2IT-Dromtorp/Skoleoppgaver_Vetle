import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../App";
import Leaderboard from "../components/Leaderboard";

function Host(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [seconds, setSeconds] = useState<number>(15);
    const [currentQuestion, setCurrentQuestion] = useState<{
        question?: string;
        answers?: string[];
        category?: string;
    }>({});
    const [answer, setAnswer] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);
    const [leaderboard, setLeaderboard] =
        useState<{ name: string; points: number }[]>();

    const nameRef = useRef<string>("");
    const timerRef = useRef<NodeJS.Timeout>();
    const correctAnswerRef = useRef<boolean>(false);

    function timer() {
        const clientTimer = setInterval(() => {
            setSeconds((prev) => {
                if ((prev * 10 - 0.1 * 10) / 10 <= 0) {
                    nextQuestion();
                    clearInterval(clientTimer);
                }
                return (prev * 10 - 0.1 * 10) / 10;
            });
        }, 100);
        timerRef.current = clientTimer;
    }

    function getLeaderboard() {
        axios.get("/api/getLeaderboard").then((res) => {
            const leaderboardData: { name: string; points: number }[] =
                res.data;
            leaderboardData.sort((a, b) => a.points - b.points).reverse();
            setLeaderboard(leaderboardData);
        });
    }

    async function nextQuestion() {
        socket.emit("done answering");
        const clientAnswer: boolean = correctAnswerRef.current;
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
            correctAnswerRef.current = false;
            axios.get("/api/question").then((res) => {
                setCurrentQuestion(res.data.question);
                setSeconds(15);
                getLeaderboard();
            });
        }, 5000);
    }

    useEffect(() => {
        currentQuestion.answers?.forEach((currentAnswer) => {
            if (answer.toLowerCase() === currentAnswer.toLowerCase()) {
                setCorrectAnswer(true);
                correctAnswerRef.current = true;
                nameRef.current = name;
                nextQuestion();
            }
        });
    }, [answer, currentQuestion, name]);

    useEffect(() => {
        setName("");
        setAnswer("");
        setCorrectAnswer(false);
        getLeaderboard();
        axios.get("/api/question").then((res) => {
            setCurrentQuestion(res.data.question);
            setSeconds(15);
        });

        function onJoin() {
            console.log("connected");
            socket.emit("host");
        }
        function onClient(clientName: string) {
            nameRef.current = clientName;
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
        <div className="flex flex-col justify-center items-center w-full">
            <div
                className="absolute flex justify-center items-center top-6 right-6 rounded-full w-16 h-16 z-50 border-4 border-contrast isolate"
                style={{
                    background: `conic-gradient(rgba(255,255,255,0) ${
                        360 - seconds * 24
                    }deg, rgba(255,255,255,1) ${360 - seconds * 24}deg)`,
                }}
            >
                <p className="mix-blend-difference">{Math.round(seconds)}</p>
            </div>
            <p className="flex justify-center items-center m-4 bg-main2 border-contrast p-4 border-4 rounded-lg w-1/3 h-32 bg-opacity-75">
                {currentQuestion.question}
            </p>
            <p className="flex justify-center items-center m-4 bg-main2 border-contrast p-4 border-4 rounded-lg w-1/3 h-32 bg-opacity-75">
                {name}
            </p>
            <p
                className={`flex justify-center items-center m-4 bg-main2 border-contrast p-4 border-4 rounded-lg w-1/3 h-32 bg-opacity-75 ${
                    correctAnswer && "text-correct"
                }`}
            >
                {answer}
            </p>
            <Leaderboard leaderboard={leaderboard} />
        </div>
    );
}

export default Host;
