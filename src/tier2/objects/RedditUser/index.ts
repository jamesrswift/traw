import RedditContent from "../../mixins/RedditContent";
import Listing from "../Listing";
import Subreddit from "../Subreddit";

export default interface RedditUser extends RedditContent<RedditUser>{
    comment_karma: number;
    has_mod_mail: boolean;
    has_subscribed: boolean;
    has_verified_mail: boolean;
    hide_from_robots: boolean;
    icon_img: string;
    is_employee: boolean;
    is_friend: boolean;
    is_gold: boolean;
    is_mod: boolean;
    link_karma: number;
    modhash?: string | null;
    pref_show_snoovatar: boolean;
    subreddit: Subreddit | null;
    verified: boolean;
}

export default class RedditUser extends RedditContent<RedditUser>{
    /*public async assignFlair(options: any): Promise<this>;
    public async friend(options: any): Promise<this>;
    public async getComments(options?: any): Promise<Listing<Comment>>;
    public async getDownvotedContent(options?: any): Promise<Listing<Comment | Submission>>;
    public async getFriendInformation(): Promise<any>;
    public async getGildedContent(options?: any): Promise<Listing<Comment | Submission>>;
    public async getHiddenContent(options?: any): Promise<Listing<Comment | Submission>>;
    public async getMultireddit(name: string): MultiReddit;
    public async getMultireddits(): Promise<MultiReddit[]>;
    public async getOverview(options?: any): Promise<Listing<Comment | Submission>>;
    public async getSavedContent(options?: any): Promise<Listing<Comment | Submission>>;
    public async getSubmissions(options?: any): Promise<Listing<Submission>>;
    public async getTrophies(): Promise<any>;
    public async getUpvotedContent(options?: any): Promise<Listing<Comment | Submission>>;
    public async giveGold(months: string): Promise<any>;
    public async unfriend(): Promise<any>;*/
}