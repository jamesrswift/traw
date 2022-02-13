import axios from "axios";
import basic_authentication from "../../../tier0/authentication/basic";
import userAgent from "../../../tier0/useragent";

export interface revoke_token_request{
    token: string,
    token_type_hint?: 'refresh_token' | 'access_token'
}

export interface revoke_token_response{

}

export async function revoke_token(agent: userAgent, params: revoke_token_request, auth: basic_authentication ) : Promise<revoke_token_response>{
    const results = await axios({
        method: 'post',
        url: '/api/v1/revoke_token',
        baseURL: 'https://www.reddit.com/',

        headers: {
            'User-Agent': agent.toString()
        },

        params: params,
        auth: auth.toAxios()
    })
    return Promise.resolve<revoke_token_response>({ })
}