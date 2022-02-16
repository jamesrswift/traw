
export class response_401 extends Error {
    constructor() {
        super("[TRAW] Client credentials sent as HTTP Basic Authorization were invalid")
    }
}

export class unsupported_grant_type extends Error {
    constructor() {
        super("[TRAW] HTTP Response returned JSON with error 'unsupported_grant_type'.")
    }
}

export class NO_TEXT_for_field_Code extends Error {
    constructor() {
        super("[TRAW] You didn't include the code parameter")
    }
}

export class invalid_grant extends Error {
    constructor() {
        super("[TRAW] the code has expired or already been used")
    }
}