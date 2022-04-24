import { AxiosRequestConfig } from "axios";
import userAgent from "../useragent";
import tokenRequestor from "./tokenRequestor";
export interface authCodeGrantRequestorArguments {
    client_id: string;
    client_secret: string;
    userAgent: userAgent;
    code: string;
    redirect_uri: string;
}
/**
 * @Category Requestor
 */
export default class authCodeGrantRequestor extends tokenRequestor {
    private arguments;
    constructor(args: authCodeGrantRequestorArguments);
    protected createUpdateAccessTokenForm(): AxiosRequestConfig['form'];
}
