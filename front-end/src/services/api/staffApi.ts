import { PromiseApi } from 'types/api-promise';
import { PaginationOption } from 'types/query/pagination';
import { StaffKechoRegister } from 'types/staff-kecho';
import requestApi, { buildUrl } from './requestApi';

const BaseApi = 'staff/';

const staffApi = {
    list(params: PaginationOption): Promise<PromiseApi> {
        const base = `${BaseApi}list-staff`;
        const url = buildUrl(base, params);
        return requestApi.get(url);
    },
    getDetailsById(id: string): Promise<PromiseApi> {
        const base = `${BaseApi}${id}`;
        const url = buildUrl(base);
        return requestApi.get(url);
    },
    createStaff(body: StaffKechoRegister): Promise<PromiseApi> {
        const base = `${BaseApi}`;
        const url = buildUrl(base);
        return requestApi.post(url, body);
    },
    deleteStaff(id: string): Promise<PromiseApi> {
        const base = `${BaseApi}delete/${id}`;
        const url = buildUrl(base);
        return requestApi.delete(url);
    },
    updateStaff(id: number, body: StaffKechoRegister): Promise<PromiseApi> {
        const base = `${BaseApi}${id}`;
        const url = buildUrl(base);
        return requestApi.put(url, body);
    }
};
export default staffApi;
