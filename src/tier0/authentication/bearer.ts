import authentication_strategy from "./baseclass";

export default class bearer_authentication extends authentication_strategy{
    constructor(
        private bearer: string
    ){
        super()
    }

    public toString(): string{
        return `Bearer: ${this.bearer}`
    }
}