import { useEffect, useState } from "react";
import { socket } from "../App";
import { useParams } from "react-router-dom";

function Answer(): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    const [canAnswer, setCanAnswer] = useState<boolean>(false);
    const {name} = useParams<string>();

    useEffect(() => {
        socket.emit("answer changed", answer);
    }, [answer]);

    useEffect(() => {
        function onJoin() {
            console.log("connected");
            socket.emit("client", name)
        };
        function onDisconnect() {
            console.log("disconnected");
        };
        function tooSlow() {
            setCanAnswer(false);
        };
        function onAnswer() {
            setCanAnswer(true);
        };
        function doneAnswering() {
            setCanAnswer(false);
        };

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
    };

    return(
        <div className="flex flex-col justify-evenly items-center w-full h-screen">
            <h1 className="">{name}</h1>
            {canAnswer && <input type="text" value={answer} onChange={e => handleChange(e.target.value)} className="w-3/4 h-32 mb-32 rounded-lg bg-main2 border-contrast border-2 focus:outline-none" />}
        </div>
    );
}

export default Answer;