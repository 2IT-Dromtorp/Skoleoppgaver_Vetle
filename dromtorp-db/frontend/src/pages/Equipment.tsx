import axios from "axios";
import { useEffect, useState } from "react";

function Equipment(): JSX.Element {
    const [allEquipment, setEquipment] = useState<
        { name: string; burrowed: boolean; _id: string }[]
    >([]);

    useEffect(() => {
        (async () => {
            setEquipment(
                await axios
                    .get("/api/getAllEquipment")
                    .then((res) => res.data.data)
                    .catch((err: any) =>
                        console.error(err.response.data.message)
                    )
            );
        })();
    }, []);

    function handleClick(id: string) {
        axios.post("/api/burrowRequest", { equipment: id });
    }

    return (
        <div className="flex w-full flex-col items-center justify-center">
            {allEquipment.length &&
                allEquipment.map((equipment, index) => {
                    return (
                        <>
                            <p
                                key={index}
                                className={
                                    equipment.burrowed
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                }
                            >
                                {equipment.name}
                            </p>
                            {!equipment.burrowed && (
                                <button
                                    onClick={() => handleClick(equipment._id)}
                                >
                                    burrow
                                </button>
                            )}
                        </>
                    );
                })}
        </div>
    );
}

export default Equipment;
