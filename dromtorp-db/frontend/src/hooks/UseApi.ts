import { Equipment, Student, User, Request } from "@/assets/Types";
import axios from "axios";

export async function AuthenticateUser(): Promise<User | null> {
    try {
        const res = await axios.get<User>("/api/whoami", {
            headers: { Authorization: localStorage.getItem("jwt") },
        });
        return res.data;
    } catch (err: any) {
        return null;
    }
}

export async function GetEquipment(): Promise<Equipment[]> {
    try {
        const res = await axios.get<Equipment[]>("/api/getAllEquipment", {
            headers: { Authorization: localStorage.getItem("jwt") },
        });
        return res.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function PutRequest(equipmentId: string): Promise<string> {
    try {
        const res = await axios.put(
            "/api/burrowRequest",
            {
                equipment: equipmentId,
            },
            {
                headers: { Authorization: localStorage.getItem("jwt") },
            }
        );
        return res.data.message;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function GetStudent(): Promise<Student> {
    try {
        const res = await axios.get("/api/student-data", {
            headers: { Authorization: localStorage.getItem("jwt") },
        });
        return res.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function GetRequests(): Promise<Request[]> {
    try {
        const res = await axios.get("/api/requested-equipment", {
            headers: { Authorization: localStorage.getItem("jwt") },
        });
        return res.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function AnswerRequest(id: string, result: boolean) {
    try {
        await axios.post(
            "/api/answer-request",
            { id, result },
            {
                headers: { Authorization: localStorage.getItem("jwt") },
            }
        );
        return;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function ReturnEquipment(id: string) {
    try {
        await axios.post(
            "/api/return-equipment",
            { id },
            {
                headers: { Authorization: localStorage.getItem("jwt") },
            }
        );
        return;
    } catch (err: any) {
        throw new Error(err.message);
    }
}
