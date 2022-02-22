import requestor from "../../tier0/requestors/baseRequestor";

export async function needs_captcha( requestor: requestor ) : Promise<void>{
    const result = await requestor.post({url: '/api/v1/needs_captcha'})
    return void 0
}