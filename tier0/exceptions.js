"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalid_grant = exports.NO_TEXT_for_field_Code = exports.unsupported_grant_type = exports.response_401 = exports.updateAccessTokenError = exports.NotImplemented = void 0;
/**
 * @category Exceptions
 */
class NotImplemented extends Error {
    constructor() {
        super("[TRAW] Attempted to call a function without implementation (possibly an internal baseclass?)");
    }
}
exports.NotImplemented = NotImplemented;
/**
 * @category Exceptions
 */
class updateAccessTokenError extends Error {
    constructor(response) {
        super(response.error_description ? `${response.error} - ${response.error_description}` : response.error);
    }
}
exports.updateAccessTokenError = updateAccessTokenError;
/**
 * @category Exceptions
 */
class response_401 extends Error {
    constructor() {
        super("[TRAW] Client credentials sent as HTTP Basic Authorization were invalid");
    }
}
exports.response_401 = response_401;
/**
 * @category Exceptions
 */
class unsupported_grant_type extends Error {
    constructor() {
        super("[TRAW] HTTP Response returned JSON with error 'unsupported_grant_type'.");
    }
}
exports.unsupported_grant_type = unsupported_grant_type;
/**
 * @category Exceptions
 */
class NO_TEXT_for_field_Code extends Error {
    constructor() {
        super("[TRAW] You didn't include the code parameter");
    }
}
exports.NO_TEXT_for_field_Code = NO_TEXT_for_field_Code;
/**
 * @category Exceptions
 */
class invalid_grant extends Error {
    constructor() {
        super("[TRAW] the code has expired or already been used");
    }
}
exports.invalid_grant = invalid_grant;
