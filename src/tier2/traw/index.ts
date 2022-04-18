import baseRequestor from "../../tier0/requestors/baseRequestor";
import RedditUser from "../objects/RedditUser";
import Subreddit, { Sort, SubredditSettings } from "../objects/Subreddit";
import Comment from "../objects/Comment";
import PrivateMessage from "../objects/PrivateMessage";
import { addFullnamePrefix, handleJsonErrors } from "./helpers";
import { api_type, MAX_LISTING_ITEMS } from "../../tier0/constants";
import Listing, {
	ListingOptions,
	SortedListingOptions,
} from "../objects/Listing";
import { NotImplemented } from "../../tier0/exceptions";
import Submission from "../objects/Submission";
import LiveThread, { LiveThreadSettings } from "../objects/LiveThread";
import ModmailConversation from "../objects/ModmailConversation";
import MultiReddit, { MultiRedditProperties } from "../objects/MultiReddit";

export default interface traw {
	_ownUserInfo?: RedditUser;
}

export default class traw {
	constructor(protected requestor: baseRequestor) {}

	public get(options: any) {
		return this.requestor.get(options);
	}

	public delete(options: any) {
		return this.requestor.delete(options);
	}

	public head(options: any) {
		return this.requestor.head(options);
	}

	public patch(options: any) {
		return this.requestor.patch(options);
	}

	public post(options: any) {
		return this.requestor.post(options);
	}

	public put(options: any) {
		return this.requestor.put(options);
	}

	/*public async checkCaptchaRequirement(): Promise<boolean>{
        throw new NotImplemented()
    }

    public async checkUsernameAvailability(name: string): Promise<boolean> {
        throw new NotImplemented()
    }*/

