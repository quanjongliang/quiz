import axios from 'axios';
import { PromiseApi } from 'types/api-promise';
import { LoginForm, RegisterForm } from 'types/authTypes/auth-form';
import requestApi, { buildUrl } from './requestApi';

const BaseApi = 'auth/';

const authApi = {
    resgister(params: RegisterForm): Promise<PromiseApi> {
        const base = `${BaseApi}register`;
        const url = buildUrl(base, params);
        return requestApi.post(url, params);
    },
    login(params: LoginForm): Promise<PromiseApi> {
        const base = `${BaseApi}login`;
        const url = buildUrl(base, params);
        return requestApi.post(url, params);
    },
    refreshToken(refreshToken: string): Promise<PromiseApi> {
        const base = `${BaseApi}refresh-token`;
        const url = buildUrl(base);
        return axios.get(url, {
            baseURL: process.env.REACT_APP_API_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshToken}`
            }
        });
    }
};
export default authApi;
