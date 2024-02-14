import axios from "axios"
import { useState } from "react"

function Create(): JSX.Element {
    const [question, setQuestion] = useState<string>("")
    const [answers, setAnswers] = useState<string[]>([""])
    const [category, setCategory] = useState<string>("Music")

    function changeAnswers(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const nextAnswers = answers.map((answer, i) => {
            if (index == i) { 
                return e.target.value
            } else {
                return answer
            }
        })
        setAnswers(nextAnswers)
    }

    async function handleSubmit() {
        await axios.post("/api/createQuestion", {"question": question, "answers": answers, "category": category})
        setQuestion("")
        setAnswers([""])
    }

    return(
        <form onSubmit={e => {e.preventDefault();handleSubmit()}} className="flex flex-col items-center">
            <label className="w-full my-4">
                <p>Spørsmål: </p>
                <textarea value={question} placeholder="Quiz spørsmål" autoComplete="off" onChange={e => setQuestion(e.target.value)} className="w-full h-64 p-4 bg-main2 rounded-md border-contrast border-2 focus:outline-none" />
            </label>
            <label className="flex flex-col w-full my-4">
                <p>Svar: </p>
                {answers.map((answer, index) => {
                    return (
                        <div className="flex flex-row justify-center items-center">
                            <input type="text" value={answer} placeholder="Svar alternativ" autoComplete="off" onChange={e => changeAnswers(e, index)} className="bg-main2 rounded-md my-2 p-4 border-contrast border-2 focus:outline-none" />
                            <button type="button" onClick={() => setAnswers(answers.filter(a => a != answer))} className="m-2">-</button>
                        </div>
                    )
                })}
                <button type="button" onClick={() => setAnswers([...answers, ""])}>+</button>
            </label>
            <label className="w-full my-4">
                <p>Spørsmål: </p>
                <select onChange={e => setCategory(e.target.value)} className="bg-main2 p-4 w-full rounded-md border-contrast border-2 focus:outline-none" >
                    <option value={"Music"} selected className="bg-main2 rounded-md border-contrast border-2 focus:outline-none">Music</option>
                    <option value={"Programming"} className="bg-main2 rounded-md border-contrast border-2 focus:outline-none">Programming</option>
                    <option value={"History"} className="bg-main2 rounded-md border-contrast border-2 focus:outline-none">History</option>
                    <option value={"Movies and TV"} className="bg-main2 rounded-md border-contrast border-2 focus:outline-none">Movies and TV</option>
                    <option value={"Geography and culture"} className="bg-main2 rounded-md border-contrast border-2 focus:outline-none">Geography and culture</option>
                </select>
            </label>
            <input type="submit" className="bg-main2 w-full my-4 p-4 rounded-md border-contrast border-2 cursor-pointer focus:outline-none" />
        </form>
    )
}

export default Create