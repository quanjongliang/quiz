import { PaginationMeta } from './query/pagination';

export type ClassKecho = {
    id?: number;
    year?: string;
    nameClass?: string;
    description?: string;
    level?: string;
    session?: string;
    type?: string;
    createdDate?: Date;
    isDeleted?: boolean;
    idRatio?: string;
    numberChildOfClass?: any[];
    branch?: string;
    staff?: any[];
    [key: string]: any;
};

export interface ClassKechoStateProps {
    classKecho: ClassKecho[];
    classKechoMeta: PaginationMeta;
    classKechoDetails: ClassKecho;
    error: object | string | null;
}
