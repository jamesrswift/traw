import { AxiosResponse } from 'axios';
import { AxiosRequestConfig } from '../http'
import userAgent from '../useragent';

/**
 * @enum grantType
 */
export const enum grantType{
    CLIENT_CREDENTIALS = 'client_credentials',
    INSTALLED_CLIENT = 'https://oauth.reddit.com/grants/installed_client',
    REFRESH_TOKEN = 'refresh_token',
    PASSWORD = 'password',
    AUTHORIZATION_CODE = 'authorization_code' 
}

export interface State {
    ratelimitRemaining: number
    ratelimitExpiration: number
    tokenExpiration: number
    initialGrantType?: grantType
}

export default abstract class baseRequestor{

    protected userAgent: userAgent;

    protected state: State = {
        ratelimitRemaining: Infinity,
        ratelimitExpiration: Infinity,
        tokenExpiration: Infinity
    }

    constructor( agent: userAgent ){
        this.userAgent = agent;
    }

    async request(config: AxiosRequestConfig) : Promise<AxiosResponse<any, any>>{
        throw new Error("[TRAW] request not implemented on current requestor class")
    }

    public get(config: AxiosRequestConfig) { config.method = "GET"; return this.request(config) }
    public head(config: AxiosRequestConfig) { config.method = "HEAD"; return this.request(config) }
    public post(config: AxiosRequestConfig) { config.method = "POST"; return this.request(config) }
    public put(config: AxiosRequestConfig) { config.method = "PUT"; return this.request(config) }
    public delete(config: AxiosRequestConfig) { config.method = "DELETE"; return this.request(config) }
    public patch(config: AxiosRequestConfig) { config.method = "PATCH"; return this.request(config) }

}