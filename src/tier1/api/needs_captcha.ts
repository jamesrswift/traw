import authenticated_requestor from "../baseRequestor";

export async function needs_captcha( requestor: authenticated_requestor ) : Promise<void>{
    const result = await requestor.post({url: '/api/v1/needs_captcha'})
    return void 0
}