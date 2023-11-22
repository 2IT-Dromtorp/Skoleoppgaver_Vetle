import { useState } from 'react'
import Popup from './Popup';
import './index.css'

function App() {
  const [popupActive, setPopupActive] = useState(false);

  return (
    <>
      {popupActive ? <Popup setPopupActive={setPopupActive} /> : <></>}
      <img src="../dromtorp-videregaende-skole.svg" className="absolute left-5 top-5 w-64"></img>
      <input
      type="checkbox"
      checked={popupActive}
      onChange={e => setPopupActive(e.target.checked)}
      role="switch">
      </input>
      <div className="flex justify-center text-center mt-24 flex-col">
        <h1 className="text-4xl font-bold">Kurs for godt voksne</h1>
        <div className="flex w-screen flex-row justify-around mt-16">
          <div className="w-5/12 min-h-[50vh] border-neutral-500 border-solid border-4 rounded-md"></div>
          <div className="w-5/12 min-h-[50vh] border-neutral-500 border-solid border-4 rounded-md"></div>
        </div>
      </div>
    </>
  )
}

export default App
