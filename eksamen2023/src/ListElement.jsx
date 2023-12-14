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
            <div onClick={() => setExtended(!extended)} className={`flex flex-row flex-wrap content-start gap-8 w-1/2 ${extended && "min-h-[16rem]"} p-4 border-gray-700 border cursor-pointer bg-gray-300 rounded-lg items-start`}>
                <img src={extended ? downarrow : sidearrow} width={30} alt="open" className="py-2" />
                <h1 className="flex-grow-[1] py-2 font-bold">{ticket.short}</h1>
                <p className="py-2">{ticket.date}</p>
                <p className="py-2">{ticket.time}</p>
                {!ticket.done ?
                <button onClick={e => {e.stopPropagation();HandleClick()}} className="rounded-md px-4 py-2 w-20 h-10 font-semibold duration-300 bg-blue-500 hover:bg-blue-400">Fullfør</button> :
                <div className="rounded-md w-20 h-10 font-semibold bg-lime-500" />
                }
                {extended && <p className="break-words w-full">{ticket.long}</p>}
                {extended && <p className="break-words w-full">Feilmelding opprettet av: {ticket.name}</p>}
            </div>
        </>
    )
}

export default ListElement;