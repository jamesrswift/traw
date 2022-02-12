
export class unsupported_grant_type extends Error {
    constructor(){
        super("[TRAW] HTTP Response returned JSON with error 'unsupported_grant_type'.")
    }
}