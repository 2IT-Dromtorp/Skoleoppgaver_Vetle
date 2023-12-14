import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import ticketsImport from './tickets.json'
import Layout from './Layout';
import Create from './Create';
import List from './List';
import FrontPage from './FrontPage';

export const TicketsContext = createContext([])
function App() {

  const [tickets, setTickets] = useState([])

  useEffect(() => {
      setTickets(ticketsImport)
  }, [])

  return (
    <>
      <BrowserRouter>
        <TicketsContext.Provider value={{tickets, setTickets}}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<FrontPage />} />
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
