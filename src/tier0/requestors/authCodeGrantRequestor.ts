import { AxiosRequestConfig } from "axios";
import basic_authentication from "../authentication/basic";
import userAgent from "../useragent";
import { grantType } from "./baseRequestor";
import credentialedRequestor from "./credentialedRequestor";
import tokenRequestor from "./tokenRequestor";

export interface authCodeGrantRequestorArguments{
    client_id: string,
    client_secret: string,
    userAgent: userAgent,
    code: string,
    redirect_uri: string
}

/**
 * @Category Requestor
 */
export default class authCodeGrantRequestor extends tokenRequestor{

    private arguments: authCodeGrantRequestorArguments;
    
    constructor( args: authCodeGrantRequestorArguments){
        super(
            args.userAgent, 
            new credentialedRequestor(
                args.userAgent,
                new basic_authentication(args.client_id, args.client_secret )
            ) 
        )
        this.arguments = args
    }

    protected override createUpdateAccessTokenForm(): AxiosRequestConfig['form'] {
        if ( this.refresh_token ){
            return super.createUpdateAccessTokenForm()
        }

        return {
            grant_type: grantType.AUTHORIZATION_CODE,
            code: this.arguments.code,
            redirect_uri: this.arguments.redirect_uri
        }

    }
}