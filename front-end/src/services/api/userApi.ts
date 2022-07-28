// import { upperCase } from 'lodash';
import { PromiseApi } from 'types/api-promise';
import { ListUserPagination } from 'types/authTypes/auth-form';
// import axiosAuthClient from 'utils/axios/axiosAuthClient';
import axiosFileUpload from 'utils/axios/axiosFileUpload';
import requestApi, { buildUrl } from './requestApi';

const BaseApi = 'auth/';

const userApi = {
    currentUser(): Promise<PromiseApi> {
        const base = `${BaseApi}current-user`;
        const url = buildUrl(base);
        return requestApi.get(url);
    },

    listUser(params: ListUserPagination): Promise<PromiseApi> {
        const base = `${BaseApi}list-user`;
        const url = buildUrl(base, params);
        return requestApi.get(url);
    },
    deleteUser(id: number): Promise<PromiseApi> {
        const base = `${BaseApi}delete-user/${id}`;
        const url = buildUrl(base);
        return requestApi.delete(url);
    },
    listRole(): Promise<PromiseApi> {
        const base = `${BaseApi}list-role`;
        const url = buildUrl(base);
        return requestApi.get(url);
    },
    importLeaveExcel(body: FormData) {
        const base = `${BaseApi}import-leave-excel`;
        const url = buildUrl(base);
        return axiosFileUpload.post(url, body);
    }
};
export default userApi;
