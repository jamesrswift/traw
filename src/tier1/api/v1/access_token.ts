import axios from "axios";
import basic_authentication from "../../../tier0/authentication/basic";
import userAgent from "../../../tier0/useragent";

export interface access_token_request {
    grant_type: 'authorization_code' | 'password' | 'refresh_token' | 'client_credentials' | 'https://oauth.reddit.com/grants/installed_client',
    username: string,
    password: string
}

export interface access_token_response {
    access_token: string,
    token_type: 'bearer',
    expires_in: number,
    scope: string
}

export async function access_token( agent: userAgent, params: access_token_request, auth: basic_authentication ) : Promise<access_token_response>{
    const results = await axios({
        method: 'post',
        url: '/api/v1/access_token',
        baseURL: 'https://www.reddit.com/',

        headers: {
            'User-Agent': agent.toString()
        },

        params: params,
        auth: auth.toAxios()
    })

    return {
        access_token: results.data.access_token,
        token_type: results.data.token_type,
        expires_in: results.data.expires_in,
        scope: results.data.scope
    }
}