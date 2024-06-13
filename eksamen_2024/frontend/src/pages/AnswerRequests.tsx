import { useEffect, useState } from "react";
import { request, sport } from "../assets/types";
import axios from "axios";

function AnswerRequests(): JSX.Element {
    const [message, setMessage] = useState<string>("");
    const [allRequests, setAllRequests] = useState<request[]>([]);
    const [sports, setSports] = useState<sport[]>([]);
    const [filter, setFilter] = useState<string>("none");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const requestsRes = await axios.get("/api/requests", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setAllRequests(requestsRes.data);
                const sportsRes = await axios.get("/api/sports");
                setSports(sportsRes.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        })();
    });

    async function acceptRequest(id: string) {
        try {
            await axios.post(
                "/api/accept-request",
                { id },
                { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setMessage("Forespørsel godkjent");
        } catch (err) {
            setMessage("Noe gikk galt");
        }
    }
    async function declineRequest(id: string) {
        try {
            await axios.post(
                "/api/decline-request",
                { id },
                { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setMessage("Forespørsel avslått");
        } catch (err) {
            setMessage("Noe gikk galt");
        }
    }

    return (
        <div className="flex flex-col text-center items-center">
            <h1 className="font-bold text-4xl mb-8">Svar på forespørsler</h1>
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
            <p>{message}</p>
            <div className="flex flex-row flex-wrap justify-evenly">
                {!isLoading ? (
                    allRequests.map((request) => {
                        if (filter !== "none" && request.sport.toLowerCase() !== filter.toLowerCase()) {
                            return null;
                        }
                        return (
                            <div
                                key={request._id}
                                className="flex flex-col bg-background brightness-125 rounded-lg shadow border-accent border m-2 py-14 justify-between p-4"
                            >
                                <h2 className="font-semibold text-xl mb-2">{request.name}</h2>
                                <p className="m-2 font-semibold">{request.sport}</p>
                                <p className="m-2">{request.email}</p>
                                <div>
                                    <button onClick={() => acceptRequest(request._id)} className="px-4 py-3 mt-2 mx-2">
                                        Godta
                                    </button>
                                    <button onClick={() => declineRequest(request._id)} className="px-4 py-3 mt-2 mx-2">
                                        Avslå
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default AnswerRequests;
