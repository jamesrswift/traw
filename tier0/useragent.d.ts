export default class userAgent {
    platform: string;
    appID: string;
    version: string;
    username: string;
    constructor(platform: string, appID: string, version: string, username: string);
    toString(): string;
}
