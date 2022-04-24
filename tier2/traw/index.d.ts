import baseRequestor from "../../tier0/requestors/baseRequestor";
import RedditUser from "../objects/RedditUser";
import Subreddit, { Sort, SubredditSettings } from "../objects/Subreddit";
import Comment from "../objects/Comment";
import PrivateMessage from "../objects/PrivateMessage";
import Listing, { ListingOptions, SortedListingOptions } from "../objects/Listing";
import Submission from "../objects/Submission";
import LiveThread, { LiveThreadSettings } from "../objects/LiveThread";
import ModmailConversation from "../objects/ModmailConversation";
import MultiReddit, { MultiRedditProperties } from "../objects/MultiReddit";
import { Modnote, ModnoteResponse, NoteLabel, NoteType } from "../objects";
export default interface traw {
    _ownUserInfo?: RedditUser;
}
export default class traw {
    #private;
    protected requestor: baseRequestor;
    constructor(requestor: baseRequestor);
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    get(options: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    delete(options: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    head(options: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    patch(options: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    post(options: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    put(options: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * @summary Composes a new private message
     * @example ```typescript
     * instance.composeMessage({
     *   to: 'actually_an_aardvark',
     *   subject: "Hi, how's it going?",
     *   text: 'Long time no see'
     * })
     * // (message created on reddit)
     * ```
     */
    composeMessage(options: ComposeMessageParams): Promise<this>;
    createLivethread(options: LiveThreadSettings): Promise<LiveThread>;
    createMultireddit(options: MultiRedditProperties & {
        name: string;
        subreddits: Subreddit[] | string[];
    }): Promise<MultiReddit>;
    createSubreddit(options: SubredditSettings): Promise<Subreddit>;
    getBlockedUsers(): Promise<RedditUser[]>;
    getComment(commentId: string, submissionId?: string, sort?: Sort): Comment;
    getContributorSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>;
    getControversial(subredditName?: string, options?: SortedListingOptions): Promise<Listing<Submission>>;
    getDefaultSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>;
    getFriends(): Promise<RedditUser[]>;
    getGoldSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>;
    getHot(subredditName?: string, options?: ListingOptions): Promise<Listing<Submission>>;
    getBest(options?: ListingOptions): Promise<Listing<Submission>>;
    getInbox(options?: {
        filter?: "inbox" | "unread" | "messages" | "comments" | "selfreply" | "mentions";
    }): Promise<Listing<PrivateMessage | Comment>>;
    getKarma(): Promise<Array<{
        sr: Subreddit;
        comment_karma: number;
        link_karma: number;
    }>>;
    getLivethread(threadId: string): Promise<LiveThread>;
    getMe(): Promise<RedditUser>;
    getMessage(messageId: string): Promise<PrivateMessage>;
    getModeratedSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>;
    getModmail(options?: ListingOptions): Promise<Listing<PrivateMessage>>;
    getMyMultireddits(): Promise<MultiReddit[]>;
    getMyTrophies(): Promise<Trophy[]>;
    getNew(subredditName?: string, options?: ListingOptions): Promise<Listing<Submission>>;
    getNewComments(subredditName?: string, options?: ListingOptions): Promise<Listing<Comment>>;
    getContentByIds(ids: Array<Submission | Comment | string>): Promise<Listing<Submission | Comment>>;
    /**
     * @category Modmail
     * @param options
     */
    getNewModmailConversations(options?: ListingOptions & {
        entity?: string;
    }): Promise<Listing<ModmailConversation>>;
    /**
     * @category Modmail
     * @param options
     */
    createModmailDiscussion(options: {
        body: string;
        subject: string;
        srName: string;
    }): Promise<ModmailConversation>;
    /**
     * @category Modmail
     * @param id
     */
    getNewModmailConversation(id: string): Promise<ModmailConversation>;
    /**
     * @category Modmail
     * @param convs
     */
    markNewModmailConversationsAsRead(convs: ModmailConversation[]): Promise<void>;
    /**
     * @category Modmail
     * @param convs
     */
    markNewModmailConversationsAsUnread(convs: ModmailConversation[]): Promise<void>;
    /**
     * @category Modmail
     */
    getNewModmailSubreddits(): Promise<Subreddit[]>;
    /**
     * @category Modmail
     */
    getUnreadNewModmailConversationsCount(): Promise<{
        highlighted: number;
        notifications: number;
        archived: number;
        appeals: number;
        new: number;
        inprogress: number;
        mod: number;
    }>;
    /**
     * @category Modmail
     * @param subs
     * @param state
     */
    bulkReadNewModmail(subs: Array<Subreddit | string>, state: "new" | "inprogress" | "mod" | "notifications" | "archived" | "appeals" | "highlighted" | "all"): Promise<Listing<ModmailConversation>>;
    getNewSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>;
    getOauthScopeList(): Promise<{
        [key: string]: {
            description: string;
            id: string;
            name: string;
        };
    }>;
    getPopularSubreddits(options?: ListingOptions): Promise<Listing<Subreddit>>;
    getPreferences(): Promise<any>;
    getRandomSubmission(subredditName?: string): Promise<Submission>;
    getRising(subredditName?: string, options?: ListingOptions): Promise<Listing<Submission>>;
    getSavedCategories(): Promise<any[]>;
    getSentMessages(options?: ListingOptions): Promise<Listing<PrivateMessage>>;
    getStickiedLivethread(): Promise<LiveThread | undefined>;
    getSubmission(submissionId: string, sort: Sort): Promise<Submission>;
    getSubreddit(displayName: string): Promise<Subreddit>;
    getSubscriptions(options?: ListingOptions): Promise<Listing<Subreddit>>;
    getTop(subredditName?: string, options?: SortedListingOptions): Promise<Listing<Submission>>;
    getUnreadMessages(options?: ListingOptions): Promise<Listing<PrivateMessage>>;
    getUser(name: string): Promise<RedditUser>;
    markAsVisited(links: Submission[]): Promise<this>;
    markMessagesAsRead(messages: PrivateMessage[] | string[]): Promise<void>;
    markMessagesAsUnread(messages: PrivateMessage[] | string[]): Promise<void>;
    readAllMessages(): Promise<this>;
    search(options: SearchOptions): Promise<Listing<Submission>>;
    searchSubredditNames(options: {
        query: string;
        exact?: boolean;
        includeNsfw?: boolean;
    }): Promise<string[]>;
    searchSubreddits(options: ListingOptions & {
        query: string;
    }): Promise<Listing<Subreddit>>;
    searchSubredditTopics(options: {
        query: string;
    }): Promise<Subreddit[]>;
    submitCrosspost({ originalPost, subredditName, title, url, ...options }: {
        originalPost: Submission | string;
        subredditName: string;
        title: string;
        url: string;
    }): Promise<void>;
    submitLink(options: SubmitLinkOptions): Promise<Submission>;
    submitSelfpost(options: SubmitSelfPostOptions): Promise<Submission>;
    updatePreferences(updatedPreferences: any): Promise<this>;
    getListing<Type>({ uri, qs, ...options }: any): Promise<Listing<Type>>;
    /**
     * @category Modnotes
     * @param user RedditUser object about which the note is to be made, or a string of the user's unprefixed name
     * @param subreddit Subreddit object on which the note should exist, or a string of the subreddit's unprefixed display name
     * @param filter Optionally, filter results by label type
     * @param limit Optionally, restrict quantity of notes returned. Default: 25, Max: 100
     * @param before Optionally, restrict results to historical modnotes (not sure of the format of this parameter)
     * @returns Requested modnotes in ModnoteResponse format
     */
    getModnotes(user: RedditUser | string, subreddit: Subreddit | string, filter?: NoteType, limit?: number, before?: string): Promise<ModnoteResponse>;
    /**
     * @category Modnotes
     * @param user RedditUser object about which the note is to be made, or a string of the user's unprefixed name
     * @param subreddit Subreddit object on which the note should exist, or a string of the subreddit's unprefixed display name
     * @param note_id ID of the note to be moved, typically in the format of ModNote_{UUID}
     * @returns
     */
    deleteModnote(user: RedditUser | string, subreddit: Subreddit | string, note_id: string): Promise<this>;
    /**
     * @summary Create a mod note for a user on a subreddit
     * @category Modnotes
     * @param user RedditUser object about which the note is to be made, or a string of the user's unprefixed name
     * @param subreddit Subreddit object on which the note should exist, or a string of the subreddit's unprefixed display name
     * @param note Text (upto 250 characters) to be stored
     * @param link Optionally, a prefixed RedditContent ID that the note should link to
     * @param label Optionally, the type of modnote to be created
     * @returns Newly created modnote
     */
    createModnote(user: RedditUser | string, subreddit: Subreddit | string, note: string, link?: string, label?: NoteLabel): Promise<Modnote>;
    /**
     * @category Modnotes
     */
    getRecentModnotes(): Promise<void>;
    assignFlair({ css_class, link, name, text, subreddit_name, }: {
        css_class: string;
        link: string;
        name?: string;
        text: string;
        subreddit_name: string;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    selectFlair({ flair_template_id, link, name, text, subredditName, }: {
        flair_template_id: string;
        link: string;
        name?: string;
        text?: string;
        subredditName: string;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    getMyName(): Promise<string>;
}
export interface SubmitOptions {
    subredditName: string;
    kind: string;
    title: string;
    url: string;
    videoPosterUrl?: string;
    websocketUrl?: string;
    gallery?: string;
    rtjson?: string;
    choices?: string;
    duration?: string;
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
    discussionType?: string;
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
    /** Destination of the message, be it a user, or a subreddit's modmail */
    to: RedditUser | Subreddit | string;
    /** Subject of the message to be sent, in plain text */
    subject: string;
    /** Body of the message to be sent, in plain text */
    text: string;
    /** Optionally, the subreddit from which the message is being sent, as a Subreddit object, or as a string  of the subreddit's display name with or without prefix */
    fromSubreddit?: Subreddit | string;
}
export interface BaseSearchOptions {
    query: string;
    time?: "hour" | "day" | "week" | "month" | "year" | "all";
    sort?: "relevance" | "hot" | "top" | "new" | "comments";
    syntax?: "cloudsearch" | "lucene" | "plain";
}
export interface SearchOptions extends BaseSearchOptions {
    subreddit?: Subreddit | string;
    restrictSr?: boolean;
    after?: string;
    before?: string;
    category?: string;
    count?: number;
    include_facets?: boolean;
    limit?: number;
    show?: "all";
    sr_detail?: string;
    type?: string;
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
