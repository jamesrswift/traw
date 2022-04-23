import Comment from "./Comment";
import Listing, { ListingOptions, SortedListingOptions } from "./Listing";
import PrivateMessage from "./PrivateMessage";
import RedditContent from "../mixins/RedditContent";
import RedditUser from "./RedditUser";
import Submission from "./Submission";
import WikiPage, { WikiPageRevision } from "./WikiPage";
// import ModmailConversation from "./ModmailConversation";
import { RichTextFlair } from "../mixins/VoteableContent";
import { AxiosResponse } from "axios";
import { api_type } from "../../tier0/constants";
import { formatModPermissions, handleJsonErrors } from "../traw/helpers";
import { NotImplemented } from "../../tier0/exceptions";
import { createReadStream } from "fs";
import { BaseSearchOptions, SubmitLinkOptions, SubmitSelfPostOptions } from "../traw";
import ModmailConversation from "./ModmailConversation";
import { ModAction } from "./ModAction";

export default interface Subreddit extends RedditContent<Subreddit> {
	accept_followers: boolean; // Added 15/04/22
	accounts_active_is_fuzzed: boolean;
	accounts_active: number;
	active_user_count: number;
	advertiser_category: string | null;
	all_original_content: boolean;
	allow_discovery: boolean;
	allow_galleries: boolean; // Added 15/04/22
	allow_images: boolean;
	allow_polls: boolean; // Added 15/04/22
	allow_prediction_contributors: boolean; // Added 15/04/22
	allow_predictions_tournament: boolean; // Added 15/04/22
	allow_predictions: boolean; // Added 15/04/22
	allow_talks: boolean; // Added 15/04/22
	allow_videogifs: boolean;
	allow_videos: boolean;
	banner_background_color: string /** HEX color code */;
	banner_background_image: string /** URL of the banner image used on desktop Reddit */;
	banner_img: string /** URL of the banner image used on the mobile Reddit app */;
	banner_size: [number, number] | null;
	can_assign_link_flair: boolean;
	can_assign_user_flair: boolean;
	collapse_deleted_comments: boolean;
	comment_score_hide_mins: number;
	community_icon: string /** Image URL of the subreddit icon */;
	community_reviewed: boolean; // Added 15/04/22
	description_html: string;
	description: string;
	disable_contributor_requests: boolean; // Added 15/04/22
	display_name_prefixed: string;
	display_name: string;
	emojis_custom_size: [number, number] | null;
	emojis_enabled: boolean;
	free_form_reports: boolean; // Added 15/04/22
	has_menu_widget: boolean;
	header_img: string | null;
	header_size: [number, number] | null;
	header_title: string | null;
	hide_ads: boolean;
	icon_img: string;
	icon_size: [number, number] | null;
	is_crosspostable_subreddit: boolean; // Added 15/04/22
	is_enrolled_in_new_modmail: boolean | null;
	key_color: string;
	lang: string;
	link_flair_enabled: boolean;
	link_flair_position: "" | "left" | "right";
	mobile_banner_image: string; // Added 15/04/22; value : '' when tested
	notification_level:
		| string
		| null /** Will be null if user is not subscribed to this subreddit */;
	original_content_tag_enabled: boolean; // Added 15/04/22
	over18: boolean;
	prediction_leaderboard_entry_type: string; // Added 15/04/22;  value : 'SUBREDDIT_HEADER' when tested
	primary_color: string /** HEX color code */;
	public_description_html: string;
	public_description: string;
	public_traffic: boolean;
	quarantine: boolean;
	restrict_commenting: boolean; // Added 15/04/22
	restrict_posting: boolean; // Added 15/04/22
	should_archive_posts: boolean; // Added 15/04/22
	show_media_preview: boolean;
	show_media: boolean;
	spoilers_enabled: boolean;
	submission_type: LinkType;
	submit_link_label: string | null;
	submit_text_html: string;
	submit_text_label: string | null;
	submit_text: string;
	subreddit_type: SubredditType;
	subscribers: number;
	suggested_comment_sort: Sort | null;
	title: string;
	url: string;
	user_can_flair_in_sr: boolean;
	user_flair_background_color: string | null;
	user_flair_css_class: string | null;
	user_flair_enabled_in_sr: boolean;
	user_flair_position: "" | "left" | "right";
	user_flair_richtext: RichTextFlair[];
	user_flair_template_id: string | null;
	user_flair_text_color: "dark" | "light" | null;
	user_flair_text: string | null;
	user_flair_type: string; // Added 15/04/22
	user_has_favorited: boolean;
	user_is_banned: boolean;
	user_is_contributor: boolean;
	user_is_moderator: boolean;
	user_is_muted: boolean;
	user_is_subscriber: boolean;
	user_sr_flair_enabled: boolean;
	user_sr_theme_enabled: boolean;
	whitelist_status: string;
	wiki_enabled: boolean;
	wls: number;
}

