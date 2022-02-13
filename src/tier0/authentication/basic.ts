import { AxiosBasicCredentials } from "axios"
import authentication_strategy from "./baseclass"

export default class basic_authentication extends authentication_strategy{
    public constructor(
        private username: string,
        private password: string
    ){
        super()
    }

    public toString() : string {
        const buf1 = Buffer.from( `${this.username}:${this.password}`, 'utf-8')
        return `Basic ${buf1.toString('base64')}`
    }

    public toAxios(): AxiosBasicCredentials{
        return {
            username: this.username,
            password: this.password
        }
    }
}