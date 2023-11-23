import { courseData } from "./Fetch"

function CourseInfo({course}: {course? : courseData[0]}): JSX.Element {
    return(
        <div className="flex items-centre justify-center">
            <h1>{course !== undefined ? course.name : "Undefined"}</h1>
        </div>
    )
}

export default CourseInfo