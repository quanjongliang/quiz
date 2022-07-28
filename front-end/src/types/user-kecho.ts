export type UserKechoProfile = {
    id?: number;
    name?: string;
    username?: string;
    createdDate?: Date;
    role?: {
        id?: number;
        roleName?: string;
    };
};
