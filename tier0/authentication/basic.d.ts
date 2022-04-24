import { AxiosBasicCredentials } from "axios";
import authentication_strategy from "./baseclass";
/**
 * @Category Authentication
 * @description Username and password authentication
 */
export default class basic_authentication extends authentication_strategy {
    private username;
    private password;
    constructor(username: string, password: string);
    toString(): string;
    toAxios(): AxiosBasicCredentials;
}
