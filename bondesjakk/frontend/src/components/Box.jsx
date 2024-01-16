import { useEffect, useState } from "react"
import { board, checkForWinner, gameIsOver } from "../Game"

function Box({xIsNext, setXIsNext, boxNumber}) {
    const [value, setValue] = useState("")

    useEffect(() => {
        board[boxNumber] = value
        console.log(checkForWinner())
    }, [value])

    function handleChange() {
        if (value || gameIsOver) return
        xIsNext ? 
        setValue("x") :
        setValue("o")
        setXIsNext(!xIsNext)
    }

    return(
        <div onClick={() => handleChange()} className="border border-black w-48 h-48 text-5xl flex justify-center items-center">
            <p>{value}</p>
        </div>
    )
}

export default Box