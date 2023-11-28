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
        throw new Error("Error fetching courses");
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
        throw new Error("Error fetching register");
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
        throw new Error("Error fetching login");
    }
}

export async function FetchToken(): Promise<any>{
    try {
        const res = await fetch("/api/token",{
            method: "get",
            headers: {"Content-Type": "application/json"},
        })
        return res.json()
    }
    catch (error) {
        throw new Error("Error fetching token")
    }
}

export async function FetchJoin(course?: string): Promise<Response> {
    try {
        return fetch(encodeURI(`/api/join?course=${course}`), {
            method: "get",
            headers: {"Contenet-Type": "application/json"}
        })
    }
    catch (error) {
        throw new Error("Error fetching join")
    }
}

export async function FetchUser(): Promise<any> {
    try {
        const res = await fetch("/api/user", {
            method: "get",
            headers: {"Content-Type": "application/json"},
        })
        return await res.json()
    }
    catch (error) {
        throw new Error("Error fetching user")
    }
}