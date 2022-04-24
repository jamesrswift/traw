import { AxiosResponse } from "axios";
import ReplyableContent from "../mixins/ReplyableContent";
import Listing from "./Listing";
import RedditUser from "./RedditUser";
import Subreddit from "./Subreddit";
export default interface PrivateMessage extends ReplyableContent<PrivateMessage> {
    author?: RedditUser;
    author_fullname?: string;
    associated_awarding_id: null;
    body_html: string;
    body: string;
    context: string;
    dest: string;
    distinguished: string | null;
    first_message_name: string | null;
    first_message: number | null;
    likes: any;
    new: boolean;
    num_comments: number;
    parent_id: string;
    replies: Listing<PrivateMessage>;
    score: number;
    subject: string;
    subreddit_name_prefixed: string;
    subreddit: Subreddit;
    type?: string;
    was_comment: boolean;
}
/**
 * @Category Reddit Objects
 */
export default class PrivateMessage extends ReplyableContent<PrivateMessage> {
    get uri(): string;
    protected transformApiResponse(response: AxiosResponse<PrivateMessage, any>): PrivateMessage;
    deleteFromInbox(): Promise<this>;
    markAsRead(): Promise<this>;
    markAsUnread(): Promise<this>;
    muteAuthor(): Promise<this>;
    unmuteAuthor(): Promise<this>;
}
