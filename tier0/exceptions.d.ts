import { credentialsResponse } from "./requestors/tokenRequestor";
/**
 * @category Exceptions
 */
export declare class NotImplemented extends Error {
    constructor();
}
/**
 * @category Exceptions
 */
export declare class updateAccessTokenError extends Error {
    constructor(response: credentialsResponse);
}
/**
 * @category Exceptions
 */
export declare class response_401 extends Error {
    constructor();
}
/**
 * @category Exceptions
 */
export declare class unsupported_grant_type extends Error {
    constructor();
}
/**
 * @category Exceptions
 */
export declare class NO_TEXT_for_field_Code extends Error {
    constructor();
}
/**
 * @category Exceptions
 */
export declare class invalid_grant extends Error {
    constructor();
}
