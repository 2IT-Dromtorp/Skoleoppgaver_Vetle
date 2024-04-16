import { useEffect, useState } from "react";
import CheckAuthority from "../assets/CheckAuthority";
import axios from "axios";

function AddStudent(): JSX.Element {
    const [hasAccess, setAccess] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [loginName, setLoginName] = useState<string>("");
    const [phone, setPhone] = useState<number>(0);
    const [birthdate, setBirthdate] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [zipcode, setZipcode] = useState<number>(0);
    const [city, setCity] = useState<string>("");
    const [relatives, setRelatives] = useState<{"firstName": string, "lastName": string, "mail": string, "phone": number, "address": string}[]>([{firstName: "", lastName: "", mail: "", phone: 0, address: ""}]);

    useEffect(() => {
        (async () => {
            console.log("a");
            setAccess(await CheckAuthority(2));
        })();
    }, []);

    function changeRelatives(
        changedValue: {},
        index: number
    ) {
        const newRelative = {...relatives[index], ...changedValue};
        const nextRelative = relatives.map((relative, i) => {
            if (index == i) {
                return newRelative;
            } else {
                return relative;
            }
        });
        setRelatives(nextRelative);
    }

    function onSubmit() {
        const studentData = {
            firstName: firstName,
            lastName: lastName,
            mail: loginName + "@viken.no",
            phone: phone,
            relatives: relatives,
            birthdate: birthdate,
            address: {street: street, zipcode: zipcode, city: city}
        }
        const loginData = {
            loginName: loginName,
            password: "Skole123",
            authority: 0
        }
        axios.post("/api/addStudent", studentData);
    }

    return (
        <>
            {hasAccess ? (
                <>
                    <form onSubmit={e =>{e.preventDefault();onSubmit()}}>
                        <label>
                            <h2>Student first name: </h2>
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </label>
                        <label>
                            <h2>Student last name: </h2>
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                        </label>
                        <label>
                            <h2>Student login name: </h2>
                            <input type="text" value={loginName} onChange={e => setLoginName(e.target.value)} />
                        </label>
                        <label>
                            <h2>Student phone number: </h2>
                            <input type="number" value={phone} onChange={e => setPhone(Number.parseInt(e.target.value))} />
                        </label>
                        <label>
                            <h2>Student birthdate: </h2>
                            <input type="text" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
                        </label>
                        <label>
                            <h2>Student address: </h2>
                            <input type="text" value={street} placeholder="Street" onChange={e => setStreet(e.target.value)} />
                            <input type="number" value={zipcode} placeholder="Zip code" onChange={e => setZipcode(Number.parseInt(e.target.value))} />
                            <input type="text" value={city} placeholder="City" onChange={e => setCity(e.target.value)} />
                        </label>
                        <label className="flex flex-col w-full my-4">
                            <p>Nærmeste kontakter: </p>
                            {relatives.map((relative, index) => {
                                return (
                                    <div className="flex flex-row justify-center items-center">
                                        <input
                                            type="text"
                                            value={relative.firstName}
                                            placeholder="First name"
                                            autoComplete="off"
                                            onChange={(e) => changeRelatives({firstName: e.target.value}, index)}
                                            className="bg-main2 rounded-md my-2 p-4 border-contrast border-2 focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={relative.lastName}
                                            placeholder="Last name"
                                            autoComplete="off"
                                            onChange={(e) => changeRelatives({lastName: e.target.value}, index)}
                                            className="bg-main2 rounded-md my-2 p-4 border-contrast border-2 focus:outline-none"
                                        />
                                        <input
                                            type="mail"
                                            value={relative.mail}
                                            placeholder="Mail"
                                            autoComplete="off"
                                            onChange={(e) => changeRelatives({mail: e.target.value}, index)}
                                            className="bg-main2 rounded-md my-2 p-4 border-contrast border-2 focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={relative.address}
                                            placeholder="Address"
                                            autoComplete="off"
                                            onChange={(e) => changeRelatives({address: e.target.value}, index)}
                                            className="bg-main2 rounded-md my-2 p-4 border-contrast border-2 focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={relative.phone}
                                            placeholder="Phone number"
                                            autoComplete="off"
                                            onChange={(e) => changeRelatives({phone: Number.parseInt(e.target.value)}, index)}
                                            className="bg-main2 rounded-md my-2 p-4 border-contrast border-2 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setRelatives(
                                                    relatives.filter((a) => a != relative)
                                                )
                                            }
                                            className="m-2"
                                        >
                                            -
                                        </button>
                                    </div>
                                );
                            })}
                            <button
                                type="button"
                                onClick={() => setRelatives([...relatives, {firstName: "", lastName: "", mail: "", phone: 0, address: ""}])}
                            >
                                +
                            </button>
                        </label>
                        <input type="submit" />
                    </form>
                </>
            ) : (
                <p>You do not have access to this page</p>
            )}
        </>
    );
}

export default AddStudent;
