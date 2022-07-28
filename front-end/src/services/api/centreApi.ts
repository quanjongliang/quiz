import { PromiseApi } from 'types/api-promise';
import { PaginationOption } from 'types/query/pagination';
import requestApi, { buildUrl } from './requestApi';

const BaseApi = 'center/';

const centreApi = {
    listCentre(params: PaginationOption): Promise<PromiseApi> {
        const base = `${BaseApi}list-center`;
        const url = buildUrl(base, params);
        return requestApi.get(url);
    },
    getDetailsById(id: string): Promise<PromiseApi> {
        const base = `${BaseApi}${id}`;
        const url = buildUrl(base);
        return requestApi.get(url);
    }
};
export default centreApi;
