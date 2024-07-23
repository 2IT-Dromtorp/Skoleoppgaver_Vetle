import { useEffect, useState } from "react";

import axios from "axios";
import { TUser, sport } from "../assets/types";
import { Link } from "react-router-dom";

function Sports(): JSX.Element {
    const [user, setUser] = useState<TUser>();
    const [allSports, setAllSports] = useState<sport[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const sportsRes = await axios.get("/api/sports");
                setAllSports(sportsRes.data);
                setIsLoading(false);
                const authRes = await axios.get("/api/check-auth", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setUser(authRes.data);
                if (authRes.data.isAdmin) {
                    setIsAdmin(true);
                }
            } catch (err) {
                setIsAdmin(false);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col text-center justify-center">
            <h1 className="font-bold text-4xl mb-12">Sporter</h1>
            <div className="flex flex-row flex-wrap justify-evenly">
                {!isLoading ? (
                    allSports.map((sport) => {
                        return (
                            <div
                                key={sport._id}
                                className="flex flex-col bg-background brightness-125 rounded-lg shadow border-accent border w-1/4 m-2 py-14 justify-between p-4"
                            >
                                <h2 className="font-semibold text-xl mb-2">{sport.name}</h2>
                                <p className="m-2">{sport.description}</p>
                                <p className="m-2">Medlemmer: {sport.members}</p>
                                {!isAdmin && !user?.activeSports.some((activeSport) => activeSport == sport.name) && (
                                    <Link to={`/send-request/${sport.name.toLowerCase()}`}>
                                        <button className="px-2 py-3 mt-2">Spør om å bli med</button>
                                    </Link>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
                <div className="bg-background brightness-125 rounded-lg shadow border-accent border w-1/4 m-2 py-14">
                    {!isAdmin && <p>Du må logge inn som admin for å lage nye lag</p>}
                    <Link to={"/create-sport"}>
                        <button
                            disabled={!isAdmin}
                            className="font-semibold px-2 py-3 mt-2 disabled:bg-gray-400 disabled:hover:brightness-100"
                        >
                            Opprett et nytt lag
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sports;
