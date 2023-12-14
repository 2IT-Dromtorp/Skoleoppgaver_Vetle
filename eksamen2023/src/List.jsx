import { useContext, useState } from "react";
import { TicketsContext } from "./App";
import ListElement from "./ListElement";

function List() {
    const { tickets } = useContext(TicketsContext);

    const [includeCompleted, setIncludeCompleted] = useState(true);

    console.log(tickets);

    return(
        <div className="flex flex-col items-center gap-4">
            <h1 className="font-extrabold text-3xl text-gray-800">Opprettede feilmeldinger</h1>
            <label>
                <input onChange={e => setIncludeCompleted(e.target.checked)} checked={includeCompleted} type="checkbox" />
                Skal vise ferdige feilmeldinger?
            </label>
            {tickets.map((ticket, index) => {
                if (includeCompleted) return <ListElement ticket={ticket} key={index}/>
                else {
                    if (!ticket.done) {
                    return <ListElement ticket={ticket} key={index}/>
                    }
                }
            })}
        </div>
    )
}

export default List;