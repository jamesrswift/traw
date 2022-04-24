import traw from "../traw";
import { AxiosResponse } from "axios";
export default interface RedditContent<Type extends RedditContent<Type>> {
    created_utc: number;
    created: number;
    /** @description A prefixed ID of the RedditContent object */
    id: string;
    name: string;
}
/**
 * @Category Reddit Objects
 */
export default abstract class RedditContent<Type extends RedditContent<Type>> {
    traw: traw;
    protected _hasFetched: boolean;
    protected _fetch?: Type;
    constructor(options: Partial<Type>, traw: traw, _hasFetched?: boolean);
    fetch(): Promise<Type>;
    refresh(): Promise<Type>;
    /** @deprecated */ toJSON(): void;
    /**
     * @internal
     */
    protected transformApiResponse(response: AxiosResponse<Type, any>): Type;
    /**
     * @internal
     */
    clone(deep?: boolean): Type;
    /**
     * @internal
     * @description The URI from which the object can be updated.
     */
    get uri(): string;
    /** @internal */ get(options: any): Promise<AxiosResponse<any, any>>;
    /** @internal */ head(options: any): Promise<AxiosResponse<any, any>>;
    /** @internal */ patch(options: any): Promise<AxiosResponse<any, any>>;
    /** @internal */ post(options: any): Promise<AxiosResponse<any, any>>;
    /** @internal */ put(options: any): Promise<AxiosResponse<any, any>>;
}
