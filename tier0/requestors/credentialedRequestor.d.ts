import basic_authentication from "../authentication/basic";
import { AxiosRequestConfig } from "../http";
import userAgent from "../useragent";
import baseRequestor from "./baseRequestor";
/**
 * @Category Requestor
 */
export default class credentialedRequestor extends baseRequestor {
    protected auth: basic_authentication;
    constructor(agent: userAgent, auth: basic_authentication);
    request(config: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
}
