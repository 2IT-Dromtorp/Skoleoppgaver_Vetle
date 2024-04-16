import axios from "axios";

async function CheckAuthority(authorityLevel: number): Promise<boolean> {
    return true;
    const res = await axios.get(
        encodeURI(`/api/checkAuthority?requiredAuthority=${authorityLevel}`)
    );
    return res.data.result;
}

export default CheckAuthority;
