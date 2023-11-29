import { useEffect, useState } from 'react'
import Popup from './Popup';
import './index.css'
import { FetchAvailableCourses, FetchCourses, FetchJoinedCourses, FetchToken, FetchUser } from './Fetch';
import { courseData } from './Fetch';
import ListElement from './ListElement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<{name: string, mail: string}>()
  const [popupActive, setPopupActive] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("");
  const [activeCourse, setActiveCourse] = useState<courseData[0]>();
  const [courses, setCourses] = useState<courseData>([]);
  const [availableCourses, setAvailableCourses] = useState<courseData>([]);
  const [joinedCourses, setJoinedCourses] = useState<courseData>([]);

  useEffect(() => {
    async function GetLoggedIn(){
      const res = await FetchToken()
      setIsLoggedIn(res)
      setUserInfo(await FetchUser())
    }
    GetLoggedIn()
  })

  useEffect(() => {
    async function SetCourses(){
      setCourses(await FetchCourses())
    }
    SetCourses()
  }, [])

  useEffect(() => {
    if(!isLoggedIn){return}
    async function SetCourses(){
      setAvailableCourses(await FetchAvailableCourses())
      setJoinedCourses(await FetchJoinedCourses())
    }
    SetCourses()
  }, [isLoggedIn])

  return (
    <>
      {popupActive ? <Popup course={activeCourse !== undefined ? activeCourse : undefined} setPopupActive={setPopupActive} currentPopup={currentPopup} /> : <></>}
      <img src="../dromtorp-videregaende-skole.svg" className="absolute left-5 top-5 w-64"></img>
      {isLoggedIn ?
        <button onClick={() => {document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT"}} className="absolute right-4 top-4 px-4 py-3 rounded-md bg-green-500 cursor-pointer duration-200 hover:bg-green-600 shadow">Logg ut "{userInfo?.name}"</button>
        :
        <button onClick={() => {setCurrentPopup("login");setPopupActive(true)}} className="absolute right-4 top-4 px-4 py-3 rounded-md bg-green-500 cursor-pointer duration-200 hover:bg-green-600 shadow">Logg inn</button>
      }
      <div className="flex justify-center text-center mt-24 flex-col">
        <h1 className="text-4xl font-bold">Kurs for godt voksne</h1>
        <div className="flex w-11/12 self-center flex-row justify-around my-16">
          <div className="w-5/12 min-h-[50vh] flex items-center flex-col">
            <h2 className="text-2xl font-bold mb-4">Tilgjenglige kurs</h2>
            <div className="w-full min-h-[50vh] bg-neutral-400 border-neutral-500 border-solid border-4 rounded-md flex items-center flex-col">
              {!isLoggedIn ? courses.map((course, index) => {
                  return (<ListElement course={course} setActiveCourse={setActiveCourse} setCurrentPopup={setCurrentPopup} setPopupActive={setPopupActive} key={index}/>)
              }) : 
              availableCourses.map((course, index) => {
                return (<ListElement course={course} setActiveCourse={setActiveCourse} setCurrentPopup={setCurrentPopup} setPopupActive={setPopupActive} key={index}/>)
              })
              }
            </div>
          </div>
          <div className="w-5/12 min-h-[50vh] flex items-center flex-col">
            <h2 className="text-2xl font-bold mb-4">Påmeldte kurs</h2>
            <div className="w-full min-h-[50vh] bg-neutral-400 border-neutral-500 border-solid border-4 rounded-md flex items-center flex-col">
              {isLoggedIn && joinedCourses.map((course, index) => {
                  return (<ListElement course={course} setActiveCourse={setActiveCourse} setCurrentPopup={setCurrentPopup} setPopupActive={setPopupActive} key={index}/>)
              })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
