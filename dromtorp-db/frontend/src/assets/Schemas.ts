import { z } from "zod";

export const formSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const addStudentSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    loginName: z.string(),
    phone: z.number(),
    birthdate: z.string(),
    street: z.string(),
    zipcode: z.number(),
    city: z.string(),
    relatives: z
        .array(
            z.object({
                firstName: z.string(),
                lastName: z.string(),
                mail: z.string(),
                phone: z.number(),
                address: z.string(),
            })
        )
        .min(1),
});
