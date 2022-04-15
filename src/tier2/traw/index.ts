import baseRequestor from "../../tier0/requestors/baseRequestor";
import RedditUser from "../objects/RedditUser";
import Subreddit, { Sort } from "../objects/Subreddit";
import Comment from "../objects/Comment";
import PrivateMessage from "../objects/PrivateMessage";
import { addFullnamePrefix } from "./helpers";
import RedditOwnUser from "../objects/RedditUser/RedditOwnUser";
import { api_type, MAX_LISTING_ITEMS } from "../../tier0/constants";
import Listing from "../objects/Listing";
import { NotImplemented } from "../../tier0/exceptions";

export default interface traw {
    _ownUserInfo?: RedditOwnUser;
}

export default class traw{

    constructor( protected requestor : baseRequestor ){
        
    }

    public get( options: any ){ return this.requestor.get(options) }
    public delete( options: any ){ return this.requestor.delete(options) }
    public head( options: any ){ return this.requestor.head(options) }
    public patch( options: any ){ return this.requestor.patch(options) }
    public post( options: any ){ return this.requestor.post(options) }
    public put( options: any ){ return this.requestor.put(options) }

    /*public async checkCaptchaRequirement(): Promise<boolean>{
        
        // @ts-ignore
        return this.get({url: 'api/needs_captcha'});
    }*/

    /*public async checkUsernameAvailability(name: string): Promise<boolean> {
        // The oauth endpoint listed in reddit's documentation doesn't actually work, so just send an unauthenticated request.
        // @ts-ignore
        return this.get({
            baseURL: "https://www.reddit.com/",
            url: 'api/username_available.json', 
            params: {user: name}
        });
      }*/
    
