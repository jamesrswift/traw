import { AxiosRequestConfig } from 'axios';
declare module 'axios' {
    interface AxiosRequestConfig {
        form?: {
            [key: string]: string;
        };
        formData?: {
            [key: string]: any;
        };
    }
}
export declare function axiosCreate(baseConfig: AxiosRequestConfig): import("axios").AxiosInstance;
export { AxiosRequestConfig } from 'axios';
