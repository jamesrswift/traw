import { AxiosResponse } from "axios";
import RedditContent from "../mixins/RedditContent";
import Listing, { ListingOptions } from "./Listing";
import RedditUser from "./RedditUser";
import Submission from "./Submission";
import Subreddit from "./Subreddit";
export default interface WikiPage extends RedditContent<WikiPage> {
    content_html: string;
    content_md: string;
    may_revise: boolean;
    revision_by: RedditUser;
    revision_date: number;
    revision_id: string;
    reason: string;
    subreddit: Subreddit;
    title: string;
}
/**
 * @Category Reddit Objects
 */
export default class WikiPage extends RedditContent<WikiPage> {
    get uri(): string;
    protected transformApiResponse(response: AxiosResponse<WikiPage, any>): WikiPage;
    private _modifyEditor;
    addEditor(name: string): Promise<this>;
    edit(options: EditOptions): Promise<this>;
    editSettings(options: Settings): Promise<this>;
    getDiscussions(options?: ListingOptions): Promise<Listing<Submission>>;
    getRevisions(options?: ListingOptions): Promise<Listing<WikiPageRevision>>;
    getSettings(): Promise<Settings>;
    hideRevision(id: string): Promise<this>;
    removeEditor(name: string): Promise<this>;
    revert(id: string): Promise<this>;
}
export interface Settings {
    listed: boolean;
    permissionLevel: 0 | 1 | 2;
}
export interface EditOptions {
    text: string;
    reason?: string;
    previousRevision?: string;
}
export interface WikiPageRevision {
    timestamp: number;
    reason: string;
    page: string;
    id: string;
    author: RedditUser;
}
