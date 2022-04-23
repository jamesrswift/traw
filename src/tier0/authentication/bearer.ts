import authentication_strategy from "./baseclass";

/**
 * @Category Authentication
 * @description Bearer authentication
 */
export default class bearer_authentication extends authentication_strategy{
    constructor(
        private bearer: string
    ) {
        super()
    }

    public toString(): string {
        return `Bearer ${this.bearer}`
    }
}