import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FetchJoin, FetchJoinedCourses, FetchToken, courseData } from "./Fetch"

function CourseInfo({course, setPopupActive}: {course? : courseData[0], setPopupActive : Dispatch<SetStateAction<boolean>>}): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [joinedCourses, setJoinedCourses] = useState<courseData>([]);
    const [joined, setJoined] = useState(Boolean)
    
    useEffect(() => {
        if(!isLoggedIn)return
        async function SetCourses(){
            setJoinedCourses(await FetchJoinedCourses())
        }
        SetCourses()
    }, [isLoggedIn])

    useEffect(() => {
        async function GetLoggedIn(){
          const res = await FetchToken()
          setIsLoggedIn(res)
        }
        GetLoggedIn()
        for (let i in joinedCourses) {
            if (!(joinedCourses[i].name === course?.name)) continue
            setJoined(true)
        }
    })

    async function HandleChange() {
        await FetchJoin(course?.name)
        window.location.reload();
    }

    return(
        <div className="flex flex-col items-center w-full">
            {!joined && <button onClick={() => {HandleChange();setPopupActive(false)}} disabled={!isLoggedIn} className="absolute top-2 right-2 px-4 py-3 rounded-md shadow bg-green-500 cursor-pointer duration-200 hover:bg-green-600 disabled:bg-neutral-500 disabled:cursor-default">Meld deg på</button>}
            {!isLoggedIn && <p className="absolute text-right w-48 top-16 right-2 font-bold text-red-700">Du må være logget inn for å melde deg på</p>}
            <h2 className="text-2xl font-bold mb-4">{course?.name}</h2>
            <p className="font-bold">Dag: {course?.day}</p>
            <p className="font-bold">Tid: {course?.time}</p>
            <p>{course?.description}</p>
            {!joined && <p className="absolute bottom-4 text-red-600 font-bold">Dette er en bindende avtale, det er ikke mulig å melde seg av</p>}
        </div>
    )
}

export default CourseInfo