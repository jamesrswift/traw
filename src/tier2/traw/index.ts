import baseRequestor from "../../tier0/requestors/baseRequestor";
import RedditUser from "../objects/RedditUser";
import Subreddit, { Sort, SubredditSettings } from "../objects/Subreddit";
import Comment from "../objects/Comment";
import PrivateMessage from "../objects/PrivateMessage";
import { addFullnamePrefix } from "./helpers";
import { api_type, MAX_LISTING_ITEMS } from "../../tier0/constants";
import Listing, { ListingOptions, SortedListingOptions } from "../objects/Listing";
import { NotImplemented } from "../../tier0/exceptions";
import Submission from "../objects/Submission";
import LiveThread, { LiveThreadSettings } from "../objects/LiveThread";
import ModmailConversation from "../objects/ModmailConversation";
import MultiReddit, { MultiRedditProperties } from "../objects/MultiReddit";

export default interface traw {
    _ownUserInfo?: RedditUser;
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
        throw new NotImplemented()
    }

    public async checkUsernameAvailability(name: string): Promise<boolean> {
        throw new NotImplemented()
    }*/
    
    public async composeMessage(options: ComposeMessageParams): Promise<any>{
        throw new NotImplemented()
    }

    /*public async config(opts?: ConfigOptions): ConfigOptions{
        throw new NotImplemented()
    }*/
    
    public async createLivethread(options: LiveThreadSettings): Promise<LiveThread>{
        throw new NotImplemented()
    }
    
    public async createMultireddit(options: MultiRedditProperties & { name: string; subreddits: Subreddit[] | string[]}): Promise<MultiReddit>{
        throw new NotImplemented()
    }
    
    public async createSubreddit(options: SubredditSettings): Promise<Subreddit>{
        throw new NotImplemented()
    }
    
    /*public async credentialedClientRequest(options?: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }*/
    
    public async getBlockedUsers(): Promise<RedditUser[]>{
        throw new NotImplemented()
    }
    
    public async getCaptchaImage(identifier: string): Promise<string>{
        throw new NotImplemented()
    }
    
    public async getComment(commentId: string): Promise<Comment>{
        throw new NotImplemented()
    }
    
    public async getContributorSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>{
        throw new NotImplemented()
    }
    
    public async getControversial(subredditName?: string, options?: SortedListingOptions): Promise<Listing<Submission>>{
        throw new NotImplemented()
    }
    
    public async getDefaultSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>{
        throw new NotImplemented()
    }
    
    public async getFriends(): Promise<RedditUser[]>{
        throw new NotImplemented()
    }
    
    public async getGoldSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>{
        throw new NotImplemented()
    }
    
    public async getHot(subredditName?: string, options?: ListingOptions): Promise<Listing<Submission>>{
        throw new NotImplemented()
    }
    
    public async getBest(options?: ListingOptions): Promise<Listing<Submission>>{
        throw new NotImplemented()
    }
    
    public async getInbox(options?: { filter?: string }): Promise<Listing<PrivateMessage | Comment>>{
        throw new NotImplemented()
    }
    
    public async getKarma(): Promise<Array<{ sr: Subreddit; comment_karma: number; link_karma: number; }>>{
        throw new NotImplemented()
    }
    
    public async getLivethread(threadId: string): Promise<LiveThread>{
        throw new NotImplemented()
    }
    
    public async getMe(): Promise<RedditUser>{
        const result = await this.get({url: 'api/v1/me'});
        this._ownUserInfo = new RedditUser( result.data, this, true);
        return this._ownUserInfo;
    }
    
    public async getMessage(messageId: string): Promise<PrivateMessage>{
        throw new NotImplemented()
    }
    
    public async getModeratedSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>{
        throw new NotImplemented()
    }
    
    public async getModmail(options?: ListingOptions): Promise<Listing<PrivateMessage>>{
        throw new NotImplemented()
    }
    
    public async getMyMultireddits(): Promise<MultiReddit[]>{
        throw new NotImplemented()
    }
    
    public async getMyTrophies(): Promise<Trophy[]>{
        throw new NotImplemented()
    }
    
    public async getNew(subredditName?: string, options?: ListingOptions): Promise<Listing<Submission>>{
        throw new NotImplemented()
    }
    
    public async getNewCaptchaIdentifier(): Promise<string>{
        throw new NotImplemented()
    }
    
    public async getNewComments(subredditName?: string, options?: ListingOptions): Promise<Listing<Comment>>{
        throw new NotImplemented()
    }
    
    public async getContentByIds(ids: Array<Submission | Comment | string>) : Promise<Listing<Submission | Comment>>{
        throw new NotImplemented()
    }
    
    public async getNewModmailConversations(options?: ListingOptions & { entity?: string }): Promise<Listing<ModmailConversation>>{
        throw new NotImplemented()
    }
    
    public async createModmailDiscussion(options: { body: string, subject: string, srName: string }): Promise<ModmailConversation>{
        throw new NotImplemented()
    }
    
    public async getNewModmailConversation(id: string): Promise<ModmailConversation>{
        throw new NotImplemented()
    }
    
    public async markNewModmailConversationsAsRead(convs: ModmailConversation[]): Promise<void>{
        throw new NotImplemented()
    }
    
    public async markNewModmailConversationsAsUnread(convs: ModmailConversation[]): Promise<void>{
        throw new NotImplemented()
    }
    
    public async getNewModmailSubreddits(): Promise<Subreddit[]>{
        throw new NotImplemented()
    }
    
    public async getUnreadNewModmailConversationsCount(): Promise<{ highlighted: number, notifications: number, archived: number, appeals: number, new: number, inprogress: number, mod: number }>{
        throw new NotImplemented()
    }
    
    public async bulkReadNewModmail(subs: Array<Subreddit | string>, state: 'new'|'inprogress'|'mod'|'notifications'|'archived'|'appeals'|'highlighted'|'all'): Promise<Listing<ModmailConversation>>{
        throw new NotImplemented()
    }
    
    public async getNewSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>{
        throw new NotImplemented()
    }
    
    public async getOauthScopeList(): Promise<{ [key: string]: { description: string; id: string; name: string } }>{
        throw new NotImplemented()
    }
    
    public async getPopularSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>{
        throw new NotImplemented()
    }
    
    public async getPreferences(): Promise<any>{
        throw new NotImplemented()
    }
    
    public async getRandomSubmission(subredditName?: string): Promise<Submission>{
        throw new NotImplemented()
    }
    
    public async getRising(subredditName?: string, options?: ListingOptions): Promise<Listing<Submission>>{
        throw new NotImplemented()
    }
    
    public async getSavedCategories(): Promise<any[]>{
        throw new NotImplemented()
    }
    
    public async getSentMessages(options?: ListingOptions): Promise<Listing<PrivateMessage>>{
        throw new NotImplemented()
    }
    
    public async getStickiedLivethread(): Promise<LiveThread | undefined>{
        throw new NotImplemented()
    }
    
    public async getSubmission(submissionId: string): Promise<Submission>{
        throw new NotImplemented()
    }
    
    public async getSubreddit(displayName: string): Promise<Subreddit>{
        throw new NotImplemented()
    }
    
    public async getSubscriptions(options?: ListingOptions): Promise<Listing<Subreddit>>{
        throw new NotImplemented()
    }
    
    public async getTop(subredditName?: string, options?: SortedListingOptions): Promise<Listing<Submission>>{
        throw new NotImplemented()
    }
    
    public async getUnreadMessages(options?: ListingOptions): Promise<Listing<PrivateMessage>>{
        throw new NotImplemented()
    }
    
    public async getUser(name: string): Promise<RedditUser>{
        throw new NotImplemented()
    }
    
    public async markAsVisited(links: Submission[]): Promise<void>{
        throw new NotImplemented()
    }
    
    public async markMessagesAsRead(messages: PrivateMessage[] | string[]): Promise<void>{
        throw new NotImplemented()
    }
    
    public async markMessagesAsUnread(messages: PrivateMessage[] | string[]): Promise<void>{
        throw new NotImplemented()
    }
    
    /*public async oauthRequest(options: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }
    
    public async rawRequest(options: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }*/
    
    public async readAllMessages(): Promise<void>{
        throw new NotImplemented()
    }
    
    /*public async revokeRefreshToken(): Promise<void>{
        throw new NotImplemented()
    }*/
    
    public async search(options: SearchOptions): Promise<Listing<Submission>>{
        throw new NotImplemented()
    }
    
    public async searchSubredditNames(options: { query: string; exact?: boolean; includeNsfw?: boolean; }): Promise<string[]>{
        throw new NotImplemented()
    }
    
    public async searchSubreddits(options: ListingOptions & { query: string }): Promise<Listing<Subreddit>>{
        throw new NotImplemented()
    }
    
    public async searchSubredditTopics(options: { query: string; }): Promise<Subreddit[]>{
        throw new NotImplemented()
    }
    
    public async submitCrosspost ({originalPost, subredditName,title,url, ...options}
        : {originalPost: Submission | string, subredditName: string, title: string, url: string}) {
        return this.#submit({
          ...options,
          subredditName,
          title,
          url,
          kind: 'crosspost',
          crosspost_fullname: originalPost instanceof Submission
            ? originalPost.name
            : addFullnamePrefix(originalPost, 't3_')
        });
    }

    public async submitLink(options: SubmitLinkOptions): Promise<Submission>{
        throw new NotImplemented()
    }
    
    public async submitSelfpost(options: SubmitSelfPostOptions): Promise<Submission>{
        throw new NotImplemented()
    }

    /*public async unauthenticatedRequest(options: RequestOptions): Promise<any>{// options: https://www.npmjs.com/package/request
        throw new NotImplemented()
    }*/
     
    /*public async updateAccessToken(): Promise<string>{
        throw new NotImplemented()
    }*/
    
    public async updatePreferences(updatedPreferences: any): Promise<void>{
        throw new NotImplemented()
    }

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

    public async assignFlair ({css_class, link, name, text, subreddit_name} : {
        css_class: string, link: string, name?: string, text: string, subreddit_name: string
    }) {
        return this.post({url: `r/${subreddit_name}/api/flair`, form: {api_type, name, text, link, css_class}});
    }

    public async selectFlair ({flair_template_id, link, name, text, subredditName} :
        {flair_template_id: string, link: string, name?: string, text?: string, subredditName: string}) {
        return this.post({url: `r/${subredditName}/api/selectflair`, form: {api_type, flair_template_id, link, name, text}});
    }

    async #submit (options: SubmitOptions){
        throw new NotImplemented()
    }

    public async getMyName () {
        return this._ownUserInfo ? this._ownUserInfo.name : (await this.getMe()).name;
    }

}

