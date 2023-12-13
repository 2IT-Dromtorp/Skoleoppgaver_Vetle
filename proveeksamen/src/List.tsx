import { useContext } from "react";
import { TicketsContext, ticketsType } from "./App";
import ListElement from "./ListElement";

function List(): JSX.Element {
    const { tickets } = useContext(TicketsContext);

    console.log(tickets);

    return(
        <div className="flex flex-col items-center gap-4">
            {tickets.map((ticket: ticketsType[0], index: any) => {
                return (<ListElement ticket={ticket} key={index}/>)
            })}
        </div>
    )
}

export default List;