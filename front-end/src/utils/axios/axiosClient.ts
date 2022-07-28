import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosFileUpload = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        accept: '*/*'
    }
});
// Add a request interceptor
axiosFileUpload.interceptors.request.use(
    // Do something before request is sent
    (config: AxiosRequestConfig) => config,
    // Do something with request error
    (error) => Promise.reject(error)
);

// Add a response interceptor
axiosFileUpload.interceptors.response.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    (response: AxiosResponse) => response,
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    (error) => Promise.reject(error)
);

export default axiosFileUpload;
