import basic_authentication from "../authentication/basic";
import { axiosCreate, AxiosRequestConfig } from "../http";
import userAgent from "../useragent";
import baseRequestor from "./baseRequestor";

/**
 * @Category Requestor
 */
export default class credentialedRequestor extends baseRequestor{
    protected auth: basic_authentication;

    constructor( agent: userAgent, auth: basic_authentication ){
        super(agent)
        this.auth = auth;
    }

    async request(config: AxiosRequestConfig){

        // Await rate limit reset if 0
        await this.awaitRateLimit();

        const res = await axiosCreate({
            baseURL: 'https://www.reddit.com',
            headers: {
                'user-agent': this.userAgent.toString()
            },
            auth: this.auth.toAxios()
        }).request(config)

        this.handleRateLimitResponse(res)
        return res
    }

}