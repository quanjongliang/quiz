import { Order } from 'config';

export type PaginationOption = {
    order: any;
    page: number;
    query: string;
    sortColumn: string;
    take: number;
};

export type PaginationMeta = {
    page?: number;
    take?: number;
    itemCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
};
