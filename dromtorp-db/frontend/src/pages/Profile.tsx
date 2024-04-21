import { Student } from "@/assets/Types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { GetStudent } from "@/hooks/UseApi";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function Profile(): JSX.Element {
    const [student, setStudent] = useState<Student>();

    useEffect(() => {
        (async () => {
            setStudent(await GetStudent());
        })();
    }, []);

    return (
        <div className="flex justify-center items-center">
            {!student ? (
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
