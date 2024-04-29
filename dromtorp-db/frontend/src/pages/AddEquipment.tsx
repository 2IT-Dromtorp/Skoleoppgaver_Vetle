import { checkRoles } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/assets/Types";
import { useForm } from "react-hook-form";
import { addEquipment } from "@/assets/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { PostAddEquipment } from "@/hooks/UseApi";
import { toast } from "sonner";

function AddEquipment(): JSX.Element {
    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });

    const form = useForm<z.infer<typeof addEquipment>>({
        resolver: zodResolver(addEquipment),
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof addEquipment>) {
        try {
            toast(await PostAddEquipment(values.name));
        } catch (err: any) {
            toast.error(err.message);
        }
    }

    return (
        <>
            {checkRoles(["admin", "teacher"], user?.roles || []) ? (
                <Card>
                    <CardHeader>Add equipment</CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Equipment name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name"
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

export default AddEquipment;
