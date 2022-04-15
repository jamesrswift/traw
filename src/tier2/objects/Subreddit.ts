
import Comment from "./Comment";
import Listing, { ListingOptions } from "./Listing";
import PrivateMessage from "./PrivateMessage";
import RedditContent from "../mixins/RedditContent";
import RedditUser from "./RedditUser";
import Submission from "./Submission";
import WikiPage, { WikiPageRevision } from "./WikiPage";
// import ModmailConversation from "./ModmailConversation";
import { RichTextFlair } from "../mixins/VoteableContent";
import { AxiosResponse } from "axios";

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
	banner_background_color: string; /** HEX color code */
	banner_background_image: string; /** URL of the banner image used on desktop Reddit */
	banner_img: string; /** URL of the banner image used on the mobile Reddit app */
	banner_size: [number, number] | null;
	can_assign_link_flair: boolean;
	can_assign_user_flair: boolean;
	collapse_deleted_comments: boolean;
	comment_score_hide_mins: number;
	community_icon: string;/** Image URL of the subreddit icon */
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
	notification_level: string | null;/** Will be null if user is not subscribed to this subreddit */
	original_content_tag_enabled: boolean; // Added 15/04/22
	over18: boolean;
	prediction_leaderboard_entry_type: string; // Added 15/04/22;  value : 'SUBREDDIT_HEADER' when tested
	primary_color: string;/** HEX color code */
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

export default class Subreddit extends RedditContent<Subreddit> {
	public override get uri(): string{
		return `r/${this.display_name}/about`;
	}