export interface SubmitOptions{
    subredditName: string;
    kind: string;
    title: string;
    url: string;
    videoPosterUrl?: string;
    websocketUrl?: string;
    gallery?: string;
    rtjson?: string;
    choices?: string; // no idea
    duration?: string; // no idea
    crosspost_fullname?: string;
    sendReplies?: boolean;
    resubmit?: boolean;
    captchaIden?: string;
    captchaResponse?: string;
    nsfw?: boolean;
    spoiler?: boolean;
    flairId?: string;
    flairText?: string;
    text?: string;
    collectionId?: string;
    discussionType?: string
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

export interface ComposeMessageParams {
    to: RedditUser | Subreddit | string;
    subject: string;
    text: string;
    fromSubreddit?: Subreddit | string;
    captchaIden?: string;
    captchaResponse?: string;
}

  export interface BaseSearchOptions {
    query: string;
    time?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
    sort?: 'relevance' | 'hot' | 'top' | 'new' | 'comments';
    syntax?: 'cloudsearch' | 'lucene' | 'plain';
  }

  export interface SearchOptions extends BaseSearchOptions {
    subreddit?: Subreddit | string;
    restrictSr?: boolean;
    after?: string;
    before?: string;
    category?: string;
    count?: number;
    include_facets?: boolean;
    limit?: number
    show?: 'all',
    sr_detail?: string
    type?: string
  }

  export interface Trophy {
    icon_70: string;
    icon_40: string;
    name: string;
    url: string;
    award_id: string;
    id: string;
    description: string;
}