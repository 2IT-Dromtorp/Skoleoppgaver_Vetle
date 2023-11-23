export type courseData = Array<{
    name: string
    date: string
    time: string
    description: string
    joined: boolean
}>

export async function FetchCourses(): Promise<courseData>{
    try {
        const response = await fetch("/api/courses", { method: "get" });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}