/**
 * @Category Reddit Objects
 */
export default class Subreddit extends RedditContent<Subreddit> {
	public override get uri(): string {
		return `r/${this.display_name}/about`;
	}

	protected override transformApiResponse(
		response: AxiosResponse<Subreddit, any>
	): Subreddit {
		const payload = (<
			AxiosResponse<
				{
					kind: "t5";
					data: Subreddit;
				},
				any
			>
		>(<unknown>response)).data.data;

		// Assignment
		this.accept_followers = payload.accept_followers;
		this.accounts_active = payload.accounts_active;
		this.accounts_active_is_fuzzed = payload.accounts_active_is_fuzzed;
		this.active_user_count = payload.active_user_count;
		this.advertiser_category = payload.advertiser_category;
		this.all_original_content = payload.all_original_content;
		this.allow_discovery = payload.allow_discovery;
		this.allow_galleries = payload.allow_galleries;
		this.allow_images = payload.allow_images;
		this.allow_polls = payload.allow_polls;
		this.allow_prediction_contributors =
			payload.allow_prediction_contributors;
		this.allow_predictions = payload.allow_predictions;
		this.allow_predictions_tournament =
			payload.allow_predictions_tournament;
		this.allow_talks = payload.allow_talks;
		this.allow_videogifs = payload.allow_videogifs;
		this.allow_videos = payload.allow_videos;
		this.banner_background_color = payload.banner_background_color;
		this.banner_background_image = payload.banner_background_image;
		this.banner_img = payload.banner_img;
		this.banner_size = payload.banner_size;
		this.can_assign_link_flair = payload.can_assign_link_flair;
		this.can_assign_user_flair = payload.can_assign_user_flair;
		this.collapse_deleted_comments = payload.collapse_deleted_comments;
		this.comment_score_hide_mins = payload.comment_score_hide_mins;
		this.community_icon = payload.community_icon;
		this.community_reviewed = payload.community_reviewed;
		this.created = payload.created;
		this.created_utc = payload.created_utc;
		this.description = payload.description;
		this.description_html = payload.description_html;
		this.disable_contributor_requests =
			payload.disable_contributor_requests;
		this.display_name = payload.display_name;
		this.display_name_prefixed = payload.display_name_prefixed;
		this.emojis_custom_size = payload.emojis_custom_size;
		this.emojis_enabled = payload.emojis_enabled;
		this.free_form_reports = payload.free_form_reports;
		this.has_menu_widget = payload.has_menu_widget;
		this.header_img = payload.header_img;
		this.header_size = payload.header_size;
		this.header_title = payload.header_title;
		this.hide_ads = payload.hide_ads;
		this.icon_img = payload.icon_img;
		this.icon_size = payload.icon_size;
		this.id = payload.id;
		this.is_crosspostable_subreddit = payload.is_crosspostable_subreddit;
		this.is_enrolled_in_new_modmail = payload.is_enrolled_in_new_modmail;
		this.key_color = payload.key_color;
		this.lang = payload.lang;
		this.link_flair_enabled = payload.link_flair_enabled;
		this.link_flair_position = payload.link_flair_position;
		this.mobile_banner_image = payload.mobile_banner_image;
		this.name = payload.name;
		this.notification_level = payload.notification_level;
		this.original_content_tag_enabled =
			payload.original_content_tag_enabled;
		this.over18 = payload.over18;
		this.prediction_leaderboard_entry_type =
			payload.prediction_leaderboard_entry_type;
		this.primary_color = payload.primary_color;
		this.public_description = payload.public_description;
		this.public_description_html = payload.public_description_html;
		this.public_traffic = payload.public_traffic;
		this.quarantine = payload.quarantine;
		this.restrict_commenting = payload.restrict_commenting;
		this.restrict_posting = payload.restrict_posting;
		this.should_archive_posts = payload.should_archive_posts;
		this.show_media = payload.show_media;
		this.show_media_preview = payload.show_media_preview;
		this.spoilers_enabled = payload.spoilers_enabled;
		this.submission_type = payload.submission_type;
		this.submit_link_label = payload.submit_link_label;
		this.submit_text = payload.submit_text;
		this.submit_text_html = payload.submit_text_html;
		this.submit_text_label = payload.submit_text_label;
		this.subreddit_type = payload.subreddit_type;
		this.subscribers = payload.subscribers;
		this.suggested_comment_sort = payload.suggested_comment_sort;
		this.title = payload.title;
		this.url = payload.url;
		this.user_can_flair_in_sr = payload.user_can_flair_in_sr;
		this.user_flair_background_color = payload.user_flair_background_color;
		this.user_flair_css_class = payload.user_flair_css_class;
		this.user_flair_enabled_in_sr = payload.user_flair_enabled_in_sr;
		this.user_flair_position = payload.user_flair_position;
		this.user_flair_richtext = payload.user_flair_richtext;
		this.user_flair_template_id = payload.user_flair_template_id;
		this.user_flair_text = payload.user_flair_text;
		this.user_flair_text_color = payload.user_flair_text_color;
		this.user_flair_type = payload.user_flair_type;
		this.user_has_favorited = payload.user_has_favorited;
		this.user_is_banned = payload.user_is_banned;
		this.user_is_contributor = payload.user_is_contributor;
		this.user_is_moderator = payload.user_is_moderator;
		this.user_is_muted = payload.user_is_muted;
		this.user_is_subscriber = payload.user_is_subscriber;
		this.user_sr_flair_enabled = payload.user_sr_flair_enabled;
		this.user_sr_theme_enabled = payload.user_sr_theme_enabled;
		this.whitelist_status = payload.whitelist_status;
		this.wiki_enabled = payload.wiki_enabled;
		this.wls = payload.wls;

		return this;
	}

