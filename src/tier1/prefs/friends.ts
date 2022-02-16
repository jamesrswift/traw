import authenticated_requestor from "../baseRequestor";

export interface friends_response{
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

export async function friends( requestor: authenticated_requestor ) : Promise<friends_response[]>{
    const result = await requestor.get({url: '/prefs/friends'})
    return <friends_response[]>result.data
}