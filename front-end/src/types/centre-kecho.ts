import { PaginationMeta } from './query/pagination';

export type CentreKecho = {
    id?: number;
    littleLiveId?: number;
    nameCenter?: string;
    operatingHoursFrom?: string;
    operatingHoursTo?: string;
    ecdaId?: number;
    address?: string;
    createdDate?: Date;
    isDeleted?: boolean;
    ECDA_ID?: string;
};

export interface CentreKechoStateProps {
    centreKecho: CentreKecho[];
    centreKechoDetails: CentreKecho;
    centreKechoMeta: PaginationMeta;
    error: object | string | null;
}
