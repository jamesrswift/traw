import { credentialsResponse } from "./requestors/tokenRequestor"

/**
 * @category Exceptions
 */
export class NotImplemented extends Error{
    constructor(){
        super("[TRAW] Attempted to call a function without implementation (possibly an internal baseclass?)")
    }
}

/**
 * @category Exceptions
 */
export class updateAccessTokenError extends Error{
    constructor( response: credentialsResponse){
        super( response.error_description ? `${response.error} - ${response.error_description}` : response.error )
    }
}

/**
 * @category Exceptions
 */
export class response_401 extends Error {
    constructor() {
        super("[TRAW] Client credentials sent as HTTP Basic Authorization were invalid")
    }
}

/**
 * @category Exceptions
 */
export class unsupported_grant_type extends Error {
    constructor() {
        super("[TRAW] HTTP Response returned JSON with error 'unsupported_grant_type'.")
    }
}

/**
 * @category Exceptions
 */
export class NO_TEXT_for_field_Code extends Error {
    constructor() {
        super("[TRAW] You didn't include the code parameter")
    }
}

/**
 * @category Exceptions
 */
export class invalid_grant extends Error {
    constructor() {
        super("[TRAW] the code has expired or already been used")
    }
}