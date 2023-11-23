import { useEffect, useState } from 'react'
import Popup from './Popup';
import './index.css'
import { FetchCourses } from './Fetch';
import { courseData } from './Fetch';
import ListElement from './ListElement';

function App() {
  const [popupActive, setPopupActive] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("");
  const [activeCourse, setActiveCourse] = useState<courseData[0]>();
  const [courses, setCourses] = useState<courseData>([]);

  useEffect(() => {
    async function SetCourses(){
      setCourses(await FetchCourses())
    }
    SetCourses()
  }, [])

  return (
    <>
      {popupActive ? <Popup course={activeCourse !== undefined ? activeCourse : undefined} setPopupActive={setPopupActive} currentPopup={currentPopup} /> : <></>}
      <img src="../dromtorp-videregaende-skole.svg" className="absolute left-5 top-5 w-64"></img>
      <div className="flex justify-center text-center mt-24 flex-col">
        <h1 className="text-4xl font-bold">Kurs for godt voksne</h1>
        <div className="flex w-11/12 self-center flex-row justify-around my-16">
          <div className="w-5/12 min-h-[50vh] flex items-center flex-col">
            <h2 className="text-2xl font-bold mb-4">Tilgjenglige kurs</h2>
            <div className="w-full min-h-[50vh] border-neutral-500 border-solid border-4 rounded-md">
              {courses.map((course, index) => {
                if (!course.joined){
                  return (<ListElement course={course} setActiveCourse={setActiveCourse} setCurrentPopup={setCurrentPopup} setPopupActive={setPopupActive} key={index}/>)
                }
              })}
            </div>
          </div>
          <div className="w-5/12 min-h-[50vh] flex items-center flex-col">
            <h2 className="text-2xl font-bold mb-4">Påmeldte kurs</h2>
            <div className="w-full min-h-[50vh] border-neutral-500 border-solid border-4 rounded-md">
              {courses.map((course, index) => {
                if (course.joined){
                  return (<ListElement course={course} setActiveCourse={setActiveCourse} setCurrentPopup={setCurrentPopup} setPopupActive={setPopupActive} key={index}/>)
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
