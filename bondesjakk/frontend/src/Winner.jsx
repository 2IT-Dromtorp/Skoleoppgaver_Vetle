import { useParams } from "react-router-dom"

function Winner() {
    const param = useParams("winner")

    return(
        <p>The winner is {param.result}</p>
    )
}

export default Winner