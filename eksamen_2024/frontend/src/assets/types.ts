export type sport = {
    _id: string;
    name: string;
    description: string;
    members: number;
};

export type tournament = {
    _id: string;
    name: string;
    description: string;
    sport: string;
    participants: number;
};

export type request = {
    _id: string;
    sport: string;
    name: string;
    email: string;
};
