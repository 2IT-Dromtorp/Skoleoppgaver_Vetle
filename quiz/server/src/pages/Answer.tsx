import { useEffect, useState } from "react"
import { socket } from "../App"

function Answer(): JSX.Element {
    const [answer, setAnswer] = useState<string>("")

    useEffect(() => {

    }, [answer])
    useEffect(() => {
        socket.on()
    }, [])

    return(
        <div className="flex flex-row justify-center items-center w-full h-screen">
            <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} className="w-3/4 rounded-lg bg-main2 border-contrast border-2 focus:outline-none" />
        </div>
    )
}

export default Answer