import { Order } from 'config';

export interface RegisterForm {
    username: string;
    password: string;
    name: string;
    roleId: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface ListUserPagination {
    order?: Order;
    page?: number;
    take?: number;
    sortColumn?: string;
    query?: string;
}

export enum UserRole {
    USER = 1,
    PRINCIPAL = 2,
    CLUSTER_MANAGER = 3,
    HQ_ADMIN = 4
}
