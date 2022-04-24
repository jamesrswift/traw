import { AxiosResponse } from 'axios';
import { AxiosRequestConfig } from '../http';
import userAgent from '../useragent';
/**
 * @enum grantType
 */
export declare const enum grantType {
    CLIENT_CREDENTIALS = "client_credentials",
    INSTALLED_CLIENT = "https://oauth.reddit.com/grants/installed_client",
    REFRESH_TOKEN = "refresh_token",
    PASSWORD = "password",
    AUTHORIZATION_CODE = "authorization_code"
}
export interface State {
    ratelimitRemaining: number;
    ratelimitReset: number;
    ratelimitExpiration: number;
    tokenExpiration: number;
    initialGrantType?: grantType;
}
/**
 * @Category Requestor
 */
export default abstract class baseRequestor {
    protected userAgent: userAgent;
    protected state: State;
    constructor(agent: userAgent);
    request(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    awaitRateLimit(): Promise<void>;
    handleRateLimitResponse(respone: AxiosResponse): void;
    get(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    head(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    post(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    put(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    delete(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    patch(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
}
