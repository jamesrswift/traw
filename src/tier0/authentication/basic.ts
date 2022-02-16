import { AxiosBasicCredentials } from "axios"
import authentication_strategy from "./baseclass"

// basic: username/password authentication
export default class basic_authentication extends authentication_strategy {
    public constructor(
        private username: string,
        private password: string
    ) {
        super()
    }

    public toString() : string {
        // Buffer needs a polyfill to work in browser
        const buf = Buffer.from(`${this.username}:${this.password}`, 'utf-8')
        return `Basic ${buf.toString('base64')}`
    }

    public toAxios(): AxiosBasicCredentials {
        return {
            username: this.username,
            password: this.password
        }
    }
}