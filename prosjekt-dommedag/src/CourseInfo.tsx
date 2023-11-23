import { courseData } from "./Fetch"

function CourseInfo({course}: {course? : courseData[0]}): JSX.Element {
    return(
        <div>
            <h1>{course !== undefined ? course.name : "Undefined"}</h1>
        </div>
    )
}

export default CourseInfo