
export default class userAgent{

    constructor(
        public platform: string,
        public appID: string,
        public version: string,
        public username: string
    ){

    }

    public toString() : string {
        return `${this.platform}:${this.appID}:v${this.version} (by /u/${this.username})`
    }

}