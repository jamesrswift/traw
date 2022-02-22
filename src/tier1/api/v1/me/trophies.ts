import requestor from "../../../../tier0/requestors/baseRequestor";

export interface trophies_response{
    kind: string,
    data: {
        trophies: {
            kind: string,
            data: {
                icon_70: string,
                granted_at: number | null,
                url: string | null,
                icon_40: string,
                name: string,
                award_id: string | null,
                id: string | null,
                description: string | null
            }
        }[]
    }
}

export async function karma( requestor: requestor ) : Promise<trophies_response>{
    const result = await requestor.get({url: '/api/v1/me/trophies'})
    return <trophies_response>result.data
}