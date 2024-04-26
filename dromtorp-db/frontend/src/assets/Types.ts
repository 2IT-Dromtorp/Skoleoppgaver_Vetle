export type Equipment = {
    _id: string;
    name: string;
    available: boolean;
    burrowRequesters: string[];
    burrower?: Student;
};

export type User = {
    _id: string;
    loginName: string;
    roles: string[];
    requirePasswordChange: boolean;
};

export type Student = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    mail: string;
    phone: number;
    relatives: {
        firstName: string;
        lastName: string;
        mail: string;
        phone: number;
        address: string;
    }[];
    birthdate: string;
    address: {
        street: string;
        zipcode: number;
        city: string;
    };
};

export type Request = {
    _id: string;
    date: string;
    student: Student;
    equipment: Equipment;
};
