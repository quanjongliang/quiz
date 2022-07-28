import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*/*',
        accept: '*/*'
    }
});
// Add a request interceptor
axiosClient.interceptors.request.use(
    // Do something before request is sent
    (config: AxiosRequestConfig) => config,
    // Do something with request error
    (error) => Promise.reject(error)
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    (response: AxiosResponse) => response,
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    (error) => Promise.reject(error)
);

export default axiosClient;
