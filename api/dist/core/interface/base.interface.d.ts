export declare enum ORDER {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class BaseQuery {
    limit?: number;
    offset?: number;
}
export declare class BaseQueryResponse<T> {
    data: T[];
    total: number;
}
export declare class PageOptionsDto {
    readonly order?: ORDER;
    readonly page: number;
    readonly take: number;
    readonly sortColumn: string;
    readonly query: string;
    get skip(): number;
}
