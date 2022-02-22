import requestor from "../../../../tier0/requestors/baseRequestor";

export interface karma_response{
    kind: string,
    data: {
        sr: string,
        comment_karma: number,
        link_karma: number
    }[]
}

export async function karma( requestor: requestor ) : Promise<karma_response>{
    const result = await requestor.get({url: '/api/v1/me/karma'})
    return <karma_response>result.data
}