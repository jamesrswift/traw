import axios from "axios";
import bearer_authentication from "../../tier0/authentication/bearer";
import userAgent from "../../tier0/useragent";

export async function needs_captcha(agent: userAgent, auth: bearer_authentication ) : Promise<void>{
    const results = await axios({
        method: 'post',
        url: '/api/v1/revoke_token',
        baseURL: 'https://www.reddit.com/',

        headers: {
            'User-Agent': agent.toString(),
            'Authorization': auth.toString()
        },

        params: {},
    })
    
    return void 0;
}