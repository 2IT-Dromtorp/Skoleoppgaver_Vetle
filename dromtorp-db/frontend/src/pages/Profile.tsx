import { useState } from "react";

function Profile(): JSX.Element {
    const [user, setUser] = useState<{firstName: string, lastName: string, mail: string, phone: number, birthdate: string, address: string}>({});
    
    return (
        <>
            <h1></h1>
        </>
    )
}

export default Profile;