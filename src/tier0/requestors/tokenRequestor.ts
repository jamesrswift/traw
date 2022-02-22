import bearer_authentication from "../authentication/bearer";
import baseRequestor, {grantType} from "./baseRequestor";
import { axiosCreate, AxiosRequestConfig } from "../http";
import userAgent from "../useragent";
import credentialedRequestor from "./credentialedRequestor";
import { util } from "chai";
import { updateAccessTokenError } from "../exceptions";

export interface credentialsResponse {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string,
    token_type: string,
    error: string
    error_description: string
}

export default class tokenRequestor extends baseRequestor{

    private credentialedRequestor: credentialedRequestor;
    protected token?: bearer_authentication;
    public scope?: string[]
    public refresh_token?: string;

    constructor( agent: userAgent, credentialedRequestor: credentialedRequestor, token?: bearer_authentication ){
        super(agent)
        this.credentialedRequestor = credentialedRequestor
        this.token = token;
    }

    async request(config: AxiosRequestConfig){
        this.token = await this.updateAccessToken();
        const res = await axiosCreate({
            baseURL: 'https://oauth.reddit.com',
            headers: {
                authorization: this.token.toString(),
                'user-agent': this.userAgent.toString()
            },
            params: {
                raw_json: 1
            }
        }).request(config)

        if (res.headers['x-ratelimit-remaining']) {
            this.state.ratelimitRemaining = Number(res.headers['x-ratelimit-remaining'])
            this.state.ratelimitExpiration = Date.now() + (Number(res.headers['x-ratelimit-reset']) * 1000)
        }

        return res
    }

    async validateAccessToken( ) : Promise<bearer_authentication>{
        if( !this.token || Date.now() > this.state.tokenExpiration ){
            return this.updateAccessToken();
        }
        return this.token;
    }

    protected createUpdateAccessTokenForm() : AxiosRequestConfig['form'] {
        if ( this.refresh_token ){
            return {
                grant_type: grantType.REFRESH_TOKEN,
                refresh_token: this.refresh_token
            }
        }
    }

    async updateAccessToken() : Promise<bearer_authentication>{
        
        const form = this.createUpdateAccessTokenForm();
        // if (!this.state.initialGrantType) this.state.initialGrantType = form.grant_type
        const res = await this.credentialedRequestor.post({ url: 'api/v1/access_token', form })
        const parsedResponse: credentialsResponse = res.data

        if (parsedResponse.error){
            throw new updateAccessTokenError(parsedResponse)
        }

        this.token = new bearer_authentication( parsedResponse.access_token )
        this.refresh_token = parsedResponse.refresh_token
        this.state.tokenExpiration = Date.now() + (parsedResponse.expires_in * 1000)
        this.scope = parsedResponse.scope.split(' ')

        return this.token
    }

}