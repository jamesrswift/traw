import axios, {AxiosRequestConfig } from 'axios'
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

export function axiosCreate(baseConfig: AxiosRequestConfig) {
    const instance = axios.create(baseConfig)

    instance.interceptors.request.use(async config => {
        if (!config.headers) config.headers = {}
        if (config.formData) {
            let requestBody = new FormData()
            Object.keys(config.formData).forEach(key => requestBody.append(key, config.formData![key]))
            if (!isBrowser) {
                const contentLength: number = await new Promise((resolve, reject) => {
                    requestBody.getLength((err : Error | null, length : number) => {
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

export {AxiosRequestConfig} from 'axios'
