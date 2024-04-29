import { Equipment, Student, User, Request } from "@/assets/Types";
import axios from "axios";
import { toast } from "sonner";

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
        toast.error(err.response.data.message);
        throw new Error(err.response.data.message);
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
        toast.error(err.response.data.message);
        throw new Error(err.response.data.message);
    }
}

export async function GetStudent(): Promise<Student> {
    try {
        const res = await axios.get("/api/student-data", {
            headers: { Authorization: localStorage.getItem("jwt") },
        });
        return res.data;
    } catch (err: any) {
        toast.error(err.response.data.message);
        throw new Error(err.response.data.message);
    }
}

export async function GetRequests(): Promise<Request[]> {
    try {
        const res = await axios.get("/api/requested-equipment", {
            headers: { Authorization: localStorage.getItem("jwt") },
        });
        return res.data;
    } catch (err: any) {
        toast.error(err.response.data.message);
        throw new Error(err.response.data.message);
    }
}

export async function AnswerRequest(
    id: string,
    result: boolean
): Promise<string> {
    try {
        const res = await axios.post(
            "/api/answer-request",
            { id, result },
            {
                headers: { Authorization: localStorage.getItem("jwt") },
            }
        );
        return res.data.message;
    } catch (err: any) {
        toast.error(err.response.data.message);
        throw new Error(err.response.data.message);
    }
}

export async function ReturnEquipment(id: string): Promise<string> {
    try {
        const res = await axios.post(
            "/api/return-equipment",
            { id },
            {
                headers: { Authorization: localStorage.getItem("jwt") },
            }
        );
        return res.data.message;
    } catch (err: any) {
        toast.error(err.response.data.message);
        throw new Error(err.response.data.message);
    }
}

export async function PostChangePassword(
    oldPassword: string,
    newPassword: string
): Promise<string> {
    try {
        const res = await axios.post(
            "/api/change-password",
            { oldPassword, newPassword },
            { headers: { Authorization: localStorage.getItem("jwt") } }
        );
        return res.data.message;
    } catch (err: any) {
        toast.error(err.response.data.message);
        throw new Error(err.response.data.message);
    }
}

export async function PostAddEquipment(name: string): Promise<string> {
    try {
        const res = await axios.post("/api/addEquipment", { name });
        return res.data.message;
    } catch (err: any) {
        toast.error(err.response.data.message);
        throw new Error(err.response.data.message);
    }
}
