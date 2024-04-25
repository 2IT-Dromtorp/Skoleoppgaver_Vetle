import { Student, User } from "@/assets/Types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { GetStudent } from "@/hooks/UseApi";
import { checkRoles } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Profile(): JSX.Element {
    const [student, setStudent] = useState<Student>();

    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });

    useEffect(() => {
        (async () => {
            setStudent(await GetStudent());
        })();
    }, []);

    return (
        <div className="flex justify-center items-center">
            {!checkRoles(["student"], user?.roles || []) ? (
                <Navigate to={"/"} />
            ) : !student ? (
                <ClipLoader />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {student.firstName} {student.lastName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Mail: {student.mail}</p>
                        <p>Phone: {student.phone.toString()}</p>
                        <p>Birthdate: {student.birthdate}</p>
                        <p>
                            Address: {student.address.street},
                            {student.address.zipcode}, {student.address.city}
                        </p>
                        <p>Username: {student.username}</p>
                        {student.relatives.map((relative, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-muted rounded p-4 mt-2"
                                >
                                    <p>
                                        {relative.firstName} {relative.lastName}
                                    </p>
                                    <p>Mail: {relative.mail}</p>
                                    <p>Phone: {relative.phone.toString()}</p>
                                    <p>Address: {relative.phone}</p>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default Profile;
