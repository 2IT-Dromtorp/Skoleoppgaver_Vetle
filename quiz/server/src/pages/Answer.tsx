import { useEffect, useRef, useState } from "react";
import { socket } from "../App";
import { useParams } from "react-router-dom";

function Answer(): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    const [canAnswer, setCanAnswer] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(15);
    const { name } = useParams<string>();

    const timerRef = useRef<NodeJS.Timeout>();

    function timer() {
        const clientTimer = setInterval(() => {
            setSeconds((prev) => {
                if ((prev * 10 - 0.1 * 10) / 10 <= 0) {
                    clearInterval(clientTimer);
                }
                return (prev * 10 - 0.1 * 10) / 10;
            });
        }, 100);
        timerRef.current = clientTimer;
    }

    useEffect(() => {
        socket.emit("answer changed", answer);
    }, [answer]);

    useEffect(() => {
        function onJoin() {
            console.log("connected");
            socket.emit("client", name);
        }
        function onDisconnect() {
            console.log("disconnected");
        }
        function tooSlow() {
            setCanAnswer(false);
        }
        function onAnswer() {
            setCanAnswer(true);
            timer();
        }
        function doneAnswering() {
            clearInterval(timerRef.current);
            setCanAnswer(false);
        }

        socket.on("connect", onJoin);
        socket.on("disconnect", onDisconnect);
        socket.on("answer", onAnswer);
        socket.on("too slow", tooSlow);
        socket.on("done answering", doneAnswering);

        return () => {
            socket.off("connect", onJoin);
            socket.off("disconnect", onDisconnect);
            socket.off("answer", onAnswer);
            socket.off("too slow", tooSlow);
            socket.off("done answering", doneAnswering);
        };
    }, []);

    function handleChange(value: string) {
        setAnswer(value);
    }

    return (
        <div className="flex flex-col justify-evenly items-center w-full h-screen">
            {canAnswer && (
                <div
                    className="absolute flex justify-center items-center top-6 right-6 rounded-full w-16 h-16 z-50 border-4 border-contrast isolate"
                    style={{
                        background: `conic-gradient(rgba(255,255,255,0) ${
                            360 - seconds * 24
                        }deg, rgba(255,255,255,1) ${360 - seconds * 24}deg)`,
                    }}
                >
                    <p className="mix-blend-difference">
                        {Math.round(seconds)}
                    </p>
                </div>
            )}
            <h1 className="p-3 bg-main2 bg-opacity-75 border-2 border-contrast rounded">
                {name}
            </h1>
            {canAnswer && (
                <input
                    type="text"
                    value={answer}
                    placeholder="Svar her"
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-3/4 h-32 p-4 mb-32 rounded-lg bg-main2 border-contrast border-2 focus:outline-none"
                />
            )}
        </div>
    );
}

export default Answer;