	protected override transformApiResponse(response: AxiosResponse<Subreddit, any>): Subreddit {

		const payload = (<AxiosResponse<{
			kind: 't5',
			data: Subreddit;
		}, any>><unknown>response).data.data;

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
		this.allow_prediction_contributors = payload.allow_prediction_contributors;
		this.allow_predictions = payload.allow_predictions;
		this.allow_predictions_tournament = payload.allow_predictions_tournament;
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
		this.disable_contributor_requests = payload.disable_contributor_requests;
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
		this.original_content_tag_enabled = payload.original_content_tag_enabled;
		this.over18 = payload.over18;
		this.prediction_leaderboard_entry_type = payload.prediction_leaderboard_entry_type;
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
	
	/*acceptModeratorInvite(): Promise<this>;
	addContributor(options: { name: string }): Promise<this>;
	addWikiContributor(options: { name: string }): Promise<this>;
	banUser(options: BanOptions): Promise<this>;
	configureFlair(options: FlairConfig): Promise<this>;
	createLinkFlairTemplate(options: FlairParams): Promise<this>;
	createUserFlairTemplate(options: FlairParams): Promise<this>;
	deleteAllLinkFlairTemplates(): Promise<this>;
	deleteAllUserFlairTemplates(): Promise<this>;
	deleteBanner(): Promise<this>;
	deleteFlairTemplate(options: { flair_template_id: string }): Promise<this>;
	deleteHeader(): Promise<this>;
	deleteIcon(): Promise<this>;
	deleteImage(options: { imageName: string }): Promise<this>;
	deleteUserFlair(name: string): Promise<this>;
	editSettings(options: SubredditSettings): Promise<this>;
	getBannedUsers(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<BannedUser>>;
	getContributors(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<Contributor>>;
	getControversial(
		options?: ListingOptions & { time?: string }
	): Promise<Listing<Submission>>;
	getEdited(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>;
	getHot(options?: ListingOptions): Promise<Listing<Submission>>;
	getLinkFlairTemplates(linkId?: string): Promise<FlairTemplate[]>;
	getModerationLog(
		opts?: ListingOptions & { mods?: string[]; type?: ModActionType }
	): Promise<Listing<ModAction>>;
	getModerators(options?: ListingOptions & { name?: string }): RedditUser[];
	getModmail(options?: ListingOptions): Promise<Listing<PrivateMessage>>;
	getNewModmailConversations(
		options?: ListingOptions
	): Promise<Listing<ModmailConversation>>;
	getModqueue(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>;
	getMutedUsers(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<MutedUser>>;
	getMyFlair(): Promise<FlairTemplate>;
	getNew(options?: ListingOptions): Promise<Listing<Submission>>;
	getNewComments(options?: ListingOptions): Promise<Listing<Comment>>;
	getRandomSubmission(): Promise<Submission>;
	getRecommendedSubreddits(options?: {
		omit?: string[];
	}): Promise<Subreddit[]>;
	getReports(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>;
	getRising(options?: ListingOptions): Promise<Listing<Submission>>;
	getRules(): Promise<{ rules: Rule[]; site_rules: string[] }>;
	getSettings(): Promise<SubredditSettings>;
	getSpam(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>;
	getSticky(options?: { num?: number }): Promise<Submission>;
	getStylesheet(): Promise<string>;
	getSubmitText(): Promise<string>;
	getTop(
		options?: ListingOptions & { time?: Timespan }
	): Promise<Listing<Submission>>;
	getUnmoderated(
		options?: ListingOptions & { only?: "links" | "comments" }
	): Promise<Listing<Submission | Comment>>;
	getUserFlair(name: string): Promise<FlairTemplate>;
	getUserFlairList(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<UserFlair>>;
	getUserFlairTemplates(): Promise<FlairTemplate[]>;
	getWikiBannedUsers(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<BannedUser>>;
	getWikiContributors(
		options?: ListingOptions & { name?: string }
	): Promise<Listing<Contributor>>;
	getWikiPage(name: string): WikiPage;
	getWikiPages(): Promise<WikiPage[]>;
	getWikiRevisions(
		options?: ListingOptions
	): Promise<Listing<WikiPageRevision>>;
	hideMyFlair(): Promise<this>;
	inviteModerator(options: {
		name: string;
		permissions?: ModeratorPermission[];
	}): Promise<this>;
	leaveContributor(): Promise<this>;
	leaveModerator(): Promise<this>;
	muteUser(options: { name: string }): Promise<this>;
	removeContributor(options: { name: string }): Promise<this>;
	removeModerator(options: { name: string }): Promise<this>;
	removeWikiContributor(options: { name: string }): Promise<this>;
	revokeModeratorInvite(options: { name: string }): Promise<this>;
	search(options: BaseSearchOptions): Promise<Listing<Submission>>;
	selectMyFlair(options: {
		flair_template_id: string;
		text?: string;
	}): Promise<this>;
	setModeratorPermissions(options: {
		name: string;
		permissions: ModeratorPermission;
	}): Promise<this>;
	setMultipleUserFlairs(
		flairs: Array<{
			name: string;
			text: string;
			cssClass: string;
		}>
	): Promise<this>;
	showMyFlair(): Promise<this>;
	submitLink(options: SubmitLinkOptions): Promise<Submission>;
	submitSelfpost(options: SubmitSelfPostOptions): Promise<Submission>;
	subscribe(): Promise<this>;
	unbanUser(options: { name: string }): Promise<this>;
	unmuteUser(options: { name: string }): Promise<this>;
	unsubscribe(): Promise<this>;
	unwikibanUser(options: { name: string }): Promise<this>;
	updateStylesheet(options: { css: string; reason?: string }): Promise<this>;
	uploadBannerImage(options: ImageUploadOptions): Promise<this>;
	uploadHeaderImage(options: ImageUploadOptions): Promise<this>;
	uploadIcon(options: ImageUploadOptions): Promise<this>;
	uploadStylesheetImage(
		options: ImageUploadOptions & { name: string }
	): Promise<this>;
	wikibanUser(options: { name: string }): Promise<this>;*/
}

export type Sort = 'confidence' | 'top' | 'new' | 'controversial' | 'old' | 'random' | 'qa';

// this is per-flair
interface FlairParams {
	text: string;
	cssClass?: string;
	textEditable?: boolean;
}

// this is for the entire subreddit
interface FlairConfig {
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

interface UserFlair {
	flair_css_class: string;
	user: string;
	flair_text: string;
}

interface UserDetails {
	date: number;
	name: string;
	id: string;
}
type BannedUser = UserDetails & { note: string };
type MutedUser = UserDetails;
type Contributor = UserDetails;

type SubredditType =
	| "public"
	| "private"
	| "restricted"
	| "gold_restricted"
	| "gold_only"
	| "archived"
	| "employees_only";
type LinkType = "any" | "link" | "self";

type SpamLevel = "low" | "high" | "all";
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

interface ImageUploadOptions {
	file: string | NodeJS.ReadableStream;
	imageType?: string;
}

interface Rule {
	kind: string;
	short_name: string;
	description: string;
	violation_reason: string;
	created_utc: string;
	priority: number;
	description_html: string;
}

type ModeratorPermission =
	| "wiki"
	| "posts"
	| "access"
	| "mail"
	| "config"
	| "flair";

interface BanOptions {
	name: string;
	banMessage?: string;
	banReason?: string;
	duration?: number;
	banNote?: string;
}

type Timespan = "hour" | "day" | "week" | "month" | "year" | "all";

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
