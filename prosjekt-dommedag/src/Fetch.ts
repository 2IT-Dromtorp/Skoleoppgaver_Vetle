export type courseData = Array<{
    name: string
    time: string
    day: string
    description: string
}>

export async function FetchCourses(): Promise<courseData>{
    try {
        const response = await fetch("/api/courses", { method: "get" });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching courses");
    }
}

export async function FetchRegister(name: string, mail: string, password: string): Promise<any>{
    try {
        const res = await fetch("/api/register",
        {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, mail: mail, password: password})
        });
        const data = await res.json()
        return data
    }
    catch (error) {
        throw new Error("Error fetching register");
    }
}

export async function FetchLogin(mail: string, password: string): Promise<any>{
    try {
        const res = await fetch("/api/login",{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mail: mail, password: password}),
        })
        const data = await res.json()
        return(data)
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

export async function FetchJoinedCourses(): Promise<any> {
    try {
        const res = await fetch("/api/joined", {
            method: "get",
            headers: {"Content-Type": "application/json"},
        })
        return await res.json()
    }
    catch {
        throw new Error("Error fetching joined courses")
    }
}

export async function FetchAvailableCourses(): Promise<any> {
    try {
        const res = await fetch("/api/available", {
            method: "get",
            headers: {"Content-Type": "application/json"},
        })
        return await res.json()
    }
    catch {
        throw new Error("Error fetching available courses")
    }
}

export async function FetchJoinedUsers(course: string): Promise<any> {
    try {
        const res = await fetch(encodeURI(`/api/joinedusers?course=${course}`), {
            method: "get",
            headers: {"Content-Type": "application/json"},
        })
        return await res.json()
    }
    catch {
        throw new Error("Error fetching joined users")
    }
}