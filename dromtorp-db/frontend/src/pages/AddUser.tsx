import { addUserSchema } from "@/assets/Schemas";
import { User } from "@/assets/Types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { checkRoles } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function AddUser(): JSX.Element {
    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });

    const form = useForm<z.infer<typeof addUserSchema>>({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            loginName: "",
            roles: "",
        },
    });

    async function onSubmit(values: z.infer<typeof addUserSchema>) {
        const loginData = {
            loginName: values.loginName,
            roles: values.roles.split(","),
            requirePasswordChange: true,
        };
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
            {checkRoles(["admin"], user?.roles || []) ? (
                <Card>
                    <CardHeader>Add user</CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
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
                                    name="roles"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Roles</FormLabel>
                                            <FormDescription>
                                                A comma separated list of roles
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    placeholder="Roles"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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

export default AddUser;
