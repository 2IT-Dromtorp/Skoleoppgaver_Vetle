import { Request, User } from "@/assets/Types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AnswerRequest, GetRequests } from "@/hooks/UseApi";
import { checkRoles } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Requests(): JSX.Element {
    const { data: user, refetch } = useQuery<User>({
        queryKey: ["user"],
    });
    const [requests, setRequests] = useState<Request[]>([]);

    async function getRequests() {
        setRequests(await GetRequests());
    }

    useEffect(() => {
        getRequests();
    }, []);

    async function Deny(request: Request) {
        await AnswerRequest(request._id, false);
        await getRequests();
        await refetch();
    }

    async function Accept(request: Request) {
        await AnswerRequest(request._id, true);
        await getRequests();
        await refetch();
    }

    return (
        <>
            {checkRoles(["admin", "teacher"], user?.roles || []) ? (
                <div className="flex flex-wrap justify-center w-full">
                    {requests.length > 0 ? (
                        requests.map((request: Request, index: number) => {
                            return (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>
                                            {request.student.firstName}{" "}
                                            {request.student.lastName}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>
                                            Student {request.student.username}{" "}
                                            requested {request.equipment.name}{" "}
                                            at {request.date}
                                        </p>
                                        <Button onClick={() => Deny(request)}>
                                            Deny
                                        </Button>
                                        <Button onClick={() => Accept(request)}>
                                            Accept
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <p>No requests available</p>
                    )}
                </div>
            ) : (
                <p>You do not have access to this page</p>
            )}
        </>
    );
}

export default Requests;
