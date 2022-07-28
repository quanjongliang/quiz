import { PromiseApi } from 'types/api-promise';
import requestApi, { buildUrl } from './requestApi';
import { IFilterRequest } from 'types/query/filter';

const BaseRatioApi = 'ratio/';

const ratioApi = {
    listClass(params: IFilterRequest): Promise<PromiseApi> {
        const base = `${BaseRatioApi}list-ratio`;
        const url = buildUrl(base, params);
        return requestApi.get(url);
    },
    listStaff(params: IFilterRequest): Promise<PromiseApi> {
        const base = `${BaseRatioApi}list-staff`;
        const url = buildUrl(base, params);
        return requestApi.get(url);
    },
    saveRatio(body: any): Promise<PromiseApi> {
        const url = `${BaseRatioApi}save-ratio`;
        return requestApi.post(url, body);
    }
};
export default ratioApi;
