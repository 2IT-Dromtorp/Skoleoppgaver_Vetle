export type sport = {
    _id: string;
    name: string;
    description: string;
    members: number;
};

export type tournament = {
    _id: string;
    sport: string;
    name: string;
    date: string;
    time: string;
    place: string;
    skillLevel: string;
    description: string;
};

export type request = {
    _id: string;
    sport: string;
    name: string;
    email: string;
};