	public async composeMessage(options: ComposeMessageParams): Promise<this> {
        const ParsedOptions : any = {
            api_type,
            to : options.to,
            subject: options.subject,
            text: options.text
        }

        if ( options.to instanceof RedditUser ){
            ParsedOptions.to = options.to.name;
        } else if ( options.to instanceof Subreddit ){
            ParsedOptions.to = `/r/${options.to.display_name}`;
        }

        if ( options.fromSubreddit != undefined){
            if ( options.fromSubreddit instanceof Subreddit ){
                ParsedOptions.from_sr = options.fromSubreddit.display_name;
            } else if (typeof options.fromSubreddit === "string") {
                ParsedOptions.from_sr = options.fromSubreddit.replace(/^\/?r\//, ""); // Convert '/r/subreddit_name' to 'subreddit_name'
            }
        }

		const result = await this.post({
			url: "api/compose",
			form: ParsedOptions,
		});
		handleJsonErrors(result);
		return this;
	}

	/*public async config(opts?: ConfigOptions): ConfigOptions{
        throw new NotImplemented()
    }*/

	public async createLivethread(
		options: LiveThreadSettings
	): Promise<LiveThread> {
		const result = await this.post({
			url: "api/live/create",
			form: {
				api_type,
				description: options.description,
				nsfw: options.nsfw,
				resources: options.resources,
				title: options.title,
			},
		});
		handleJsonErrors(result);

		throw new NotImplemented();
		// @ts-ignore
		return this.getLivethread(result.json.data.id);
	}

	public async createMultireddit(
		options: MultiRedditProperties & {
			name: string;
			subreddits: Subreddit[] | string[];
		}
	): Promise<MultiReddit> {
		throw new NotImplemented();
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

	public async createSubreddit(
		options: SubredditSettings
	): Promise<Subreddit> {
        // @ts-ignore
		return this.#createOrEditSubreddit(options);
	}

	/*public async credentialedClientRequest(options?: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }*/

	public async getBlockedUsers(): Promise<RedditUser[]> {
        const blocked = (await this.get({ url: "prefs/blocked" })).data;
        let users : RedditUser[] = [];
        for ( let child of blocked.data.children as Partial<RedditUser>[]) users.push(
            new RedditUser( child, this, false)
        )
		return users
	}

	/*public async getCaptchaImage(identifier: string): Promise<string> {
		throw new NotImplemented();
	}*/

	public getComment(
		commentId: string,
		submissionId?: string,
		sort?: Sort
	): Comment {
		return new Comment(
			{
				name: addFullnamePrefix(commentId, "t1_"),
				link_id: submissionId
					? addFullnamePrefix(submissionId, "t3_")
					: undefined,
				_sort: sort,
			},
			this,
			false
		);
	}

	public async getContributorSubreddits(
		options?: ListingOptions
	): Promise<Listing<Subreddit>> {
		return this.getListing({
			uri: "subreddits/mine/contributor",
			qs: options,
		});
	}

	public async getControversial(
		subredditName?: string,
		options?: SortedListingOptions
	): Promise<Listing<Submission>> {
		return this.#getSortedFrontpage("rising", subredditName, options);
	}

	public async getDefaultSubreddits(
		options?: ListingOptions
	): Promise<Listing<Subreddit>> {
		return this.getListing({ uri: "subreddits/default", qs: options });
	}

	public async getFriends(): Promise<RedditUser[]> {
		throw new NotImplemented();
		// @ts-ignore
		return this.get({ url: "prefs/friends" });
	}

	public async getGoldSubreddits(
		options?: ListingOptions
	): Promise<Listing<Subreddit>> {
		return this.getListing({ uri: "subreddits/gold", qs: options });
	}

	public async getHot(
		subredditName?: string,
		options?: ListingOptions
	): Promise<Listing<Submission>> {
		return this.#getSortedFrontpage("hot", subredditName, options);
	}

	public async getBest(
		options?: ListingOptions
	): Promise<Listing<Submission>> {
		return this.#getSortedFrontpage("best", undefined, options);
	}

	public async getInbox(
		options: {
			filter?:
				| "inbox"
				| "unread"
				| "messages"
				| "comments"
				| "selfreply"
				| "mentions";
		} = {}
	): Promise<Listing<PrivateMessage | Comment>> {
		return this.getListing({
			uri: `message/${options.filter || "inbox"}`,
			qs: options,
		});
	}

	public async getKarma(): Promise<
		Array<{ sr: Subreddit; comment_karma: number; link_karma: number }>
	> {
		throw new NotImplemented();

		// @ts-ignore
		return this.get({ url: "api/v1/me/karma" });
	}

	public async getLivethread(threadId: string): Promise<LiveThread> {
		return new LiveThread(
			{ id: addFullnamePrefix(threadId, "LiveUpdateEvent_").slice(16) },
			this,
			false
		);
	}

	public async getMe(): Promise<RedditUser> {
		const result = await this.get({ url: "api/v1/me" });
		this._ownUserInfo = new RedditUser(result.data, this, true);
		return this._ownUserInfo;
	}

	public async getMessage(messageId: string): Promise<PrivateMessage> {
		return new PrivateMessage(
			{ name: addFullnamePrefix(messageId, "t4_") },
			this,
			false
		);
	}

	public async getModeratedSubreddits(
		options?: ListingOptions
	): Promise<Listing<Subreddit>> {
		return this.getListing({
			uri: "subreddits/mine/moderator",
			qs: options,
		});
	}

	public async getModmail(
		options?: ListingOptions
	): Promise<Listing<PrivateMessage>> {
		return this.getListing({ uri: "message/moderator", qs: options });
	}

	public async getMyMultireddits(): Promise<MultiReddit[]> {
		throw new NotImplemented();
		// @ts-ignore
		return this.get({
			url: "api/multi/mine",
			params: { expand_srs: true },
		});
	}

	public async getMyTrophies(): Promise<Trophy[]> {
		throw new NotImplemented();
		// @ts-ignore
		return this.get({ url: "api/v1/me/trophies" });
	}

	public async getNew(
		subredditName?: string,
		options?: ListingOptions
	): Promise<Listing<Submission>> {
		return this.#getSortedFrontpage("new", subredditName, options);
	}

	/*public async getNewCaptchaIdentifier(): Promise<string> {
		throw new NotImplemented();
	}*/

	public async getNewComments(
		subredditName?: string,
		options?: ListingOptions
	): Promise<Listing<Comment>> {
		return this.#getSortedFrontpage<Comment>(
			"comments",
			subredditName,
			options
		);
	}

	public async getContentByIds(
		ids: Array<Submission | Comment | string>
	): Promise<Listing<Submission | Comment>> {
		throw new NotImplemented();

		const prefixedIds: string[] = [];
		ids.forEach((value: string | Submission | Comment) => {
			if (value instanceof Submission || value instanceof Comment) {
				prefixedIds.push(value.id);
			} else if (/t(1|3)_/g.test(value)) {
				prefixedIds.push(value);
			} else {
				throw new TypeError(
					"ID must be either a prefixed string, submission object or comment object"
				);
			}
		});

		// @ts-ignore
		return this.get({
			url: "api/info",
			params: { id: prefixedIds.join(",") },
		});
	}

	public async getNewModmailConversations(
		options?: ListingOptions & { entity?: string }
	): Promise<Listing<ModmailConversation>> {
		throw new NotImplemented();
	}

	public async createModmailDiscussion(options: {
		body: string;
		subject: string;
		srName: string;
	}): Promise<ModmailConversation> {
		throw new NotImplemented();
	}

	public async getNewModmailConversation(
		id: string
	): Promise<ModmailConversation> {
		throw new NotImplemented();
	}

	public async markNewModmailConversationsAsRead(
		convs: ModmailConversation[]
	): Promise<void> {
		throw new NotImplemented();
	}

	public async markNewModmailConversationsAsUnread(
		convs: ModmailConversation[]
	): Promise<void> {
		throw new NotImplemented();
	}

	public async getNewModmailSubreddits(): Promise<Subreddit[]> {
		throw new NotImplemented();
	}

	public async getUnreadNewModmailConversationsCount(): Promise<{
		highlighted: number;
		notifications: number;
		archived: number;
		appeals: number;
		new: number;
		inprogress: number;
		mod: number;
	}> {
		throw new NotImplemented();
	}

	public async bulkReadNewModmail(
		subs: Array<Subreddit | string>,
		state:
			| "new"
			| "inprogress"
			| "mod"
			| "notifications"
			| "archived"
			| "appeals"
			| "highlighted"
			| "all"
	): Promise<Listing<ModmailConversation>> {
		throw new NotImplemented();
	}

	public async getNewSubreddits(
		options?: ListingOptions
	): Promise<Listing<Subreddit>> {
		return this.getListing({ uri: "subreddits/new", qs: options });
	}

	public async getOauthScopeList(): Promise<{
		[key: string]: { description: string; id: string; name: string };
	}> {
		throw new NotImplemented();

		// @ts-ignore
		return this.get({ url: "api/v1/scopes" });
	}

	public async getPopularSubreddits(
		options?: ListingOptions
	): Promise<Listing<Subreddit>> {
		return this.getListing({ uri: "subreddits/popular", qs: options });
	}

	public async getPreferences(): Promise<any> {
		throw new NotImplemented();
		// @ts-ignore
		return this.get({ url: "api/v1/me/prefs" });
	}

	public async getRandomSubmission(
		subredditName?: string
	): Promise<Submission> {
		throw new NotImplemented();
		const res = await this.get({
			url: `${subredditName ? `r/${subredditName}/` : ""}random`,
		});
		// @ts-ignore
		return res instanceof snoowrap.objects.Submission ? res : null;
	}

	public async getRising(
		subredditName?: string,
		options?: ListingOptions
	): Promise<Listing<Submission>> {
		return this.#getSortedFrontpage('rising', subredditName, options);
	}

	public async getSavedCategories(): Promise<any[]> {
		const res = await this.get({url: 'api/saved_categories'});
        throw new NotImplemented();
        // @ts-ignore
        return res.categories;
	}

	public async getSentMessages(
		options?: ListingOptions
	): Promise<Listing<PrivateMessage>> {
		return this.getListing({uri: 'message/sent', qs: options});
	}

	public async getStickiedLivethread(): Promise<LiveThread | undefined> {
		throw new NotImplemented();
        // @ts-ignore
        return this.get({url: 'api/live/happening_now'});
	}

	public async getSubmission(
		submissionId: string,
		sort: Sort
	): Promise<Submission> {
		return new Submission(
			{ name: addFullnamePrefix(submissionId, "t3_"), _sort: sort },
			this,
			false
		);
	}

	public async getSubreddit(displayName: string): Promise<Subreddit> {
		return new Subreddit({ display_name: displayName }, this, false);
	}

	public async getSubscriptions(
		options?: ListingOptions
	): Promise<Listing<Subreddit>> {
		return this.getListing({uri: 'subreddits/mine/subscriber', qs: options});
	}

	public async getTop(
		subredditName?: string,
		options?: SortedListingOptions
	): Promise<Listing<Submission>> {
		return this.#getSortedFrontpage('top', subredditName, options);
	}

	public async getUnreadMessages(
		options?: ListingOptions
	): Promise<Listing<PrivateMessage>> {
		return this.getListing({uri: 'message/unread', qs: options});
	}

	public async getUser(name: string): Promise<RedditUser> {
		return new RedditUser(
			{ name: (name + "").replace(/^\/?u\//, "") },
			this,
			false
		);
	}

	public async markAsVisited(links: Submission[]): Promise<this> {
		await this.post({url: 'api/store_visits', form: {links: links.map(sub => sub.name).join(',')}});
        return this
    }

	public async markMessagesAsRead(
		messages: PrivateMessage[] | string[]
	): Promise<void> {
		const messageIds = messages.map(message => addFullnamePrefix(message, 't4_'));
        throw new NotImplemented();
        // @ts-ignore
        return this.post({url: 'api/read_message', form: {id: messageIds.join(',')}});
	}

	public async markMessagesAsUnread(
		messages: PrivateMessage[] | string[]
	): Promise<void> {
		const messageIds = messages.map(message => addFullnamePrefix(message, 't4_'));
        throw new NotImplemented();
        // @ts-ignore
        return this.post({url: 'api/unread_message', form: {id: messageIds.join(',')}});
	}

	/*public async oauthRequest(options: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }
    
    public async rawRequest(options: RequestOptions): Promise<any>{
        throw new NotImplemented()
    }*/

	public async readAllMessages(): Promise<this> {
		await this.post({url: 'api/read_all_messages'});
        return this
	}

	/*public async revokeRefreshToken(): Promise<void>{
        throw new NotImplemented()
    }*/

	public async search(options: SearchOptions): Promise<Listing<Submission>> {
		throw new NotImplemented();
	}

	public async searchSubredditNames(options: {
		query: string;
		exact?: boolean;
		includeNsfw?: boolean;
	}): Promise<string[]> {
		throw new NotImplemented();
	}

	public async searchSubreddits(
		options: ListingOptions & { query: string }
	): Promise<Listing<Subreddit>> {
		throw new NotImplemented();
	}

	public async searchSubredditTopics(options: {
		query: string;
	}): Promise<Subreddit[]> {
		throw new NotImplemented();
	}

	public async submitCrosspost({
		originalPost,
		subredditName,
		title,
		url,
		...options
	}: {
		originalPost: Submission | string;
		subredditName: string;
		title: string;
		url: string;
	}) {
		return this.#submit({
			...options,
			subredditName,
			title,
			url,
			kind: "crosspost",
			crosspost_fullname:
				originalPost instanceof Submission
					? originalPost.name
					: addFullnamePrefix(originalPost, "t3_"),
		});
	}

	public async submitLink(options: SubmitLinkOptions): Promise<Submission> {
		throw new NotImplemented();
	}

	public async submitSelfpost(
		options: SubmitSelfPostOptions
	): Promise<Submission> {
		throw new NotImplemented();
	}

	/*public async unauthenticatedRequest(options: RequestOptions): Promise<any>{// options: https://www.npmjs.com/package/request
        throw new NotImplemented()
    }*/

	/*public async updateAccessToken(): Promise<string>{
        throw new NotImplemented()
    }*/

	public async updatePreferences(updatedPreferences: any): Promise<this> {
		await this.patch({ url: "api/v1/me/prefs", data: updatedPreferences });
		return this;
	}

	public async getListing<Type>({
		uri,
		qs = {},
		...options
	}: any): Promise<Listing<Type>> {
		const mergedQuery = { count: 9999, ...qs };

		if (qs.limit /*|| !IsEmpty(options)*/) {
			return new Listing<Type>(
				{ _query: mergedQuery, _uri: uri, ...options },
				this
			).fetchMore(qs.limit ?? MAX_LISTING_ITEMS);
		} else {
			return this.get({ url: uri, params: mergedQuery }).then(
				(listing) => {
					throw new NotImplemented();
					/*return listing*/
				}
			);
		}
	}

	public async assignFlair({
		css_class,
		link,
		name,
		text,
		subreddit_name,
	}: {
		css_class: string;
		link: string;
		name?: string;
		text: string;
		subreddit_name: string;
	}) {
		return this.post({
			url: `r/${subreddit_name}/api/flair`,
			form: { api_type, name, text, link, css_class },
		});
	}

	public async selectFlair({
		flair_template_id,
		link,
		name,
		text,
		subredditName,
	}: {
		flair_template_id: string;
		link: string;
		name?: string;
		text?: string;
		subredditName: string;
	}) {
		return this.post({
			url: `r/${subredditName}/api/selectflair`,
			form: { api_type, flair_template_id, link, name, text },
		});
	}

	async #submit(options: SubmitOptions) {
		throw new NotImplemented();
	}

	public async getMyName() {
		return this._ownUserInfo
			? this._ownUserInfo.name
			: (await this.getMe()).name;
	}

	async #getSortedFrontpage<Type>(
		sortType: string,
		subredditName?: string,
		options: SortedListingOptions = {}
	): Promise<Listing<Type>> {
		// Handle things properly if only a time parameter is provided but not the subreddit name
		let opts = { ...options, t: options.time };
		delete opts.time;
		return this.getListing<Type>({
			uri: (subredditName ? `r/${subredditName}/` : "") + sortType,
			qs: opts,
		});
	}

    async #createOrEditSubreddit(options: any){
        throw new NotImplemented();
    }
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
	to: RedditUser | Subreddit | string;
	subject: string;
	text: string;
	fromSubreddit?: Subreddit | string;
	captchaIden?: string; // @deprecated
	captchaResponse?: string; // @deprecated
	captcha?: string; // @deprecated
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
