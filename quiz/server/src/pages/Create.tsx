import { useState } from "react"
import Answer from "../components/Answer.tsx"

function Create(): JSX.Element {
    const [question, setQuestion] = useState<string>("")
    const [answers, setAnswers] = useState<string[]>([""])
    const [category, setCategory] = useState<string>("")

    return(
        <form>
            <label>
                <p>Spørsmål: </p>
                <input type="text" onChange={e => setQuestion(e.target.value)} />
            </label>
            {answers.map((answer, index) => {
                return <Answer answers={answers} answer={answer} setAnswers={setAnswers} index={index} key={answer} />
            })}
            <label>
                <p>Spørsmål: </p>
                <input type="text" />
            </label>
        </form>
    )
}

export default Create