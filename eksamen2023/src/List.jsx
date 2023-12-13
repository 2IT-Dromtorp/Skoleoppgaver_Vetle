import { useContext } from "react";
import { TicketsContext } from "./App";
import ListElement from "./ListElement";

function List() {
    const { tickets } = useContext(TicketsContext);

    console.log(tickets);

    return(
        <div className="flex flex-col items-center gap-4">
            {tickets.map((ticket, index) => {
                return (<ListElement ticket={ticket} key={index}/>)
            })}
        </div>
    )
}

export default List;