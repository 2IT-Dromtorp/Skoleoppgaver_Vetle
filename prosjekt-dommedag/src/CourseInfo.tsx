import { useState } from "react"
import { courseData } from "./Fetch"

function CourseInfo({course}: {course? : courseData[0]}): JSX.Element {
    const [tmpbool, settmpbool] = useState(true)

    return(
        <div className="flex flex-col items-center w-full">
            <button disabled={!tmpbool} className="absolute top-2 right-2 px-4 py-3 rounded-md shadow bg-green-500 cursor-pointer duration-200 hover:bg-green-600 disabled:bg-neutral-500 disabled:cursor-default">Meld deg på</button>
            {!tmpbool && <p className="absolute top-16 right-2 font-bold text-red-700">Du må være logget inn</p>}
            <h2 className="text-2xl font-bold mb-4">{course?.name}</h2>
            <p className="font-bold">Dato: {course?.date}</p>
            <p className="font-bold">Tid: {course?.time}</p>
            <p>{course?.description}</p>
        </div>
    )
}

export default CourseInfo