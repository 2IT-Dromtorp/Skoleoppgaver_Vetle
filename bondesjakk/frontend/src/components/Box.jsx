import { useEffect, useState } from "react"
import { board, checkForWinner, gameIsOver } from "../Game"
import { socket } from "../App"

function Box({setXIsNext, boxNumber, myTurn, setMyTurn}) {
    const [value, setValue] = useState("")

    useEffect(() => {
        socket.on("made move", boxValue => updateBox(boxValue))

        return () => {
            socket.off("made move", boxValue => updateBox(boxValue))
        }
    }, [])

    useEffect(() => {
        board[boxNumber] = value
        checkForWinner()
    }, [value])

    function updateBox(boxValue) {
        setMyTurn((prev) => {
            return !prev
        })
        if (value || gameIsOver || boxValue != boxNumber) return
        setXIsNext((prev) => {
            {prev ? setValue("x") : setValue("o")}
            return !prev
        })
    }

    function handleChange() {
        if (!myTurn) return
        socket.emit("made move", boxNumber)
    }

    return(
        <div onClick={() => handleChange()} className="border border-black w-48 h-48 text-5xl flex justify-center items-center">
            <p>{value}</p>
        </div>
    )
}

export default Box