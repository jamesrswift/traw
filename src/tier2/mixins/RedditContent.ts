import traw from "..";

export default abstract class RedditContent<Type> {
    public created_utc?: number;
    public created?: number;
    public id?: string;
    public name?: string;

    constructor( options: Partial<RedditContent<Type>>, protected traw: traw, protected _hasFetched: boolean ){

    }

    fetch(){

    }

    refresh() {

    }

    toJSON() {

    }
    
}