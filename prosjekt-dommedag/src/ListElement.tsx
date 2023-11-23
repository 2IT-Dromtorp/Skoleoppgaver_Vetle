import { Dispatch, SetStateAction } from "react"
import { courseData } from "./Fetch"

function ListElement({course, setActiveCourse, setPopupActive, setCurrentPopup}: {course : courseData[0], setActiveCourse : Dispatch<SetStateAction<courseData[0] | undefined>>, setPopupActive : Dispatch<SetStateAction<boolean>>, setCurrentPopup : Dispatch<React.SetStateAction<string>>}): JSX.Element {

    return (
        <div className="w-full h-12 mb-5 bg-neutral-100 flex flex-row justify-start border-neutral-500 border-solid border-2 rounded-md px-4 items-center">
            <h1 className="w-4/12">{course.name}</h1>
            <p className="w-3/12">{course.date}</p>
            <p className="w-2/12">{course.time}</p>
            <button onClick={() => {setActiveCourse(course);setCurrentPopup("course");setPopupActive(true)}} className="w-3/12 h-5/6 bg-green-500 rounded-md cursor-pointer duration-200 hover:bg-green-600 shadow">Mer info</button>
        </div>
    )
}

export default ListElement