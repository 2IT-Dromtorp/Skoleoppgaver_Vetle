import { Equipment, User } from "@/assets/Types";
import axios from "axios";

export async function AuthenticateUser(): Promise<User> {
    try {
        const res = await axios.get<User>("/api/whoami");
        return res.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function GetEquipment(): Promise<Equipment[]> {
    try {
        const res = await axios.get<Equipment[]>("/api/getAllEquipment");
        return res.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function PutRequest(equipmentId: string): Promise<string> {
    try {
        const res = await axios.put("/api/burrowRequest", {
            equipment: equipmentId,
        });
        return res.data.message;
    } catch (err: any) {
        throw new Error(err.message);
    }
}
