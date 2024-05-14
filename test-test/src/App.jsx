import { useState } from "react";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    function handleClick(number1, number2) {
        return number1 + number2;
    }

    return (
        <div>
            <button onClick={() => setCount(count + handleClick(1, 2))}>
                test
            </button>
            <p>{count}</p>
        </div>
    );
}

export default App;
