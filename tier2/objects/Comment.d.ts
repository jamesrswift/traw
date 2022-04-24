import traw from "../traw";
import VoteableContent from "../mixins/VoteableContent";
import Listing, { FetchMoreOptions, ListingOptions } from "./Listing";
import { AxiosResponse } from "axios";
export default interface Comment extends VoteableContent<Comment> {
    body_html: string;
    body: string;
    collapsed_reason: any;
    collapsed: boolean;
    controversiality: number;
    depth: number;
    ignore_reports: boolean;
    /** True if comment author is the same as the Submission author */
    is_submitter: boolean;
    link_id: string;
    parent_id: string;
    removed: boolean;
    score_hidden: boolean;
    spam: boolean;
}
/**
 * @Category Reddit Objects
 */
export default class Comment extends VoteableContent<Comment> {
    constructor(options: Partial<Comment>, traw: traw, _hasFetched?: boolean);
    protected transformApiResponse(response: AxiosResponse<any, any>): Comment;
    get uri(): string;
    lock(): Promise<this>;
    unlock(): Promise<this>;
    fetchMore(options: FetchMoreOptions): Promise<Listing<Comment>>;
    fetchAll(options: ListingOptions): Promise<Listing<Comment>>;
}
