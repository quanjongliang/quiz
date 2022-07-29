import { BaseColumn } from "../base";
import { Quiz } from "../quiz";
export declare enum USER_ROLE {
    ADMIN = "ADMIN",
    USER = "USER"
}
export interface PayloadTokenUser {
    id: string;
    username: string;
    role: USER_ROLE;
    phone?: string;
    email?: string;
}
export declare type UserWithOutPassword = Omit<User, "password">;
export declare const USER_TABLE_NAME = "user";
export declare class User extends BaseColumn {
    username: string;
    email: string;
    password: string;
    role: USER_ROLE;
    confirmedEmail: boolean;
    phone: string;
    currentHashedRefreshToken: string;
    quizs: Quiz[];
}
