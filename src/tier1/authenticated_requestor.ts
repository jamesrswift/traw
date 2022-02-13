import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import bearer_authentication from "../tier0/authentication/bearer";
import userAgent from "../tier0/useragent";

export interface xRateLimit{
    remaining: number;
    used: number;
    reset: number;
}

export default class authenticated_requestor{

    constructor(auth: bearer_authentication, userAgent: userAgent, bDebug : boolean = false ){
        this.auth = auth;
        this.userAgent = userAgent;
        this.bDebug = bDebug;
        this.xRateLimit = {
            remaining: Infinity,
            used: 0,
            reset: 0
        }
    }

    private auth: bearer_authentication;
    private userAgent: userAgent;
    private bDebug: boolean;
    private xRateLimit: xRateLimit;

    public async new<Type>(config: AxiosRequestConfig) : Promise<AxiosResponse<Type>>{

        // Await rate limit reset if 0;
        if ( this.xRateLimit.remaining < 1 ){
            await new Promise( r => setTimeout(r, this.xRateLimit.reset * 1000 ))
        }

        // Setup default values
        config.baseURL = config.baseURL ?? 'https://oauth.reddit.com/';
        config.headers = {
            'User-Agent': this.userAgent.toString(),
            'Authorization': this.auth.toString()
        }


        const result = await axios( config )

        // Maybe add some checking to see if this request didn't exceed limit?

        // Keep xRateLimit up to date
        this.xRateLimit = {
            remaining: Number((result.headers["x-ratelimit-remaining"])),
            used: Number((result.headers["x-ratelimit-used"])),
            reset: Number((result.headers["x-ratelimit-reset"]))
        }

        return result
    }

    public get(config: AxiosRequestConfig){ config.method = "GET"; return this.new(config) }
    public head(config: AxiosRequestConfig){ config.method = "HEAD"; return this.new(config) }
    public post(config: AxiosRequestConfig){ config.method = "POST"; return this.new(config) }
    public put(config: AxiosRequestConfig){ config.method = "PUT"; return this.new(config) }
    public delete(config: AxiosRequestConfig){ config.method = "DELETE"; return this.new(config) }
    public patch(config: AxiosRequestConfig){ config.method = "PATCH"; return this.new(config) }
}