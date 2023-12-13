import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import ticketsImport from './tickets.json'
import Test from './Test';
import Layout from './Layout';
import Create from './Create';
import List from './List';

export const TicketsContext = createContext(null)
export type ticketsType = Array<{"short": string, "long": string, "name": string, "priority": number, "date": string, "time": string, "done": boolean}>

function App() {

  const [tickets, setTickets] = useState<ticketsType>([{"short": "", "long": "", "name": "", "priority": 0, "date": "", "time": "22:00", "done": false}])

  useEffect(() => {
      setTickets(ticketsImport)
  }, [])

  return (
    <>
      <BrowserRouter>
        <TicketsContext.Provider value={{tickets, setTickets}}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<></>} />
              <Route path="test" element={<Test />} />
              <Route path="ticket" element={<List />} />
              <Route path="ticket/create" element={<Create />} />
            </Route>
          </Routes>
        </TicketsContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
