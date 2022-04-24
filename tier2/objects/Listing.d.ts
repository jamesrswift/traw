import ReplyableContent from "../mixins/ReplyableContent";
import traw from "../traw";
export interface ListingOptions {
    limit?: number;
    after?: string;
    before?: string;
    show?: string;
    count?: number;
}
export interface SortedListingOptions extends ListingOptions {
    time?: "all" | "hour" | "day" | "week" | "month" | "year";
}
export interface FetchMoreOptions {
    amount: number;
    skipReplies?: boolean;
    append?: boolean;
}
export default interface Listing<Type> extends Array<Type> {
    traw: traw;
    _query: ListingOptions;
    _transform: (arg0: any) => any;
    _method: string;
    _isCommentList: boolean;
    _link_id?: string;
    _uri?: string;
    _more: any;
    _cachedLookahead?: any;
}
/**
 * @Category Reddit Objects
 */
export default class Listing<Type> extends Array<Type> {
    #private;
    constructor(options: any, traw: traw);
    get isFinished(): boolean;
    fetchMore(options: FetchMoreOptions): Listing<Type>;
    fetchAll(options?: FetchMoreOptions): Listing<Type>;
    empty(): this;
    _clone({ deep }?: {
        deep?: boolean | undefined;
    }): Listing<unknown>;
}
export declare function getEmptyRepliesListing<ArgType extends ReplyableContent<Type>, Type extends ReplyableContent<Type>>(item: ArgType): void;
export declare function addEmptyRepliesListing<Type extends ReplyableContent<Type>>(item: Type): Type;
export declare function buildRepliesTree(childList: any): void;
