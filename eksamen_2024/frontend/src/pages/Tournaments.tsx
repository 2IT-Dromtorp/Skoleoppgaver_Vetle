import { useEffect, useState } from "react";
import { sport, tournament } from "../assets/types";
import { Link } from "react-router-dom";
import axios from "axios";

function Tournaments(): JSX.Element {
    const [allTournaments, setAllTournaments] = useState<tournament[]>([]);
    const [sports, setSports] = useState<sport[]>([]);
    const [filter, setFilter] = useState<string>("none");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const tournamentRes = await axios.get("/api/tournaments");
                setAllTournaments(tournamentRes.data);
                const sportsRes = await axios.get("/api/sports");
                setSports(sportsRes.data);
                setIsLoading(false);
                const authRes = await axios.get("/api/check-auth", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                if (authRes.data) {
                    setIsAdmin(true);
                }
            } catch (err) {
                setIsAdmin(false);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col text-center justify-center">
            <h1 className="font-bold text-4xl mb-12">Turneringer</h1>
            <label className="w-1/5 mb-4 self-center">
                <p className="text-left">Filter</p>
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 w-full bg-white border-secondary border rounded-lg focus:outline-none"
                >
                    <option value="none">Ingen filter</option>
                    {sports.map((sport) => {
                        return (
                            <option key={sport._id} value={sport.name}>
                                {sport.name}
                            </option>
                        );
                    })}
                </select>
            </label>
            <div className="flex flex-row flex-wrap justify-evenly">
                {!isLoading ? (
                    allTournaments.map((tournament) => {
                        if (filter !== "none" && tournament.sport !== filter) {
                            return null;
                        }
                        return (
                            <div
                                key={tournament._id}
                                className="flex flex-col relative bg-background brightness-125 rounded-lg shadow border-accent border w-1/4 m-2 py-14 justify-between p-4"
                            >
                                <h2 className="font-semibold text-xl mb-2">{tournament.name}</h2>
                                <p className="m-2">
                                    Tid: {tournament.date}, {tournament.time}
                                </p>
                                <p className="m-2">Sted: {tournament.place}</p>
                                <p className="m-2">Ment for: {tournament.skillLevel}</p>
                                <p className="m-2">{tournament.description}</p>
                                <p className="m-2 absolute font-semibold top-2 right-2">{tournament.sport}</p>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
                <div className="bg-background brightness-125 rounded-lg shadow border-accent border w-1/4 m-2 py-14">
                    {!isAdmin && <p>Du må logge inn som admin for å legge til turneringer</p>}
                    <Link to={"/create-tournament"}>
                        <button
                            disabled={!isAdmin}
                            className="font-semibold px-2 py-3 mt-2 disabled:bg-gray-400 disabled:hover:brightness-100"
                        >
                            Legg til turnering
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Tournaments;
