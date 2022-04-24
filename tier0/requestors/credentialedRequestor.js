"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../http");
const baseRequestor_1 = __importDefault(require("./baseRequestor"));
/**
 * @Category Requestor
 */
class credentialedRequestor extends baseRequestor_1.default {
    auth;
    constructor(agent, auth) {
        super(agent);
        this.auth = auth;
    }
    async request(config) {
        // Await rate limit reset if 0
        await this.awaitRateLimit();
        const res = await (0, http_1.axiosCreate)({
            baseURL: 'https://www.reddit.com',
            headers: {
                'user-agent': this.userAgent.toString()
            },
            auth: this.auth.toAxios()
        }).request(config);
        this.handleRateLimitResponse(res);
        return res;
    }
}
exports.default = credentialedRequestor;
