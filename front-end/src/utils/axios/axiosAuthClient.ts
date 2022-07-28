import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AUTH_LOCAL_STORAGE_KEY } from 'config';
import authApi from 'services/api/authApi';

const axiosAuthClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*/*',
        accept: '*/*'
        // Authorization: `bearer ${token}`
    }
});

function getLocalRefreshToken() {
    return localStorage.getItem(AUTH_LOCAL_STORAGE_KEY.REFRESH_TOKEN);
}

// Add a request interceptor
axiosAuthClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        config.headers!.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
axiosAuthClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    (error) => {
        if (error.response.status === 401) {
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

// response parse
axiosAuthClient.interceptors.response.use(
    (response) => {
        const { code, auto } = response.data;
        if (code === 401) {
            if (auto === 'yes') {
                const refreshToken = getLocalRefreshToken();
                if (refreshToken) {
                    return authApi.refreshToken(refreshToken).then((rs) => {
                        const { accessToken = '' } = rs.data?.data;
                        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
                        const config = response.config;
                        config.headers!.Authorization = `Bearer ${accessToken}`;
                        return axiosAuthClient(config);
                    });
                }
            }
        }
        return response;
    },
    (error) => {
        console.warn('Error status', error.response.status);
        return Promise.reject(error);
    }
);

export default axiosAuthClient;
