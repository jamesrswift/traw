import authenticated_requestor from "../baseRequestor";

export interface blocked_response{
    kind: string,
    data: {
        children: {
            date: number,
            rel_id: string,
            name: string,
            id: string
        }[]
    }
}

export async function friends( requestor: authenticated_requestor ) : Promise<blocked_response>{
    const result = await requestor.get({url: '/prefs/blocked'})
    return <blocked_response>result.data
}