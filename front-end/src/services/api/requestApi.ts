import axios from 'axios';
import { AUTH_LOCAL_STORAGE_KEY } from 'config';
// import { AUTHEN_TOKEN } from 'constants/key';
import { PromiseApi } from 'types/api-promise';

const timeout = 30000;
const baseURL = process.env.REACT_APP_API_URL;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
    PATCH: 'patch'
};

const ARRAY_METHOD_NOTIFY = [METHOD.PUT, METHOD.POST, METHOD.DELETE, METHOD.PATCH];

export interface GetApiFilter {
    page_size?: number;
    page?: number;
}

interface ApiRespoonse {
    statusCode: number;
    data?: any;
    message?: string;
    status?: number;
}

export const headerUploadFile = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

export function buildUrl(url: any, parameters?: any) {
    let qs = '';
    for (const key in parameters) {
        if (parameters[key]) {
            const value = parameters[key];
            qs += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1);
        url = `${url}?${qs}`;
    }
    return url;
}
const defaultOptions = () => {
    const authenToken = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    return {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authenToken ? `Bearer ${authenToken}` : ''
        },
        baseURL,
        timeout,
        cancelToken: source.token
    };
};

const RequestApi = async (
    method: any,
    url: string,
    options: any,
    data?: any,
    showNotifi: boolean = true,
    header?: any
): Promise<PromiseApi> => {
    try {
        const axios_response = await axios({
            ...defaultOptions(),
            ...options,
            ...header,
            url,
            method,
            data
        });

        const response = axios_response.data as ApiRespoonse;
        const message = response.message;
        if (response.statusCode === 200 || axios_response.status === 201) {
            if (ARRAY_METHOD_NOTIFY.indexOf(method) > 0) {
                //    if (showNotifi) window.notify(message, "alert-success");
            }
            return { data: response, dataList: response.data };
        }
        if (ARRAY_METHOD_NOTIFY.indexOf(method)) {
            // if (showNotifi) window.notify(message, "alert-danger");
        }
        return { error: new Error(message), message };
    } catch (error: any) {
        if (error?.response?.status === 401) window.location.pathname = 'login';
        const message = error.response && error.response.data && error.response.data.msg;
        // if (showNotifi) window.notify(message, "alert-danger");
        return { error, message };
    }
};

const get = (url: string, options: any = {}, showNotifi?: boolean) => {
    return RequestApi(METHOD.GET, url, options, showNotifi);
};

const post = (url: string, data: any, options: any = {}, showNotifi?: boolean, header: any = {}) => {
    return RequestApi(METHOD.POST, url, options, data, showNotifi, header);
};

const put = (url: string, data: any, options: any = {}, showNotifi?: boolean) => {
    return RequestApi(METHOD.PUT, url, options, data, showNotifi);
};

const deleteApi = (url: string, options: any = {}, showNotifi?: boolean) => {
    return RequestApi(METHOD.DELETE, url, options, showNotifi);
};

const patch = (url: string, data: any, options: any = {}, showNotifi?: boolean) => {
    return RequestApi(METHOD.PATCH, url, options, data, showNotifi);
};
const requestApi = {
    get,
    post,
    put,
    patch,
    delete: deleteApi
};

export default requestApi;