    /*public async composeMessage(options: Snoowrap.ComposeMessageParams): Promise<any>;
    public async config(opts?: Snoowrap.ConfigOptions): Snoowrap.ConfigOptions;
    public async createLivethread(options: LiveThreadSettings): Promise<_LiveThread>;
    public async createMultireddit(options: MultiRedditProperties & { name: string; subreddits: _Subreddit[] | string[]}): Promise<_MultiReddit>;
    public async createSubreddit(options: SubredditSettings): Promise<_Subreddit>;
    public async credentialedClientRequest(options?: RequestOptions): Promise<any>;
    public async getBlockedUsers(): Promise<_RedditUser[]>;
    public async getCaptchaImage(identifier: string): Promise<string>;
    public async getComment(commentId: string): _Comment;
    public async getContributorSubreddits(options?: ListingOptions): Promise<_Listing<_Subreddit>>;
    public async getControversial(subredditName?: string, options?: SortedListingOptions): Promise<_Listing<_Submission>>;
    public async getDefaultSubreddits(options?: ListingOptions): Promise<_Listing<_Subreddit>>;
    public async getFriends(): Promise<_RedditUser[]>;
    public async getGoldSubreddits(options?: ListingOptions): Promise<_Listing<_Subreddit>>;
    public async getHot(subredditName?: string, options?: ListingOptions): Promise<_Listing<_Submission>>;
    public async getBest(options?: ListingOptions): Promise<_Listing<_Submission>>;
    public async getInbox(options?: { filter?: string }): Promise<_Listing<_PrivateMessage | _Comment>>;
    public async getKarma(): Promise<Array<{ sr: _Subreddit; comment_karma: number; link_karma: number; }>>;
    public async getLivethread(threadId: string): _LiveThread;
    public async getMe(): _RedditUser;
    public async getMessage(messageId: string): _PrivateMessage;
    public async getModeratedSubreddits(options?: ListingOptions): Promise<_Listing<_Subreddit>>;
    public async getModmail(options?: ListingOptions): Promise<_Listing<_PrivateMessage>>;
    public async getMyMultireddits(): Promise<_MultiReddit[]>;
    public async getMyTrophies(): Promise<Snoowrap.Trophy[]>;
    public async getNew(subredditName?: string, options?: ListingOptions): Promise<_Listing<_Submission>>;
    public async getNewCaptchaIdentifier(): Promise<string>;
    public async getNewComments(subredditName?: string, options?: ListingOptions): Promise<_Listing<_Comment>>;
    public async getContentByIds(ids: Array<_Submission | _Comment | string>) : Promise<_Listing<_Submission | _Comment>>;
    public async getNewModmailConversations(options?: ListingOptions & { entity?: string }): Promise<_Listing<_ModmailConversation>>;
    public async createModmailDiscussion(options: { body: string, subject: string, srName: string }): Promise<_ModmailConversation>;
    public async getNewModmailConversation(id: string): Promise<_ModmailConversation>;
    public async markNewModmailConversationsAsRead(convs: _ModmailConversation[]): Promise<void>;
    public async markNewModmailConversationsAsUnread(convs: _ModmailConversation[]): Promise<void>;
    public async getNewModmailSubreddits(): Promise<_Subreddit[]>;
    public async getUnreadNewModmailConversationsCount(): Promise<{ highlighted: number, notifications: number, archived: number, appeals: number, new: number, inprogress: number, mod: number }>;
    public async bulkReadNewModmail(subs: Array<_Subreddit | string>, state: 'new'|'inprogress'|'mod'|'notifications'|'archived'|'appeals'|'highlighted'|'all'): Promise<_Listing<_ModmailConversation>>;
    public async getNewSubreddits(options?: ListingOptions): Promise<_Listing<_Subreddit>>;
    public async getOauthScopeList(): Promise<{ [key: string]: { description: string; id: string; name: string } }>;
    public async getPopularSubreddits(options?: ListingOptions): Promise<_Listing<_Subreddit>>;
    public async getPreferences(): Promise<any>;
    public async getRandomSubmission(subredditName?: string): Promise<_Submission>;
    public async getRising(subredditName?: string, options?: ListingOptions): Promise<_Listing<_Submission>>;
    public async getSavedCategories(): Promise<any[]>;
    public async getSentMessages(options?: ListingOptions): Promise<_Listing<_PrivateMessage>>;
    public async getStickiedLivethread(): Promise<_LiveThread | undefined>;
    public async getSubmission(submissionId: string): _Submission;
    public async getSubreddit(displayName: string): _Subreddit;
    public async getSubscriptions(options?: ListingOptions): _Listing<_Subreddit>;
    public async getTop(subredditName?: string, options?: SortedListingOptions): Promise<_Listing<_Submission>>;
    public async getUnreadMessages(options?: ListingOptions): Promise<_Listing<_PrivateMessage>>;
    public async getUser(name: string): _RedditUser;
    public async markAsVisited(links: _Submission[]): Promise<void>;
    public async markMessagesAsRead(messages: _PrivateMessage[] | string[]): Promise<void>;
    public async markMessagesAsUnread(messages: _PrivateMessage[] | string[]): Promise<void>;
    public async oauthRequest(options: RequestOptions): Promise<any>;
    public async rawRequest(options: RequestOptions): Promise<any>;
    public async readAllMessages(): Promise<void>;
    public async revokeRefreshToken(): Promise<void>;
    public async search(options: Snoowrap.SearchOptions): Promise<_Listing<_Submission>>;
    public async searchSubredditNames(options: { query: string; exact?: boolean; includeNsfw?: boolean; }): Promise<string[]>;
    public async searchSubreddits(options: ListingOptions & { query: string }): Promise<_Listing<_Subreddit>>;
    public async searchSubredditTopics(options: { query: string; }): Promise<_Subreddit[]>;
    public async submitLink(options: Snoowrap.SubmitLinkOptions): Promise<_Submission>;
    public async submitSelfpost(options: Snoowrap.SubmitSelfPostOptions): Promise<_Submission>;
    public async unauthenticatedRequest(options: RequestOptions): Promise<any>; // options: https://www.npmjs.com/package/request
    public async updateAccessToken(): Promise<string>;
    public async updatePreferences(updatedPreferences: any): Promise<void>;
*/

    public async getListing<Type>( {uri, qs = {}, ...options} : any ) : Promise<Listing<Type>>{
        const mergedQuery = {count: 9999, ...qs};

        if ( qs.limit /*|| !IsEmpty(options)*/ ){
            return new Listing<Type>(
                {_query: mergedQuery, _uri: uri, ...options},
                this
            ).fetchMore(qs.limit ?? MAX_LISTING_ITEMS)
        } else {
            return this.get( {url: uri, params: mergedQuery}).then( listing => {
                throw new NotImplemented();
                /*return listing*/
            })
        }
    }
  

}

export interface SubmitLinkOptions {
    subredditName: string;
    title: string;
    url: string;
    sendReplies?: boolean;
    resubmit?: boolean;
    captchaIden?: string;
    captchaResponse?: string;
    nsfw?: boolean;
    spoiler?: boolean;
    flairId?: string;
    flairText?: string;
}

export interface SubmitSelfPostOptions {
    text?: string;
    subredditName: string;
    title: string;
    sendReplies?: boolean;
    captchaIden?: string;
    captchaResponse?: string;
    nsfw?: boolean;
    spoiler?: boolean;
    flairId?: string;
    flairText?: string;
}