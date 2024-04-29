import { useQuery } from "@tanstack/react-query";
import { User } from "@/assets/Types";
import { checkRoles } from "@/lib/utils";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { addStudentSchema } from "@/assets/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

function AddStudent(): JSX.Element {
    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });

    const form = useForm<z.infer<typeof addStudentSchema>>({
        resolver: zodResolver(addStudentSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            loginName: "",
            birthdate: "",
            street: "",
            city: "",
            relatives: [
                {
                    firstName: "",
                    lastName: "",
                    mail: "",
                    address: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "relatives",
        control: form.control,
    });

    async function onSubmit(values: z.infer<typeof addStudentSchema>) {
        const studentData = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.loginName
                ? values.loginName
                : values.firstName + values.lastName,
            mail: values.loginName
                ? values.loginName + "@viken.no"
                : values.firstName + values.lastName + "@viken.no",
            phone: Number.parseInt(values.phone),
            relatives: values.relatives,
            birthdate: values.birthdate,
            address: {
                street: values.street,
                zipcode: Number.parseInt(values.zipcode),
                city: values.city,
            },
        };
        const loginData = {
            loginName: values.loginName
                ? values.loginName
                : values.firstName + values.lastName,
            roles: ["student"],
            requirePasswordChange: true,
        };
        await axios
            .post("/api/addStudent", studentData, {
                headers: { Authorization: localStorage.getItem("jwt") },
            })
            .then((res) => {
                toast(res.data.message);
            })
            .catch((err: any) => {
                toast.error(err.response.data.message);
            });
        await axios
            .post("/api/addUser", loginData, {
                headers: { Authorization: localStorage.getItem("jwt") },
            })
            .then((res) => {
                toast(res.data.message);
            })
            .catch((err: any) => {
                toast.error(err.response.data.message);
            });
    }

    return (
        <>
            {checkRoles(["admin", "teacher"], user?.roles || []) ? (
                <Card className="w-1/2">
                    <CardHeader>Create student</CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="First name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Last name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="loginName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Login name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Login name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Phone number"
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="birthdate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Birthdate</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="birthdate"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Street</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="street"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="zipcode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zipcode</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Zipcode"
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="city"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {fields.map((_field, index) => {
                                    return (
                                        <div key={index}>
                                            <h2 className="text-xl">
                                                Relative
                                            </h2>
                                            <FormField
                                                control={form.control}
                                                name={`relatives.${index}.firstName`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            First name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="First name"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`relatives.${index}.lastName`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Last name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Last name"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`relatives.${index}.mail`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Email address
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Email address"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`relatives.${index}.phone`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Phone number
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Phone number"
                                                                type="number"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`relatives.${index}.address`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Address
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Address"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    remove(index);
                                                }}
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                    );
                                })}
                                <Button
                                    type="button"
                                    onClick={() => {
                                        append({
                                            firstName: "",
                                            lastName: "",
                                            mail: "",
                                            phone: "",
                                            address: "",
                                        });
                                    }}
                                >
                                    <Plus />
                                </Button>
                                <br />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            ) : (
                <p>You do not have access to this page</p>
            )}
        </>
    );
}

export default AddStudent;
