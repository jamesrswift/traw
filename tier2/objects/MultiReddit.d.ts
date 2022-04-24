import RedditContent from "../mixins/RedditContent";
import traw from "../traw";
import RedditUser from "./RedditUser";
import Subreddit from "./Subreddit";
export default interface MultiReddit extends RedditContent<MultiReddit> {
    can_edit: boolean;
    copied_from: string | null;
    curator: RedditUser;
    description_html: string;
    description_md: string;
    display_name: string;
    icon_name: MultiRedditIcon;
    icon_url: string | null;
    key_color: string;
    path: string;
    subreddits: Subreddit[];
    visibility: MultiRedditVisibility;
    weighting_schema: MultiRedditWeightingSchema;
}
/**
 * @Category Reddit Objects
 */
export default class MultiReddit extends RedditContent<MultiReddit> {
    protected _hasFetched: boolean;
    constructor(options: Partial<MultiReddit>, traw: traw, _hasFetched: boolean);
    get _uri(): string;
    get _path(): string;
    addSubreddit(sub: Subreddit | string): Promise<this>;
    copy(newName: string): Promise<MultiReddit>;
    delete(): Promise<this>;
    edit(options: MultiRedditProperties): Promise<this>;
    removeSubreddit(sub: Subreddit | string): Promise<this>;
    rename(newName: string): Promise<this>;
}
export interface MultiRedditProperties {
    name?: string;
    description?: string;
    visibility?: MultiRedditVisibility;
    icon_name?: MultiRedditIcon;
    key_color?: string;
    weighting_scheme?: MultiRedditWeightingSchema;
}
export declare type MultiRedditWeightingSchema = "classic" | "fresh";
export declare type MultiRedditVisibility = "private" | "public" | "hidden";
export declare type MultiRedditIcon = "art and design" | "ask" | "books" | "business" | "cars" | "comics" | "cute animals" | "diy" | "entertainment" | "food and drink" | "funny" | "games" | "grooming" | "health" | "life advice" | "military" | "models pinup" | "music" | "news" | "philosophy" | "pictures and gifs" | "science" | "shopping" | "sports" | "style" | "tech" | "travel" | "unusual stories" | "video";
