import { CentreKecho } from './centre-kecho';
// import { ClassKecho } from './class-kecho';
import { PaginationMeta } from './query/pagination';

export type StaffKecho = {
    id?: string;
    roleStaff?: string;
    nameStaff?: string;
    email?: string;
    diploma?: string;
    createdDate?: Date;
    updatedDate?: Date;
    startDate?: Date;
    isDeleted?: boolean;
    cert?: any;
    [key: string]: any;
    center?: CentreKecho;
};

export type StaffKechoRegister = {
    role: string;
    name: string;
    email: string;
    diploma: string;
    startDate?: Date;
    centerId?: string;
    classId?: string;
};

export interface StaffKechoStateProps {
    staffKecho: StaffKecho[];
    staffKechoDetails: StaffKecho;
    staffKechoMeta: PaginationMeta;
    error: object | string | null;
}
