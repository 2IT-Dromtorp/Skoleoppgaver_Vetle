import { useContext, useEffect, useState } from "react"
import { board, checkForWinner, gameIsOver } from "../Game"
import { StartingContext, socket } from "../App"
import { useNavigate } from "react-router-dom"

function Box({setXIsNext, boxNumber}) {
    const [value, setValue] = useState("")
    const {myTurn, setMyTurn} = useContext(StartingContext)
    const navigate = useNavigate()

    useEffect(() => {
        socket.on("made move", boxValue => updateBox(boxValue))

        return () => {
            socket.off("made move", boxValue => updateBox(boxValue))
        }
    }, [])

    useEffect(() => {
        board[boxNumber] = value
        if (checkForWinner()) {
            navigate(`/winner/${checkForWinner()}`)
        }
    }, [value])

    function updateBox(boxValue) {
        setMyTurn(prev => {return !prev})
        if (value || gameIsOver || boxValue != boxNumber) return
        console.log("🤨")
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