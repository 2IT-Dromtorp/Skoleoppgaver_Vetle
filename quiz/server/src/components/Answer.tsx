function Answer({answers, answer, setAnswers, index}: {"answers": string[], "answer": string, "setAnswers": React.Dispatch<React.SetStateAction<string[]>>, "index": number}): JSX.Element {
    function changeAnswers(e: React.ChangeEvent<HTMLInputElement>) {
        const nextAnswers = answers.map((answer, i) => {
            if (index == i) { 
                return e.target.value
            } else {
                return answer
            }
        })
        setAnswers(nextAnswers)
    }
    
    return(
        <label>
            <p>Svar: </p>
            <input type="text" value={answer} onChange={e => changeAnswers(e)} />
        </label>
    )
}

export default Answer