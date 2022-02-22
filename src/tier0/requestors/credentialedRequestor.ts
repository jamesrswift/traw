import basic_authentication from "../authentication/basic";
import { axiosCreate, AxiosRequestConfig } from "../http";
import userAgent from "../useragent";
import baseRequestor from "./baseRequestor";

export default class credentialedRequestor extends baseRequestor{
    protected auth: basic_authentication;

    constructor( agent: userAgent, auth: basic_authentication ){
        super(agent)
        this.auth = auth;
    }

    async request(config: AxiosRequestConfig){
        const res = await axiosCreate({
            baseURL: 'https://www.reddit.com',
            headers: {
                'user-agent': this.userAgent.toString()
            },
            auth: this.auth.toAxios()
        }).request(config)

        if (res.headers['x-ratelimit-remaining']) {
            this.state.ratelimitRemaining = Number(res.headers['x-ratelimit-remaining'])
            this.state.ratelimitExpiration = Date.now() + (Number(res.headers['x-ratelimit-reset']) * 1000)
        }

        return res
    }

}