import { useState } from "react";

export default function MyButtonExport() {
    return (
        <div>
            <MyButton />
        </div>
    );
}

function MyButton() {
    const [count, setCount] = useState(0);
      
    function incrementNumber(){
        setCount(count + 1);
    }

    return(
        <button onClick={incrementNumber}>{count}</button>
    )
}