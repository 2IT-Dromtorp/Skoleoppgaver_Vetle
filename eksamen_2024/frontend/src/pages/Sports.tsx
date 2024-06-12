import { useEffect, useState } from "react";

import axios from "axios";
import { sport } from "../assets/types";

function Sports(): JSX.Element {
    const [allSports, setAllSports] = useState<sport[]>([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/sports");
            setAllSports(res.data);
        })();
    }, []);

    return (
        <div className="flex flex-col text-center justify-center">
            <h1 className="font-bold text-4xl mt-4 mb-12">Sporter</h1>
            <div className="flex flex-row flex-wrap justify-evenly">
                {allSports.length ? (
                    allSports.map((sport) => {
                        return (
                            <div key={sport._id} className="bg-background brightness-95 rounded-lg shadow border w-1/4 m-2 py-14">
                                <h2 className="font-semibold text-xl mb-2">{sport.name}</h2>
                                <p className="m-2">{sport.description}</p>
                                <p className="m-2">Medlemmer: {sport.members}</p>
                                <button className="px-2 py-3 mt-2">Spør om å bli med</button>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
                <div className="bg-background brightness-95 rounded-lg shadow border w-1/4 m-2 py-14">
                    <button className="font-semibold px-2 py-3 mt-2">Opprett et nytt lag</button>
                </div>
            </div>
        </div>
    );
}

export default Sports;