	public async acceptModeratorInvite(): Promise<this>{
		const res = await this.post({
			url: `r/${this.display_name}/api/accept_moderator_invite`,
			form: {api_type}
		});
		handleJsonErrors(res);
		return this;
	}
	
	public async addContributor(name: string): Promise<this>{
		return this.#friend({name, type: 'contributor'});
	}

	public async addWikiContributor(name: string): Promise<this>{
		return this.#friend({name, type: 'wikicontributor'});
	}

	public async banUser(options: BanOptions): Promise<this>{
		return this.#friend({
			name: options.name, 
			ban_message: options.banMessage,
			ban_reason: options.banReason,
			duration: options.duration,
			note: options.banNote,
			type: 'banned'
		});
	}
	public async configureFlair(options: FlairConfig): Promise<this>{
		await this.post({url: `r/${this.display_name}/api/flairconfig`, form: {
			api_type,
			flair_enabled: options.userFlairEnabled,
			flair_position: options.userFlairPosition,
			flair_self_assign_enabled: options.userFlairSelfAssignEnabled,
			link_flair_position: options.linkFlairPosition,
			link_flair_self_assign_enabled: options.linkFlairSelfAssignEnabled
		}});
		return this;
	}

	public async createLinkFlairTemplate(options: FlairParams): Promise<this>{
		return this.#createFlairTemplate({...options, flair_type: 'LINK_FLAIR'});
	}
	
	public async createUserFlairTemplate(options: FlairParams): Promise<this>{
		return this.#createFlairTemplate({...options, flair_type: 'USER_FLAIR'});
	}

	public async deleteAllLinkFlairTemplates(): Promise<this>{
		return this.#deleteFlairTemplates('LINK_FLAIR');
	}

	public async deleteAllUserFlairTemplates(): Promise<this>{
		return this.#deleteFlairTemplates('USER_FLAIR');
	}

	public async deleteBanner(): Promise<this>{
		const res = await this.post({url: `r/${this.display_name}/api/delete_sr_banner`, form: {api_type}});
		handleJsonErrors(res);
		return this;
	}

	public async deleteFlairTemplate(flair_template_id: string): Promise<this>{
		await this.post({
		  url: `r/${this.display_name}/api/deleteflairtemplate`,
		  form: {api_type, flair_template_id}
		});
		return this;
	  }

	public async deleteHeader(): Promise<this>{
		const res = await this.post({url: `r/${this.display_name}/api/delete_sr_header`, form: {api_type}});
		handleJsonErrors(res);
		return this;
	  }

	public async deleteIcon(): Promise<this>{
		const res = await this.post({url: `r/${this.display_name}/api/delete_sr_icon`, form: {api_type}});
		handleJsonErrors(res);
		return this;
	}

	public async deleteImage(img_name: string ): Promise<this>{
		const res = await this.post({
		  url: `r/${this.display_name}/api/delete_sr_img`,
		  form: {api_type, img_name}
		});
		handleJsonErrors(res);
		return this;
	}

	public async deleteUserFlair(name: string): Promise<this>{
		await this.post({url: `r/${this.display_name}/api/deleteflair`, form: {api_type, name}});
		return this;
	}

	public async editSettings(options: SubredditSettings): Promise<this>{
		const currentValues = await this.getSettings();
		const name = (await this.fetch()).name;
		/*await this.traw._createOrEditSubreddit({
		  ...renameKey(currentValues, 'subreddit_type', 'type'),
		  ...options,
		  sr: name
		});*/
		throw new NotImplemented();
		return this;
	}

	public async getBannedUsers(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<BannedUser>>{
		// Loadash.renameKey alternative:
		(<any>options).user = options?.name;
		delete options?.name;
		return this.traw.getListing({uri: `r/${this.display_name}/about/banned`, qs: options});
	}

	public async getContributors(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<Contributor>>{
		// Loadash.renameKey alternative:
		(<any>options).user = options?.name;
		delete options?.name;
		return this.traw.getListing({uri: `r/${this.display_name}/about/contributors`, qs: options});
	}

	public async getControversial(
		options?: SortedListingOptions
	): Promise<Listing<Submission>>{
		return this.traw.getControversial(this.display_name, options);
	}

	public async getEdited(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>> {
		return this.traw.getListing({uri: `r/${this.display_name}/about/edited`, qs: options});
	}

	public async getHot(options?: ListingOptions): Promise<Listing<Submission>>{
		return this.traw.getHot(this.display_name, options);
	}

	public async getLinkFlairTemplates(linkId?: string): Promise<FlairTemplate[]>{
		const options = linkId ? {link: linkId} : {is_newlink: true};
		const res = await this.#getFlairOptions(options);

		throw new NotImplemented();
		// @ts-ignore
		return res.choices;
	}

	public async getModerationLog(
		options?: ListingOptions & { mods?: string[]; type?: ModActionType }
	): Promise<Listing<ModAction>>{
		let parsedOptions: any = {...options};
		if ( options?.mods != undefined ){
			parsedOptions = {...options, mods: options!.mods!.join(',')}
			delete parsedOptions.mods;
		}
		return this.traw.getListing({uri: `r/${this.display_name}/about/log`, qs: parsedOptions});
	}

	public async getModerators(options?: ListingOptions & { name?: string }): Promise<RedditUser[]>{
		throw new NotImplemented();

		// @ts-ignore
		return this.get({url: `r/${this.display_name}/about/moderators`, params: {user: options.name}});
	}

	public async getModmail(options?: ListingOptions): Promise<Listing<PrivateMessage>> {
		return this.traw.getListing({uri: `r/${this.display_name}/about/message/moderator`, qs: options});
	}

	public async getNewModmailConversations(
		options?: ListingOptions
	): Promise<Listing<ModmailConversation>>{
		return this.traw.getNewModmailConversations({...options, entity: this.display_name});
	}

	public async getModqueue(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>{
		return this.traw.getListing({uri: `r/${this.display_name}/about/modqueue`, qs: options});
	}

	public async getMutedUsers(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<MutedUser>>{
		// Loadash.renameKey alternative:
		(<any>options).user = options?.name;
		delete options?.name;
		return this.traw.getListing({uri: `r/${this.display_name}/about/muted`, qs: options});
	}

	public async getMyFlair(): Promise<FlairTemplate>{
		throw new NotImplemented();

		// @ts-ignore
		return (await this.#getFlairOptions()).current;
	}

	public async getNew(options?: ListingOptions): Promise<Listing<Submission>> {
		return this.traw.getNew(this.display_name, options);
	}

	public async getNewComments(options?: ListingOptions): Promise<Listing<Comment>>{
		return this.traw.getNewComments(this.display_name, options);
	}

	public async getRandomSubmission(): Promise<Submission>{
		return this.traw.getRandomSubmission(this.display_name);
	}
	public async getRecommendedSubreddits(options?: {
		omit?: string[];
	}): Promise<Subreddit[]>{
		const toOmit = options?.omit && options.omit.join(',');
		const names = await this.get({url: `api/recommend/sr/${this.display_name}`, params: {omit: toOmit}});

		throw new NotImplemented();
		// @ts-ignore
		return map(names, 'sr_name');
	}
	
	public async getReports(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>{
		return this.traw.getListing({uri: `r/${this.display_name}/about/reports`, qs: options});
	}

	public async getRising(options?: ListingOptions): Promise<Listing<Submission>>{
		return this.traw.getRising(this.display_name, options);
	}

	public async getRules(): Promise<{ rules: Rule[]; site_rules: string[] }>{
		throw new NotImplemented();

		// @ts-ignore
		return this.get({url: `r/${this.display_name}/about/rules`});
	}

	public async getSettings(): Promise<SubredditSettings>{
		throw new NotImplemented();

		// @ts-ignore
		return this.get({url: `r/${this.display_name}/about/edit`});
	}

	public async getSpam(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>{
		return this.traw.getListing({uri: `r/${this.display_name}/about/spam`, qs: options});
	}

	public async getSticky(num?: number ): Promise<Submission>{
		throw new NotImplemented();

		// @ts-ignore
		return this.get({url: `r/${this.display_name}/about/sticky`, params: {num}});
	}

	public async getStylesheet(): Promise<string>{
		throw new NotImplemented();

		// @ts-ignore
		return this.get({url: `r/${this.display_name}/stylesheet`, json: false});
	}

	public async getSubmitText(): Promise<string> {
		const res = await this.get({url: `r/${this.display_name}/api/submit_text`});
		
		throw new NotImplemented();

		// @ts-ignore
		return res.submit_text;
	}

	public async getTop(
		options?: ListingOptions & { time?: Timespan }
	): Promise<Listing<Submission>>{
		return this.traw.getTop(this.display_name, options);
	}

	public async getUnmoderated(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>{
		return this.traw.getListing({uri: `r/${this.display_name}/about/unmoderated`, qs: options});
	}

	public async getUserFlair(name: string): Promise<FlairTemplate> {
		const res = await this.#getFlairOptions({name});
		throw new NotImplemented();

		// @ts-ignore
		return res.current;
	}

	public async getUserFlairList(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<UserFlair>>{
		return this.traw.getListing({uri: `r/${this.display_name}/api/flairlist`, qs: options, _transform: (response : any)=> {
		  /**
		   * For unknown reasons, responses from the api/flairlist endpoint are formatted differently than responses from all other
		   * Listing endpoints. Most Listing endpoints return an object with a `children` property containing the Listing's children,
		   * and `after` and `before` properties corresponding to the `after` and `before` querystring parameters that a client should
		   * use in the next request. However, the api/flairlist endpoint returns an object with a `users` property containing the
		   * Listing's children, and `next` and `prev` properties corresponding to the `after` and `before` querystring parameters. As
		   * far as I can tell, there's no actual reason for this difference. >_>
		   */
		  response.after = response.next || null;
		  response.before = response.prev || null;
		  response.children = response.users;
		  return new Listing<UserFlair>(response, this.traw);
		}});
	}

	public async getUserFlairTemplates(): Promise<FlairTemplate[]>{
		const res = await this.#getFlairOptions();
		throw new NotImplemented();

		// @ts-ignore
		return res.choices;
	}

	public async getWikiBannedUsers(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<BannedUser>>{
		// Loadash.renameKey alternative:
		(<any>options).user = options?.name;
		delete options?.name;
		return this.traw.getListing({uri: `r/${this.display_name}/about/wikibanned`, qs: options});
	}

	public async getWikiContributors(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<Contributor>>{
		// Loadash.renameKey alternative:
		(<any>options).user = options?.name;
		delete options?.name;
		return this.traw.getListing({uri: `r/${this.display_name}/about/wikicontributors`, qs: options});
	}

	public getWikiPage(title: string): WikiPage{
		return new WikiPage( {subreddit: this, title}, this.traw);
	}
	
	public async getWikiPages(): Promise<WikiPage[]>{
		const res = await this.get({url: `r/${this.display_name}/wiki/pages`});
		throw new NotImplemented();

		// @ts-ignore
		return res.map(title => this.getWikiPage(title));
	}

	public async getWikiRevisions(
		options?: ListingOptions
	): Promise<Listing<WikiPageRevision>>{
		return this.traw.getListing({uri: `r/${this.display_name}/wiki/revisions`, qs: options});
	}

	public async hideMyFlair(): Promise<this>{
		return this.#setMyFlairVisibility(false);
	}

	public async inviteModerator(
		name: string,
		permissions?: ModeratorPermission[]
	): Promise<this>{
		return this.#friend({name, permissions: formatModPermissions(permissions), type: 'moderator_invite'});
	}

	public async leaveContributor(): Promise<this>{
		const name = (await this.fetch()).name;
		const res = await this.post({url: 'api/leavecontributor', form: {id: name}});
		handleJsonErrors(res);
		return this;
	}

	public async leaveModerator(): Promise<this>{
		const name = (await this.fetch()).name;
		const res = await this.post({url: 'api/leavemoderator', form: {id: name}});
		handleJsonErrors(res);
		return this;
	}

	public async muteUser(name: string ): Promise<this>{
		return this.#friend({name, type: 'muted'});
	}

	public async removeContributor(name: string): Promise<this>{
		return this.#unfriend({name, type: 'contributor'});
	}

	public async removeModerator(name: string): Promise<this>{
		return this.#unfriend({name, type: 'moderator'});
	}
	
	public async removeWikiContributor(name: string): Promise<this> {
		return this.#unfriend({name, type: 'wikicontributor'});
	}

	public async revokeModeratorInvite(name: string): Promise<this>{
		return this.#unfriend({name, type: 'moderator_invite'});
	}

	public async search(options: BaseSearchOptions): Promise<Listing<Submission>>{
		return this.traw.search({...options, subreddit: this, restrictSr: true});
	}

	public async selectMyFlair(options: {
		flair_template_id: string;
		text?: string;
	}): Promise<this>{
		throw new NotImplemented();

		// @ts-ignore
		const name = await this.traw._getMyName();
		// @ts-ignore
		await this.traw._selectFlair({...options, subredditName: this.display_name, name});
		return this;
	}
	public async setModeratorPermissions(
		name: string,
		permissions: ModeratorPermission[]
	): Promise<this>{
		const res = await this.post({
		  url: `r/${this.display_name}/api/setpermissions`,
		  form: {api_type, name, permissions: formatModPermissions(permissions), type: 'moderator'}
		});
		handleJsonErrors(res);
		return this;
	}

	public async setMultipleUserFlairs(
		flairs: Array<{
			name: string;
			text: string;
			cssClass: string;
		}>
	): Promise<this>{
		throw new NotImplemented();
	}

	public async showMyFlair(): Promise<this>{
		return this.#setMyFlairVisibility(true);
	}

	public async submitLink(options: SubmitLinkOptions): Promise<Submission>{
		return this.traw.submitLink({...options, subredditName: this.display_name});
	}

	public async submitSelfpost(options: SubmitSelfPostOptions): Promise<Submission>{
		return this.traw.submitSelfpost({...options, subredditName: this.display_name});
	}

	public async subscribe(): Promise<this>{
		return this.#setSubscribed(true);
	}

	public async unbanUser(name: string): Promise<this>{
		return this.#unfriend({name, type: 'banned'});
	}

	public async unmuteUser(name: string): Promise<this>{
		return this.#unfriend({name, type: 'muted'});
	}
	
	public async unsubscribe(): Promise<this>{
		return this.#setSubscribed(false);
	}

	public async unwikibanUser( name: string ): Promise<this>{
		return this.#unfriend({name, type: 'wikibanned'});
	}

	public async updateStylesheet( css: string, reason?: string ): Promise<this>{
		const res = await this.post({
			url: `r/${this.display_name}/api/subreddit_stylesheet`,
			form: {api_type, op: 'save', reason, stylesheet_contents: css}
		});
		handleJsonErrors(res);
		return this;
	}

	public async uploadBannerImage(options: ImageUploadOptions): Promise<this> {
		return this.#uploadSrImg({file: options.file, imageType: options.imageType, upload_type: 'banner'});
	}

	public async uploadHeaderImage(options: ImageUploadOptions): Promise<this>{
		return this.#uploadSrImg({file: options.file, imageType: options.imageType, upload_type: 'header'});
	}

	public async uploadIcon(options: ImageUploadOptions): Promise<this>{
		return this.#uploadSrImg({file: options.file, imageType: options.imageType, upload_type: 'icon'});
	}

	public async uploadStylesheetImage(
		options: ImageUploadOptions & { name: string }
	): Promise<this>{
		return this.#uploadSrImg({file: options.file, imageType: options.imageType, upload_type: 'img'});
	}

	public async wikibanUser(name: string): Promise<this>{
		return this.#friend({name, type: 'wikibanned'});
	}

	/*
	 * Private declarations
	 */

	async #friend(options: any) : Promise<this>{
		const res = await this.post({
			url: `r/${this.display_name}/api/friend`,
			form: {...options, api_type}
		});
		handleJsonErrors(res);
		return this;
	}

	async #unfriend(options: any) : Promise<this>{
		const res = await this.post({
			url: `r/${this.display_name}/api/unfriend`,
			form: {...options, api_type}
		});
		handleJsonErrors(res);
		return this;
	}

	async #setSubscribed(status: boolean): Promise<this>{
		await this.post({
			url: 'api/subscribe',
			form: {
				action: status ? 'sub' : 'unsub',
				sr_name: this.display_name
			}
		})
		return this;
	}

	async #uploadSrImg({name, file, upload_type, imageType}:{
		name?: string, file: string | NodeJS.ReadableStream,
		imageType?: string, upload_type: string
	}){
		const parsedFile = typeof file === 'string' ? createReadStream(file) : file;
		const result = await this.post({
			url: `r/${this.display_name}/api/upload_sr_img`,
			formData: {name, upload_type, img_type: imageType, file: parsedFile}
		});
		handleJsonErrors(result);
		return this;
	}

	async #setMyFlairVisibility (flair_enabled: boolean) {
		await this.post({url: `r/${this.display_name}/api/setflairenabled`, form: {api_type, flair_enabled}});
		return this;
	}

	async #createFlairTemplate ({
		text, css_class, flair_type, text_editable = false} : {
			text: string, css_class?: string, flair_type: string, text_editable?: boolean
		}) {
		await this.post({
			url: `r/${this.display_name}/api/flairtemplate`,
			form: {api_type, text, css_class, flair_type, text_editable}
		});
		return this;
	}

	async #deleteFlairTemplates (flair_type: string) {
		await this.post({url: `r/${this.display_name}/api/clearflairtemplates`, form: {api_type, flair_type}});
		return this;
	}

	#getFlairOptions ({name, link, is_newlink}: {name?:string, link?:string, is_newlink?:boolean} = {}) { // TODO: Add shortcuts for this on RedditUser and Submission
		return this.post({url: `r/${this.display_name}/api/flairselector`, form: {name, link, is_newlink}});
	}
}

export type Sort =
	| "confidence"
	| "top"
	| "new"
	| "controversial"
	| "old"
	| "random"
	| "qa";

// this is per-flair
export interface FlairParams {
	text: string;
	css_class?: string;
	text_editable?: boolean;
}

// this is for the entire subreddit
export interface FlairConfig {
	userFlairEnabled: boolean;
	userFlairPosition: "left" | "right";
	userFlairSelfAssignEnabled: boolean;
	linkFlairPosition: "left" | "right";
	linkFlairSelfAssignEnabled: boolean;
}

export interface FlairTemplate {
	flair_css_class: string;
	flair_template_id: string;
	flair_text_editable: string;
	flair_position: string;
	flair_text: string;
}

export interface UserFlair {
	flair_css_class: string;
	user: string;
	flair_text: string;
}

export interface UserDetails {
	date: number;
	name: string;
	id: string;
}
export type BannedUser = UserDetails & { note: string };
export type MutedUser = UserDetails;
export type Contributor = UserDetails;

export type SubredditType =
	| "public"
	| "private"
	| "restricted"
	| "gold_restricted"
	| "gold_only"
	| "archived"
	| "employees_only";
export type LinkType = "any" | "link" | "self";

export type SpamLevel = "low" | "high" | "all";
export interface SubredditSettings {
	name: string;
	title: string;
	public_description: string;
	description: string;
	submit_text?: string;
	hide_ads?: boolean;
	lang?: string;
	type?: SubredditType;
	link_type?: LinkType;
	submit_link_label?: string;
	submit_text_label?: string;
	wikimode?: "modonly" | "anyone" | "disabled";
	wiki_edit_karma?: number;
	wiki_edit_age?: number;
	spam_links?: SpamLevel;
	spam_selfposts?: SpamLevel;
	spam_comments?: SpamLevel;
	over_18?: boolean;
	allow_top?: boolean;
	show_media?: boolean;
	exclude_banned_modqueue?: boolean;
	public_traffic?: boolean;
	collapse_deleted_comments?: boolean;
	suggested_comment_sort?: Sort; // TODO rename AvailableSorts?
	spoilers_enabled?: boolean;
	default_set?: boolean;
}

export interface ImageUploadOptions {
	file: string | NodeJS.ReadableStream;
	imageType?: string;
	name?: string
}

export interface Rule {
	kind: string;
	short_name: string;
	description: string;
	violation_reason: string;
	created_utc: string;
	priority: number;
	description_html: string;
}

export type ModeratorPermission =
	| "wiki"
	| "posts"
	| "access"
	| "mail"
	| "config"
	| "flair";

export interface BanOptions {
	name: string;
	banMessage?: string;
	banReason?: string;
	duration?: number;
	banNote?: string;
}

export type Timespan = "hour" | "day" | "week" | "month" | "year" | "all";

export type ModActionType =
	| "banuser"
	| "unbanuser"
	| "removelink"
	| "approvelink"
	| "removecomment"
	| "approvecomment"
	| "addmoderator"
	| "invitemoderator"
	| "uninvitemoderator"
	| "acceptmoderatorinvite"
	| "removemoderator"
	| "addcontributor"
	| "removecontributor"
	| "editsettings"
	| "editflair"
	| "distinguish"
	| "marknsfw"
	| "wikibanned"
	| "wikicontributor"
	| "wikiunbanned"
	| "wikipagelisted"
	| "removewikicontributor"
	| "wikirevise"
	| "wikipermlevel"
	| "ignorereports"
	| "unignorereports"
	| "setpermissions"
	| "setsuggestedsort"
	| "sticky"
	| "unsticky"
	| "setcontestmode"
	| "unsetcontestmode"
	| "lock"
	| "unlock"
	| "muteuser"
	| "unmuteuser"
	| "createrule"
	| "editrule"
	| "deleterule"
	| "spoiler"
	| "unspoiler";
