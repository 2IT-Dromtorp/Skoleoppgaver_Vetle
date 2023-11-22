export function FetchCourses(): any{
    fetch("/api/courses", {"method": "get"})
        .then((res) => res.json())
        .then((data) => {console.log(data);return data})
        .catch(() => {return []})
}