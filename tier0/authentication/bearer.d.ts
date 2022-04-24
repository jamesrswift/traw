import authentication_strategy from "./baseclass";
/**
 * @Category Authentication
 * @description Bearer authentication
 */
export default class bearer_authentication extends authentication_strategy {
    private bearer;
    constructor(bearer: string);
    toString(): string;
}
