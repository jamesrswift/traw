import { AxiosRequestConfig } from "../http";
import userAgent from "../useragent";
import tokenRequestor from "./tokenRequestor";
export interface passwordGrantRequestorArguments {
    userAgent: userAgent;
    username: string;
    password: string;
    client_id: string;
    client_secret: string;
    two_factor_code?: string;
}
/**
 * @Category Requestor
 */
export default class passwordGrantRequestor extends tokenRequestor {
    private arguments;
    constructor(args: passwordGrantRequestorArguments);
    protected createUpdateAccessTokenForm(): AxiosRequestConfig['form'];
}
