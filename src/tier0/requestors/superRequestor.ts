import basic_authentication from "../authentication/basic";
import { AxiosRequestConfig } from "../http";
import userAgent from "../useragent";
import { grantType } from "./baseRequestor";
import credentialedRequestor from "./credentialedRequestor";
import tokenRequestor from "./tokenRequestor";

export interface Common {
    redirect_uri?: string
    user_agent?: userAgent  // not needed for browser
    device_id?: string  // default: 'DO_NOT_TRACK_THIS_DEVICE'
    grant_type?: string // default: 'https://oauth.reddit.com/grants/installed_client'
    debug?: boolean
}

export interface AppAuth extends Common {
    client_id: string
    client_secret?: string // default: ''
    refresh_token?: string
    access_token?: string
}

export interface ScriptAuth extends Common {
    client_id: string
    client_secret: string
    username: string
    password: string
    two_factor_code?: number | string
    access_token?: string
}

export interface CodeAuth extends Common {
    client_id: string
    client_secret?: string
    code: string
    redirect_uri: string
}

export interface All extends Common {
    client_id?: string
    client_secret?: string
    refresh_token?: string
    access_token?: string
    username?: string
    password?: string
    two_factor_code?: number | string
    code?: string
    redirect_uri?: string
}

export type superRequestorArguments = All

export default class superRequestor extends tokenRequestor{

    private arguments: superRequestorArguments;

    constructor( args: superRequestorArguments ){
        super( 
            args.user_agent!, 
            new credentialedRequestor(
                args.user_agent!,
                new basic_authentication(args.client_id!, args.client_secret! )
            ) 
        )

        this.arguments = args
    }

    protected override createUpdateAccessTokenForm() : AxiosRequestConfig['form'] {
        if ( this.refresh_token ){
            return super.createUpdateAccessTokenForm()
        }

        if (this.arguments.username && this.arguments.password) {
            const password = this.arguments.two_factor_code ? `${this.arguments.password}:${this.arguments.two_factor_code}` : this.arguments.password
            return  {
                grant_type: grantType.PASSWORD,
                username: this.arguments.username,
                password
            }
        } else if (this.arguments.code && this.arguments.redirect_uri) {
            return {
                grant_type: grantType.AUTHORIZATION_CODE,
                code: this.arguments.code,
                redirect_uri: this.arguments.redirect_uri
            }
        } else if (this.arguments.grant_type && this.arguments.device_id) { // fallback
            return {
                grant_type: this.arguments.grant_type,
                device_id: this.arguments.device_id
            }
        }
    }
}