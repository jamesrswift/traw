"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosCreate = void 0;
const axios_1 = __importDefault(require("axios"));
const URLSearchParams_1 = __importDefault(require("./utils/URLSearchParams"));
const FormData_1 = __importDefault(require("./utils/FormData"));
const isBrowser_1 = __importDefault(require("./utils/isBrowser"));
function axiosCreate(baseConfig) {
    const instance = axios_1.default.create(baseConfig);
    instance.interceptors.request.use(async (config) => {
        if (!config.headers)
            config.headers = {};
        if (config.formData) {
            let requestBody = new FormData_1.default();
            Object.keys(config.formData).forEach(key => requestBody.append(key, config.formData[key]));
            if (!isBrowser_1.default) {
                const contentLength = await new Promise((resolve, reject) => {
                    requestBody.getLength((err, length) => {
                        if (err)
                            reject(err);
                        resolve(length);
                    });
                });
                config.headers['content-length'] = contentLength;
                config.headers['content-type'] = `multipart/form-data; boundary=${requestBody.getBoundary()}`;
            }
            config.data = requestBody;
        }
        else if (config.form) {
            let requestBody = new URLSearchParams_1.default();
            Object.keys(config.form).forEach(key => requestBody.append(key, config.form[key]));
            config.data = requestBody.toString();
            config.headers['content-type'] = 'application/x-www-form-urlencoded';
        }
        return config;
    });
    return instance;
}
exports.axiosCreate = axiosCreate;
