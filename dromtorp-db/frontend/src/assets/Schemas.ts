import { z } from "zod";

export const formSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const addStudentSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    loginName: z.string(),
    phone: z.string(),
    birthdate: z.string(),
    street: z.string(),
    zipcode: z.string(),
    city: z.string(),
    relatives: z
        .array(
            z.object({
                firstName: z.string(),
                lastName: z.string(),
                mail: z.string(),
                phone: z.string(),
                address: z.string(),
            })
        )
        .min(1),
});

export const changePasswordSchema = z
    .object({
        oldPassword: z.string(),
        newPassword: z.string(),
    })
    .refine((val) => val.newPassword != val.oldPassword);

export const addEquipment = z.object({
    name: z.string(),
});

export const addUserSchema = z.object({
    loginName: z.string(),
    roles: z.string(),
});
