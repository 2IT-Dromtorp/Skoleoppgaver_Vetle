import { useContext, useState } from "react";
import { TicketsContext } from "./App";
import sidearrow from './arrowside.png'
import downarrow from './arrowdown.png'

function ListElement({ticket}) {
    const [extended, setExtended] = useState(false);

    const { tickets, setTickets } = useContext(TicketsContext);

    console.log(tickets);

    function HandleClick() {
        const nextTickets = tickets.map((ticketMap) => {
            if (ticketMap == ticket) {
                return {...ticketMap, done: true}
            }
            else {
                return ticketMap
            }
        })

        setTickets(nextTickets);
    }

    return(
        <>
            {!extended ? 
            <div onClick={() => setExtended(true)} className="flex flex-row content-start gap-8 w-1/2 p-4 border cursor-pointer bg-gray-200 rounded-lg items-start">
                <img src={sidearrow} width={30} alt="open" className="py-2" />
                <h1 className="flex-grow-[1] py-2">{ticket.short}</h1>
                <p className="py-2">{ticket.date}</p>
                <p className="py-2">{ticket.time}</p>
                {!ticket.done && <button onClick={e => {e.stopPropagation();HandleClick()}} className="rounded-md px-4 py-2 duration-200 bg-blue-600 hover:bg-blue-500">Fullfør</button>}
            </div>
            :
            <div onClick={() => setExtended(false)} className="flex flex-row flex-wrap content-start gap-8 w-1/2 min-h-[16rem] p-4 border cursor-pointer bg-gray-200 rounded-lg">
                <img src={downarrow} width={30} alt="close" className="py-2" />
                <h1 className="flex-grow-[1] py-2">{ticket.short}</h1>
                <p className="py-2">{ticket.date}</p>
                <p className="py-2">{ticket.time}</p>
                {!ticket.done && <button onClick={e => {e.stopPropagation();HandleClick()}} className="rounded-md px-4 py-2 duration-200 bg-blue-600 hover:bg-blue-500">Fullfør</button>}
                <p className="break-words w-full">{ticket.long}</p>
            </div>
            }
        </>
    )
}

export default ListElement;