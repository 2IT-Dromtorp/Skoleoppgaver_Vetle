import axios from "axios";

async function CheckAuthority(authorityLevel: number): Promise<boolean> {
    try {
        const res = await axios
            .get(
                encodeURI(
                    `/api/checkAuthority?requiredAuthority=${authorityLevel}`
                )
            )
            .catch();
        return res.data.result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
}

export default CheckAuthority;
