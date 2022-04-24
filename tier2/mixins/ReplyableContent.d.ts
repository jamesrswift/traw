import { Sort } from "../objects/Subreddit";
import RedditContent from "./RedditContent";
export default interface ReplyableContent<Type extends ReplyableContent<Type>> extends RedditContent<Type> {
    _sort: Sort;
    replies: Listing<Comment | PrivateMessage>;
}
/**
 * @Category Reddit Objects
 */
export default class ReplyableContent<Type extends ReplyableContent<Type>> extends RedditContent<Type> {
    approve(): Promise<this>;
    blockAuthor(): Promise<this>;
    ignoreReports(): Promise<this>;
    remove(spam?: boolean): Promise<this>;
    reply<ReplyType extends ReplyableContent<ReplyType>>(text: string): Promise<ReplyType>;
    report(reason?: string, other_reason?: string): Promise<this>;
    unignoreReports(): Promise<this>;
}
import { Listing } from "../objects";
import PrivateMessage from "../objects/PrivateMessage";
