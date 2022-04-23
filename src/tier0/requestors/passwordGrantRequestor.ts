import basic_authentication from "../authentication/basic";
import { AxiosRequestConfig } from "../http";
import userAgent from "../useragent";
import { grantType } from "./baseRequestor";
import credentialedRequestor from "./credentialedRequestor";
import tokenRequestor from "./tokenRequestor";

export interface passwordGrantRequestorArguments{
    userAgent: userAgent,
    username: string,
    password: string,
    client_id: string,
    client_secret: string,
    two_factor_code?: string
}

/**
 * @Category Requestor
 */
export default class passwordGrantRequestor extends tokenRequestor{

    private arguments: passwordGrantRequestorArguments;

    constructor( args: passwordGrantRequestorArguments ){
        super( 
            args.userAgent, 
            new credentialedRequestor(
                args.userAgent,
                new basic_authentication(args.client_id, args.client_secret )
            ) 
        )

        this.arguments = args
    }

    protected override createUpdateAccessTokenForm() : AxiosRequestConfig['form'] {
        if ( this.refresh_token ){
            return super.createUpdateAccessTokenForm()
        }

        const password = this.arguments.two_factor_code ? `${this.arguments.password}:${this.arguments.two_factor_code}` : this.arguments.password
        return {
            grant_type: grantType.PASSWORD,
            username: this.arguments.username,
            password: password
        }
    }
}