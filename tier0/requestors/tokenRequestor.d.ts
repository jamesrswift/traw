import bearer_authentication from "../authentication/bearer";
import baseRequestor from "./baseRequestor";
import { AxiosRequestConfig } from "../http";
import userAgent from "../useragent";
import credentialedRequestor from "./credentialedRequestor";
export interface credentialsResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    error: string;
    error_description: string;
}
/**
 * @Category Requestor
 */
export default class tokenRequestor extends baseRequestor {
    private credentialedRequestor;
    protected token?: bearer_authentication;
    scope?: string[];
    refresh_token?: string;
    constructor(agent: userAgent, credentialedRequestor: credentialedRequestor, token?: bearer_authentication);
    request(config: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
    validateAccessToken(): Promise<bearer_authentication>;
    protected createUpdateAccessTokenForm(): AxiosRequestConfig['form'];
    updateAccessToken(): Promise<bearer_authentication>;
}
