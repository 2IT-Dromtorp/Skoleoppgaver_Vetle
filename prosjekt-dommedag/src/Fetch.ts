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
        throw new Error;
    }
}

export async function FetchRegister(name: string, mail: string, password: string): Promise<Response>{
    try {
        return fetch("/api/register",
        {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, mail: mail, password: password})
        });
    }
    catch (error) {
        console.error("Error fetching login:", error);
        throw new Error;
    }
}

export async function FetchLogin(mail: string, password: string): Promise<Response>{
    try {
        return fetch("/api/login",{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mail: mail, password: password}),
        })
    }
    catch (error) {
        console.error("Error fetching login:", error)
        throw new Error;
    }
}