export interface IFilterRequest {
    date?: string;
    page: number;
    query?: string;
    sortColumn?: string;
    take: number;
    [key: string]: any;
}
