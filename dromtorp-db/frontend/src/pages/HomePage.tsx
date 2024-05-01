import { User } from "@/assets/Types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function HomePage(): JSX.Element {
    const { refetch } = useQuery<User>({
        queryKey: ["user"],
    });

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className="flex w-full justify-center">
            <h1 className="text-5xl font-extrabold mt-8">
                Dromtorp borrowing system
            </h1>
        </div>
    );
}

export default HomePage;
