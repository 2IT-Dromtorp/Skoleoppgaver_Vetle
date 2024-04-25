import { User } from "@/assets/Types";
import { AuthenticateUser } from "@/hooks/UseApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function HomePage(): JSX.Element {
    const { refetch } = useQuery<User>({
        queryKey: ["user"],
        queryFn: AuthenticateUser,
    });

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className="flex w-full justify-center">
            <h1 className="text-5xl font-extrabold mt-8">
                Dromtorp burrowing system
            </h1>
        </div>
    );
}

export default HomePage;
