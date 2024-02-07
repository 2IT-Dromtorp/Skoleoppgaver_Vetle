import { useEffect, useState } from "react";
import { socket } from "../App";
import { useParams } from "react-router-dom";

function Answer(): JSX.Element {
    // const [joined, setJoined] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    const {name} = useParams<string>()

    useEffect(() => {
        socket.emit("answer changed", answer);
    }, [answer]);

    useEffect(() => {
        function onJoin() {
            // setJoined(true);
            console.log("connected");
            socket.emit("client", name)
        };
        function onDisconnect() {
            // setJoined(true);
            console.log("disconnected");
        };

        socket.on("connect", onJoin);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onJoin);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    function handleChange(value: string) {
        setAnswer(value);
    };
    console.log(name)

    return(
        <div className="flex flex-col justify-evenly items-center w-full h-screen">
            <h1 className="">{name}</h1>
            <input type="text" value={answer} onChange={e => handleChange(e.target.value)} className="w-3/4 h-32 mb-32 rounded-lg bg-main2 border-contrast border-2 focus:outline-none" />
        </div>
    );
}

export default Answer;