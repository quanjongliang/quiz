export declare abstract class BaseColumn {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
export declare const RELATION_WITH: (relations: string[]) => {
    relations: string[];
};
