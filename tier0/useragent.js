"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userAgent {
    platform;
    appID;
    version;
    username;
    constructor(platform, appID, version, username) {
        this.platform = platform;
        this.appID = appID;
        this.version = version;
        this.username = username;
    }
    toString() {
        return `${this.platform}:${this.appID}:v${this.version} (by /u/${this.username})`;
    }
}
exports.default = userAgent;
