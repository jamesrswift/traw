"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bearer_1 = __importDefault(require("../authentication/bearer"));
const baseRequestor_1 = __importDefault(require("./baseRequestor"));
const http_1 = require("../http");
const exceptions_1 = require("../exceptions");
/**
 * @Category Requestor
 */
class tokenRequestor extends baseRequestor_1.default {
    credentialedRequestor;
    token;
    scope;
    refresh_token;
    constructor(agent, credentialedRequestor, token) {
        super(agent);
        this.credentialedRequestor = credentialedRequestor;
        this.token = token;
    }
    async request(config) {
        // Await rate limit reset if 0
        await this.awaitRateLimit();
        // Validate token
        this.token = await this.updateAccessToken();
        const instance = await (0, http_1.axiosCreate)({
            baseURL: 'https://oauth.reddit.com',
            headers: {
                authorization: this.token.toString(),
                'user-agent': this.userAgent.toString()
            },
            params: {
                raw_json: 1
            }
        });
        let res;
        try {
            res = await instance.request(config);
            this.handleRateLimitResponse(res);
            return res;
        }
        catch (e) {
            console.log(e);
            throw new exceptions_1.NotImplemented();
        }
    }
    async validateAccessToken() {
        if (!this.token || Date.now() > this.state.tokenExpiration) {
            return this.updateAccessToken();
        }
        return this.token;
    }
    createUpdateAccessTokenForm() {
        if (this.refresh_token) {
            return {
                grant_type: "refresh_token" /* REFRESH_TOKEN */,
                refresh_token: this.refresh_token
            };
        }
    }
    async updateAccessToken() {
        const form = this.createUpdateAccessTokenForm();
        // if (!this.state.initialGrantType) this.state.initialGrantType = form.grant_type
        const res = await this.credentialedRequestor.post({ url: 'api/v1/access_token', form });
        const parsedResponse = res.data;
        if (parsedResponse.error) {
            throw new exceptions_1.updateAccessTokenError(parsedResponse);
        }
        this.token = new bearer_1.default(parsedResponse.access_token);
        this.refresh_token = parsedResponse.refresh_token;
        this.state.tokenExpiration = Date.now() + (parsedResponse.expires_in * 1000);
        this.scope = parsedResponse.scope.split(' ');
        return this.token;
    }
}
exports.default = tokenRequestor;
