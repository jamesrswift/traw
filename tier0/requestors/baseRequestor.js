"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
/**
 * @Category Requestor
 */
class baseRequestor {
    userAgent;
    state = {
        ratelimitRemaining: Infinity,
        ratelimitReset: 0,
        ratelimitExpiration: Infinity,
        tokenExpiration: Infinity
    };
    constructor(agent) {
        this.userAgent = agent;
    }
    async request(config) {
        throw new exceptions_1.NotImplemented();
    }
    async awaitRateLimit() {
        if (this.state.ratelimitRemaining < 1) {
            await new Promise(r => setTimeout(r, this.state.ratelimitReset * 1000));
        }
    }
    handleRateLimitResponse(respone) {
        if (respone.headers['x-ratelimit-remaining']) {
            this.state.ratelimitRemaining = Number(respone.headers['x-ratelimit-remaining']);
            this.state.ratelimitReset = Number(respone.headers['x-ratelimit-reset']);
            this.state.ratelimitExpiration = Date.now() + (this.state.ratelimitReset * 1000);
        }
    }
    get(config) { config.method = "GET"; return this.request(config); }
    head(config) { config.method = "HEAD"; return this.request(config); }
    post(config) { config.method = "POST"; return this.request(config); }
    put(config) { config.method = "PUT"; return this.request(config); }
    delete(config) { config.method = "DELETE"; return this.request(config); }
    patch(config) { config.method = "PATCH"; return this.request(config); }
}
exports.default = baseRequestor;
