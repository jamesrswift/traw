import { unsupported_grant_type } from "../../../tier0/exceptions";

export interface access_token_request {
    grant_type: string,
    username: string,
    password: string
}

export interface access_token_response {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string
}

export function access_token( params: access_token_request ){
    
}