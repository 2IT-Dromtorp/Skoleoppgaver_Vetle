export type Equipment = {
    _id: string;
    name: string;
    available: boolean;
    burrowRequesters: string[];
};

export type User = {
    _id: string;
    loginName: string;
    roles: string[];
};
