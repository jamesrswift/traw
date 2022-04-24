"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RedditUser_1 = __importDefault(require("../objects/RedditUser"));
const Subreddit_1 = __importDefault(require("../objects/Subreddit"));
const Comment_1 = __importDefault(require("../objects/Comment"));
const PrivateMessage_1 = __importDefault(require("../objects/PrivateMessage"));
const helpers_1 = require("./helpers");
const constants_1 = require("../../tier0/constants");
const Listing_1 = __importDefault(require("../objects/Listing"));
const exceptions_1 = require("../../tier0/exceptions");
const Submission_1 = __importDefault(require("../objects/Submission"));
const LiveThread_1 = __importDefault(require("../objects/LiveThread"));
class traw {
    requestor;
    constructor(requestor) {
        this.requestor = requestor;
    }
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    get(options) {
        return this.requestor.get(options);
    }
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    delete(options) {
        return this.requestor.delete(options);
    }
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    head(options) {
        return this.requestor.head(options);
    }
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    patch(options) {
        return this.requestor.patch(options);
    }
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    post(options) {
        return this.requestor.post(options);
    }
    /**
     * @category HTTP
     * @internal
     * @param options AxiosRequestConfig<any> formatted query
     * @returns AxiosResponse<any,any> data
     */
    put(options) {
        return this.requestor.put(options);
    }
    /*public async checkCaptchaRequirement(): Promise<boolean>{
        throw new NotImplemented()
    }

    public async checkUsernameAvailability(name: string): Promise<boolean> {
        throw new NotImplemented()
    }*/
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
    async composeMessage(options) {
        const ParsedOptions = {
            api_type: constants_1.api_type,
            to: options.to,
            subject: options.subject,
            text: options.text
        };
        if (options.to instanceof RedditUser_1.default) {
            ParsedOptions.to = options.to.name;
        }
        else if (options.to instanceof Subreddit_1.default) {
            ParsedOptions.to = `/r/${options.to.display_name}`;
        }
        if (options.fromSubreddit != undefined) {
            if (options.fromSubreddit instanceof Subreddit_1.default) {
                ParsedOptions.from_sr = options.fromSubreddit.display_name;
            }
            else if (typeof options.fromSubreddit === "string") {
                ParsedOptions.from_sr = options.fromSubreddit.replace(/^\/?r\//, ""); // Convert '/r/subreddit_name' to 'subreddit_name'
            }
        }
        const result = await this.post({
            url: "api/compose",
            form: ParsedOptions,
        });
        (0, helpers_1.handleJsonErrors)(result);
        return this;
    }
    /*public async config(opts?: ConfigOptions): ConfigOptions{
        throw new NotImplemented()
    }*/
    async createLivethread(options) {
        const result = await this.post({
            url: "api/live/create",
            form: {
                api_type: constants_1.api_type,
                description: options.description,
                nsfw: options.nsfw,
                resources: options.resources,
                title: options.title,
            },
        });
        (0, helpers_1.handleJsonErrors)(result);
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.getLivethread(result.json.data.id);
    }
    async createMultireddit(options) {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.post({
            url: "api/multi",
            form: {
                model: JSON.stringify({
                    display_name: options.name,
                    description_md: options.description,
                    icon_name: options.icon_name,
                    key_color: options.key_color,
                    subreddits: options.subreddits.map((sub) => ({
                        name: typeof sub === "string" ? sub : sub.display_name,
                    })),
                    visibility: options.visibility,
                    weighting_scheme: options.weighting_scheme,
                }),
            },
        });
    }
    async createSubreddit(options) {
        // @ts-ignore
        return this.#createOrEditSubreddit(options);
    }
    /*public async credentialedClientRequest(options?: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }*/
    async getBlockedUsers() {
        const blocked = (await this.get({ url: "prefs/blocked" })).data;
        let users = [];
        for (let child of blocked.data.children)
            users.push(new RedditUser_1.default(child, this, false));
        return users;
    }
    /*public async getCaptchaImage(identifier: string): Promise<string> {
        throw new NotImplemented();
    }*/
    getComment(commentId, submissionId, sort) {
        return new Comment_1.default({
            name: (0, helpers_1.addFullnamePrefix)(commentId, "t1_"),
            link_id: submissionId
                ? (0, helpers_1.addFullnamePrefix)(submissionId, "t3_")
                : undefined,
            _sort: sort,
        }, this, false);
    }
    async getContributorSubreddits(options) {
        return this.getListing({
            uri: "subreddits/mine/contributor",
            qs: options,
        });
    }
    async getControversial(subredditName, options) {
        return this.#getSortedFrontpage("rising", subredditName, options);
    }
    async getDefaultSubreddits(options) {
        return this.getListing({ uri: "subreddits/default", qs: options });
    }
    async getFriends() {
        const friendsResponse = (await this.get({ url: "prefs/friends" })).data;
        /*
            Not sure what the second entry of friendsResponse corresponds to, but
            testing shows the first is what we are looking for. More investigation
            needed
        */
        const friendsList = [];
        for (const friend of friendsResponse[0].data.children) {
            friendsList.push(new RedditUser_1.default(friend, this, false));
        }
        return friendsList;
    }
    async getGoldSubreddits(options) {
        return this.getListing({ uri: "subreddits/gold", qs: options });
    }
    async getHot(subredditName, options) {
        return this.#getSortedFrontpage("hot", subredditName, options);
    }
    async getBest(options) {
        return this.#getSortedFrontpage("best", undefined, options);
    }
    async getInbox(options = {}) {
        return this.getListing({
            uri: `message/${options.filter || "inbox"}`,
            qs: options,
        });
    }
    async getKarma() {
        return (await this.get({ url: "api/v1/me/karma" })).data.data;
    }
    async getLivethread(threadId) {
        return new LiveThread_1.default({ id: (0, helpers_1.addFullnamePrefix)(threadId, "LiveUpdateEvent_").slice(16) }, this, false);
    }
    async getMe() {
        const result = await this.get({ url: "api/v1/me" });
        this._ownUserInfo = new RedditUser_1.default(result.data, this, true);
        return this._ownUserInfo;
    }
    async getMessage(messageId) {
        return new PrivateMessage_1.default({ name: (0, helpers_1.addFullnamePrefix)(messageId, "t4_") }, this, false);
    }
    async getModeratedSubreddits(options) {
        return this.getListing({
            uri: "subreddits/mine/moderator",
            qs: options,
        });
    }
    async getModmail(options) {
        return this.getListing({ uri: "message/moderator", qs: options });
    }
    async getMyMultireddits() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({
            url: "api/multi/mine",
            params: { expand_srs: true },
        });
    }
    async getMyTrophies() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: "api/v1/me/trophies" });
    }
    async getNew(subredditName, options) {
        return this.#getSortedFrontpage("new", subredditName, options);
    }
    /*public async getNewCaptchaIdentifier(): Promise<string> {
        throw new NotImplemented();
    }*/
    async getNewComments(subredditName, options) {
        return this.#getSortedFrontpage("comments", subredditName, options);
    }
    async getContentByIds(ids) {
        throw new exceptions_1.NotImplemented();
        const prefixedIds = [];
        ids.forEach((value) => {
            if (value instanceof Submission_1.default || value instanceof Comment_1.default) {
                prefixedIds.push(value.id);
            }
            else if (/t(1|3)_/g.test(value)) {
                prefixedIds.push(value);
            }
            else {
                throw new TypeError("ID must be either a prefixed string, submission object or comment object");
            }
        });
        // @ts-ignore
        return this.get({
            url: "api/info",
            params: { id: prefixedIds.join(",") },
        });
    }
    /**
     * @category Modmail
     * @param options
     */
    async getNewModmailConversations(options) {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @category Modmail
     * @param options
     */
    async createModmailDiscussion(options) {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @category Modmail
     * @param id
     */
    async getNewModmailConversation(id) {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @category Modmail
     * @param convs
     */
    async markNewModmailConversationsAsRead(convs) {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @category Modmail
     * @param convs
     */
    async markNewModmailConversationsAsUnread(convs) {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @category Modmail
     */
    async getNewModmailSubreddits() {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @category Modmail
     */
    async getUnreadNewModmailConversationsCount() {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @category Modmail
     * @param subs
     * @param state
     */
    async bulkReadNewModmail(subs, state) {
        throw new exceptions_1.NotImplemented();
    }
    async getNewSubreddits(options) {
        return this.getListing({ uri: "subreddits/new", qs: options });
    }
    async getOauthScopeList() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: "api/v1/scopes" });
    }
    async getPopularSubreddits(options) {
        return this.getListing({ uri: "subreddits/popular", qs: options });
    }
    async getPreferences() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: "api/v1/me/prefs" });
    }
    async getRandomSubmission(subredditName) {
        throw new exceptions_1.NotImplemented();
        const res = await this.get({
            url: `${subredditName ? `r/${subredditName}/` : ""}random`,
        });
        // @ts-ignore
        return res instanceof snoowrap.objects.Submission ? res : null;
    }
    async getRising(subredditName, options) {
        return this.#getSortedFrontpage('rising', subredditName, options);
    }
    async getSavedCategories() {
        const res = await this.get({ url: 'api/saved_categories' });
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return res.categories;
    }
    async getSentMessages(options) {
        return this.getListing({ uri: 'message/sent', qs: options });
    }
    async getStickiedLivethread() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: 'api/live/happening_now' });
    }
    async getSubmission(submissionId, sort) {
        return new Submission_1.default({ name: (0, helpers_1.addFullnamePrefix)(submissionId, "t3_"), _sort: sort }, this, false);
    }
    async getSubreddit(displayName) {
        return new Subreddit_1.default({ display_name: displayName }, this, false);
    }
    async getSubscriptions(options) {
        return this.getListing({ uri: 'subreddits/mine/subscriber', qs: options });
    }
    async getTop(subredditName, options) {
        return this.#getSortedFrontpage('top', subredditName, options);
    }
    async getUnreadMessages(options) {
        return this.getListing({ uri: 'message/unread', qs: options });
    }
    async getUser(name) {
        return new RedditUser_1.default({ name: (name + "").replace(/^\/?u\//, "") }, this, false);
    }
    async markAsVisited(links) {
        await this.post({ url: 'api/store_visits', form: { links: links.map(sub => sub.name).join(',') } });
        return this;
    }
    async markMessagesAsRead(messages) {
        const messageIds = messages.map(message => (0, helpers_1.addFullnamePrefix)(message, 't4_'));
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.post({ url: 'api/read_message', form: { id: messageIds.join(',') } });
    }
    async markMessagesAsUnread(messages) {
        const messageIds = messages.map(message => (0, helpers_1.addFullnamePrefix)(message, 't4_'));
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.post({ url: 'api/unread_message', form: { id: messageIds.join(',') } });
    }
    /*public async oauthRequest(options: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }
    
    public async rawRequest(options: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }*/
    async readAllMessages() {
        await this.post({ url: 'api/read_all_messages' });
        return this;
    }
    /*public async revokeRefreshToken(): Promise<void>{
        throw new NotImplemented()
    }*/
    async search(options) {
        throw new exceptions_1.NotImplemented();
    }
    async searchSubredditNames(options) {
        throw new exceptions_1.NotImplemented();
    }
    async searchSubreddits(options) {
        throw new exceptions_1.NotImplemented();
    }
    async searchSubredditTopics(options) {
        throw new exceptions_1.NotImplemented();
    }
    async submitCrosspost({ originalPost, subredditName, title, url, ...options }) {
        return this.#submit({
            ...options,
            subredditName,
            title,
            url,
            kind: "crosspost",
            crosspost_fullname: originalPost instanceof Submission_1.default
                ? originalPost.name
                : (0, helpers_1.addFullnamePrefix)(originalPost, "t3_"),
        });
    }
    async submitLink(options) {
        throw new exceptions_1.NotImplemented();
    }
    async submitSelfpost(options) {
        throw new exceptions_1.NotImplemented();
    }
    /*public async unauthenticatedRequest(options: RequestOptions): Promise<any>{// options: https://www.npmjs.com/package/request
        throw new NotImplemented()
    }*/
    /*public async updateAccessToken(): Promise<string>{
        throw new NotImplemented()
    }*/
    async updatePreferences(updatedPreferences) {
        await this.patch({ url: "api/v1/me/prefs", data: updatedPreferences });
        return this;
    }
    async getListing({ uri, qs = {}, ...options }) {
        const mergedQuery = { count: 9999, ...qs };
        if (qs.limit /*|| !IsEmpty(options)*/) {
            return new Listing_1.default({ _query: mergedQuery, _uri: uri, ...options }, this).fetchMore(qs.limit ?? constants_1.MAX_LISTING_ITEMS);
        }
        else {
            // @ts-ignore
            return this.get({ url: uri, params: mergedQuery }).then((listing) => {
                //console.log( "tra.getList<Type>", listing)
                return new Listing_1.default(listing.data.data, this);
                /*if (Array.isArray(listing)) {
                    listing.filter(item => item.constructor._name === 'Comment').forEach(addEmptyRepliesListing);
                }
                return listing;*/
            });
        }
    }
    //#region Modnotes
    /**
     * @category Modnotes
     * @param user RedditUser object about which the note is to be made, or a string of the user's unprefixed name
     * @param subreddit Subreddit object on which the note should exist, or a string of the subreddit's unprefixed display name
     * @param filter Optionally, filter results by label type
     * @param limit Optionally, restrict quantity of notes returned. Default: 25, Max: 100
     * @param before Optionally, restrict results to historical modnotes (not sure of the format of this parameter)
     * @returns Requested modnotes in ModnoteResponse format
     */
    async getModnotes(user, subreddit, filter, limit, before) {
        const query = {};
        query.user = user instanceof RedditUser_1.default ? user.name : user;
        query.subreddit = subreddit instanceof Subreddit_1.default ? subreddit.display_name : subreddit;
        if (filter != undefined)
            query.filter = filter;
        if (limit != undefined)
            query.limit = limit;
        if (before != undefined)
            query.before = before;
        return (await this.get({
            url: '/api/mod/notes',
            params: query
        })).data;
    }
    /**
     * @category Modnotes
     * @param user RedditUser object about which the note is to be made, or a string of the user's unprefixed name
     * @param subreddit Subreddit object on which the note should exist, or a string of the subreddit's unprefixed display name
     * @param note_id ID of the note to be moved, typically in the format of ModNote_{UUID}
     * @returns
     */
    async deleteModnote(user, subreddit, note_id) {
        await this.delete({
            url: '/api/mod/notes',
            params: {
                user: user instanceof RedditUser_1.default ? user.name : user,
                subreddit: subreddit instanceof Subreddit_1.default ? subreddit.display_name : subreddit,
                note_id
            }
        });
        return this;
    }
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
    async createModnote(user, subreddit, note, link, label) {
        const query = {};
        query.user = user instanceof RedditUser_1.default ? user.name : user;
        query.subreddit = subreddit instanceof Subreddit_1.default ? subreddit.display_name : subreddit;
        query.note = note;
        if (label)
            query.label = label;
        if (link)
            query.reddit_id = link;
        const response = (await this.post({
            url: '/api/mod/notes',
            params: query
        })).data;
        return response.created;
    }
    /**
     * @category Modnotes
     */
    async getRecentModnotes() {
        throw new exceptions_1.NotImplemented();
    }
    //#endregion
    async assignFlair({ css_class, link, name, text, subreddit_name, }) {
        return this.post({
            url: `r/${subreddit_name}/api/flair`,
            form: { api_type: constants_1.api_type, name, text, link, css_class },
        });
    }
    async selectFlair({ flair_template_id, link, name, text, subredditName, }) {
        return this.post({
            url: `r/${subredditName}/api/selectflair`,
            form: { api_type: constants_1.api_type, flair_template_id, link, name, text },
        });
    }
    async #submit(options) {
        throw new exceptions_1.NotImplemented();
    }
    async getMyName() {
        return this._ownUserInfo
            ? this._ownUserInfo.name
            : (await this.getMe()).name;
    }
    async #getSortedFrontpage(sortType, subredditName, options = {}) {
        // Handle things properly if only a time parameter is provided but not the subreddit name
        let opts = { ...options, t: options.time };
        delete opts.time;
        return this.getListing({
            uri: (subredditName ? `r/${subredditName}/` : "") + sortType,
            qs: opts,
        });
    }
    async #createOrEditSubreddit(options) {
        throw new exceptions_1.NotImplemented();
    }
}
exports.default = traw;
