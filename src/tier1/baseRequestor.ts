import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import URLSearchParams from './utils/URLSearchParams'
import FormData from './utils/FormData'
import isBrowser from './utils/isBrowser'

declare module 'axios' {
    export interface AxiosRequestConfig {
        form?: {
            [key: string]: string
        }
        formData?: {
            [key: string]: any
        }
    }
}

export const grantTypes = {
    CLIENT_CREDENTIALS: 'client_credentials',
    INSTALLED_CLIENT: 'https://oauth.reddit.com/grants/installed_client',
    REFRESH_TOKEN: 'refresh_token',
    PASSWORD: 'password',
    AUTHORIZATION_CODE: 'authorization_code'
}

export interface State {
    ratelimitRemaining: number
    ratelimitExpiration: number
    tokenExpiration: number
}

export interface Common {
    redirect_uri?: string
    user_agent?: /*userAgent |*/ string // not needed for browser
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

export interface BaseRequestor extends All {}

export class BaseRequestor {

    private state: State = {
        ratelimitRemaining: Infinity,
        ratelimitExpiration: 0,
        tokenExpiration: 0
    }

    constructor(options: AppAuth)
    constructor(options: ScriptAuth)
    constructor(options: CodeAuth)
    constructor(options: Common)
    constructor(options: All) {
        this.setOptions(options)
    }

    setOptions(options: All) {
        this.client_id = options.client_id
        this.client_secret = options.client_secret || ''
        this.refresh_token = options.refresh_token
        this.access_token = options.access_token
        this.username = options.username
        this.password = options.password
        this.two_factor_code = options.two_factor_code
        this.code = options.code
        this.redirect_uri = options.redirect_uri
        this.user_agent = isBrowser ? window.navigator.userAgent : options.user_agent
        this.device_id = options.device_id || 'DO_NOT_TRACK_THIS_DEVICE'
        this.grant_type = options.grant_type || grantTypes.INSTALLED_CLIENT
        this.debug = options.debug || false
        this.state = {
            ratelimitRemaining: Infinity,
            ratelimitExpiration: 0,
            tokenExpiration: 0
        }
    }

    async updateAccessToken() {
        if (
            (!this.access_token || Date.now() > this.state.tokenExpiration)
        ) {

            let form: AxiosRequestConfig['form']

            if (this.refresh_token) {
                form = {
                    grant_type: grantTypes.REFRESH_TOKEN,
                    refresh_token: this.refresh_token
                }
            } else if (this.username && this.password) {
                const password = this.two_factor_code ? `${this.password}:${this.two_factor_code}` : this.password
                form = {
                    grant_type: grantTypes.PASSWORD,
                    username: this.username,
                    password
                }
            } else if (this.code && this.redirect_uri) {
                form = {
                    grant_type: grantTypes.AUTHORIZATION_CODE,
                    code: this.code,
                    redirect_uri: this.redirect_uri
                }
            } else if (this.grant_type && this.device_id) { // fallback
                form = {
                    grant_type: this.grant_type,
                    device_id: this.device_id
                }
            }
            const res = await this.credentialedRequest({
                method: 'post',
                url: 'api/v1/access_token',
                form
            })

            return res
        }
        return this.access_token
    }

    async credentialedRequest(config: AxiosRequestConfig) {
        const res = await this.axiosCreate({
            baseURL: 'https://www.reddit.com',
            headers: {
                'user-agent': this.user_agent!
            },
            auth: {
                username: this.client_id!,
                password: this.client_secret!
            }
        }).request(config)
        return res
    }

    axiosCreate(baseConfig: AxiosRequestConfig) {
        const instance = axios.create(baseConfig)

        instance.interceptors.request.use(async config => {
            if (!config.headers) config.headers = {}
            if (config.formData) {
                let requestBody = new FormData()
                Object.keys(config.formData).forEach(key => requestBody.append(key, config.formData![key]))
                if (!isBrowser) {
                    const contentLength: number = await new Promise((resolve, reject) => {
                        requestBody.getLength((err, length) => {
                            if (err) reject(err)
                            resolve(length)
                        })
                    })
                    config.headers['content-length'] = contentLength
                    config.headers['content-type'] = `multipart/form-data; boundary=${requestBody.getBoundary()}`
                }
                config.data = requestBody
            } else if (config.form) {
                let requestBody = new URLSearchParams()
                Object.keys(config.form).forEach(key => requestBody.append(key, config.form![key]))
                config.data = requestBody.toString()
                config.headers['content-type'] = 'application/x-www-form-urlencoded'
            }
            return config
        })
        
        return instance
    }

    /*constructor(auth: bearer_authentication, userAgent: userAgent, bDebug : boolean = false) {
        this.auth = auth;
        this.userAgent = userAgent;
        this.bDebug = bDebug;
        this.xRateLimit = {
            remaining: Infinity,
            used: 0,
            reset: 0
        }
    }*/

    /*private auth: bearer_authentication;
    private userAgent: userAgent;
    private bDebug: boolean;
    private xRateLimit: xRateLimit;

    public async new<Type>(config: AxiosRequestConfig) : Promise<AxiosResponse<Type>> {

        // Await rate limit reset if 0;
        if (this.xRateLimit.remaining < 1) {
            await new Promise( r => setTimeout(r, this.xRateLimit.reset * 1000 ))
        }

        // Setup default values
        config.baseURL = config.baseURL ?? 'https://oauth.reddit.com/';
        config.headers = {
            'User-Agent': this.userAgent.toString(),
            'Authorization': this.auth.toString()
        }


        const result = await axios( config )

        // Maybe add some checking to see if this request didn't exceed limit?

        // Keep xRateLimit up to date
        this.xRateLimit = {
            remaining: Number((result.headers["x-ratelimit-remaining"])),
            used: Number((result.headers["x-ratelimit-used"])),
            reset: Number((result.headers["x-ratelimit-reset"]))
        }

        return result
    }*/

    public get(config: AxiosRequestConfig) { config.method = "GET"; return axios(config) }
    public head(config: AxiosRequestConfig) { config.method = "HEAD"; return axios(config) }
    public post(config: AxiosRequestConfig) { config.method = "POST"; return axios(config) }
    public put(config: AxiosRequestConfig) { config.method = "PUT"; return axios(config) }
    public delete(config: AxiosRequestConfig) { config.method = "DELETE"; return axios(config) }
    public patch(config: AxiosRequestConfig) { config.method = "PATCH"; return axios(config) }
}

export default BaseRequestor
