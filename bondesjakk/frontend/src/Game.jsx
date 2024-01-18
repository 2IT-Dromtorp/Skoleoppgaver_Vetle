import { useEffect, useState } from "react"
import Box from "./components/Box"
import { socket } from "./App"

export const board = ["", "", "", "", "", "", "", "", ""]
export let gameIsOver = false

export function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let isDraw = true

    for (let i = 0; i < winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i]
        if (board[a] && board[a] == board[b] && board[a] == board[c]) {
            gameIsOver = true
            if (board[a] == "x") return "winner x"
            if (board[a] == "o") return "winner o"
        } else if (!board[a] || !board[b] || !board[c]) {
            isDraw = false
        }
    };
    if (isDraw) return "draw"

    return "not yet done"
}

function Game() {
    const [xIsNext, setXIsNext] = useState(true)
    const [myTurn, setMyTurn] = useState(true)

    useEffect(() => {
        socket.emit("get roles")
        
        function handleRoles(role) {
            setMyTurn(() => {return role})
            console.log(role)
        }

        socket.on("role", (role) => handleRoles(role))

        return () => {
            socket.off("role", (role) => handleRoles(role))
        }
    }, [])

    return (
        <div className="flex flex-row w-full h-screen px-64 flex-wrap justify-center content-center">
            <div className="flex flex-row w-3/5">
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={0} />
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={1} />
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={2} />
            </div>
            <div className="flex flex-row w-3/5">
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={3} />
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={4} />
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={5} />
            </div>
            <div className="flex flex-row w-3/5">
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={6} />
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={7} />
                <Box xIsNext={xIsNext} setXIsNext={setXIsNext} myTurn={myTurn} setMyTurn={setMyTurn} boxNumber={8} />
            </div>
        </div>
    )
}

export default Game