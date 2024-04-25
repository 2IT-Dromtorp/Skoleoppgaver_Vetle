import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { formSchema } from "../assets/Schemas";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useQuery } from "@tanstack/react-query";
import { AuthenticateUser } from "@/hooks/UseApi";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
    const { data, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: AuthenticateUser,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post("/api/login", values).then((res) => {
                localStorage.setItem("jwt", res.data.jwt);
            });
            await refetch();
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <div className="flex justify-center w-full h-fit">
            {data ? (
                <Navigate to={"/"} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Log in</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="Password"
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
            )}
        </div>
    );
}

export default Login;
