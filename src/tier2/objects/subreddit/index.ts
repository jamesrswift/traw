import { AxiosResponse } from "axios";
import { api_type } from "../../../tier0/constants";
import RedditContent from "../../mixins/RedditContent";
import { RichTextFlair } from "../../mixins/VoteableContent";
import { handleJsonErrors } from "../../traw/helpers";
import Listing, { ListingOptions } from "../Listing";
import RedditUser from "../RedditUser";

export default interface Subreddit extends RedditContent<Subreddit> {
	accounts_active_is_fuzzed: boolean;
	accounts_active: number;
	active_user_count: number;
	advertiser_category: string | null;
	all_original_content: boolean;
	allow_discovery: boolean;
	allow_images: boolean;
	allow_videogifs: boolean;
	allow_videos: boolean;
	/** HEX color code */
	banner_background_color: string;
	/** URL of the banner image used on desktop Reddit */
	banner_background_image: string;
	/** URL of the banner image used on the mobile Reddit app */
	banner_img: string;
	banner_size: [number, number] | null;
	can_assign_link_flair: boolean;
	can_assign_user_flair: boolean;
	collapse_deleted_comments: boolean;
	comment_score_hide_mins: number;
	/** Image URL of the subreddit icon */
	community_icon: string;
	description_html: string;
	description: string;
	display_name: string;
	display_name_prefixed: string;
	emojis_custom_size: [number, number] | null;
	emojis_enabled: boolean;
	has_menu_widget: boolean;
	header_img: string | null;
	header_size: [number, number] | null;
	header_title: string | null;
	hide_ads: boolean;
	icon_img: string;
	icon_size: [number, number] | null;
	is_enrolled_in_new_modmail: boolean | null;
	key_color: string;
	lang: string;
	link_flair_enabled: boolean;
	link_flair_position: "" | "left" | "right";
	/** Will be null if user is not subscribed to this subreddit */
	notification_level: string | null;
	over18: boolean;
	/** HEX color code */
	primary_color: string;
	public_description_html: string;
	public_description: string;
	public_traffic: boolean;
	quarantine: boolean;
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
	user_flair_text: string | null;
	user_flair_text_color: "dark" | "light" | null;
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

    override get uri() {
		return `r/${this.display_name}/about`;
	}

    protected override transformApiResponse(response: AxiosResponse<Subreddit, any>): Subreddit {
        return response.data
    }

    public async acceptModeratorInvite(): Promise<this>{
		const res = await this.post({
			url: `r/${this.display_name}/api/accept_moderator_invite`,
			form: { api_type },
		});
		handleJsonErrors(res);
		return this;
	}

	public async addContributor( name: string ): Promise<this>{
		return this.#friend( name, "contributor" );
	}

	public async addWikiContributor( name: string ): Promise<this>{
		return this.#friend( name, "wikicontributor" );
	}

    public async banUser(options: BanOptions): Promise<this>{
		return this
	}

	async #friend( x: string, y: string ): Promise<this>{
		return this
	}


    /*public async configureFlair(options: FlairConfig): Promise<this>;
    public async createLinkFlairTemplate(options: FlairParams): Promise<this>;
    public async createUserFlairTemplate(options: FlairParams): Promise<this>;
    public async deleteAllLinkFlairTemplates(): Promise<this>;
    public async deleteAllUserFlairTemplates(): Promise<this>;
    public async deleteBanner(): Promise<this>;
    public async deleteFlairTemplate(options: { flair_template_id: string; }): Promise<this>;
    public async deleteHeader(): Promise<this>;
    public async deleteIcon(): Promise<this>;
    public async deleteImage(options: { imageName: string; }): Promise<this>;
    public async deleteUserFlair(name: string): Promise<this>;
    public async editSettings(options: SubredditSettings): Promise<this>;
    public async getBannedUsers(options?: ListingOptions & { name?: string }): Promise<Listing<BannedUser>>;
    public async getContributors(options?: ListingOptions & { name?: string }): Promise<Listing<Contributor>>;
    public async getControversial(options?: ListingOptions & { time?: string }): Promise<Listing<Submission>>;
    public async getEdited(options?: ListingOptions & { only?: 'links' | 'comments' }): Promise<Listing<Submission | Comment>>;
    public async getHot(options?: ListingOptions): Promise<Listing<Submission>>;
    public async getLinkFlairTemplates(linkId?: string): Promise<FlairTemplate[]>;
    public async getModerationLog(opts?: ListingOptions & { mods?: string[]; type?: ModActionType}): Promise<Listing<ModAction>>;
    public async getModerators(options?: ListingOptions & { name?: string }): Promise<RedditUser[]>;
    public async getModmail(options?: ListingOptions): Promise<Listing<PrivateMessage>>;
    public async getNewModmailConversations(options?: ListingOptions): Promise<Listing<ModmailConversation>>;
    public async getModqueue(options?: ListingOptions & { only?: 'links' | 'comments' }): Promise<Listing<Submission | Comment>>;
    public async getMutedUsers(options?: ListingOptions & { name?: string }): Promise<Listing<MutedUser>>;
    public async getMyFlair(): Promise<FlairTemplate>;
    public async getNew(options?: ListingOptions): Promise<Listing<Submission>>;
    public async getNewComments(options?: ListingOptions): Promise<Listing<Comment>>;
    public async getRandomSubmission(): Promise<Submission>;
    public async getRecommendedSubreddits(options?: { omit?: string[]; }): Promise<Subreddit[]>;
    public async getReports(options?: ListingOptions & { only?: 'links' | 'comments' }): Promise<Listing<Submission | Comment>>;
    public async getRising(options?: ListingOptions): Promise<Listing<Submission>>;
    public async getRules(): Promise<{ rules: Rule[]; site_rules: string[] }>;
    public async getSettings(): Promise<SubredditSettings>;
    public async getSpam(options?: ListingOptions & { only?: 'links' | 'comments' }): Promise<Listing<Submission | Comment>>;
    public async getSticky(options?: { num?: number }): Promise<Submission>;
    public async getStylesheet(): Promise<string>;
    public async getSubmitText(): Promise<string>;
    public async getTop(options?: ListingOptions & { time?: Timespan }): Promise<Listing<Submission>>;
    public async getUnmoderated(options?: ListingOptions & { only?: 'links' | 'comments' }): Promise<Listing<Submission | Comment>>;
    public async getUserFlair(name: string): Promise<FlairTemplate>;
    public async getUserFlairList(options?: ListingOptions & { name?: string; }): Promise<Listing<UserFlair>>;
    public async getUserFlairTemplates(): Promise<FlairTemplate[]>;
    public async getWikiBannedUsers(options?: ListingOptions & { name?: string }): Promise<Listing<BannedUser>>;
    public async getWikiContributors(options?: ListingOptions & { name?: string }): Promise<Listing<Contributor>>;
    public async getWikiPage(name: string): WikiPage;
    public async getWikiPages(): Promise<WikiPage[]>;
    public async getWikiRevisions(options?: ListingOptions): Promise<Listing<WikiPageRevision>>;
    public async hideMyFlair(): Promise<this>;
    public async inviteModerator(options: { name: string; permissions?: ModeratorPermission[]; }): Promise<this>;
    public async leaveContributor(): Promise<this>;
    public async leaveModerator(): Promise<this>;
    public async muteUser(options: { name: string; }): Promise<this>;
    public async removeContributor(options: { name: string; }): Promise<this>;
    public async removeModerator(options: { name: string; }): Promise<this>;
    public async removeWikiContributor(options: { name: string; }): Promise<this>;
    public async revokeModeratorInvite(options: { name: string; }): Promise<this>;
    public async search(options: BaseSearchOptions): Promise<Listing<Submission>>;
    public async selectMyFlair(options: { flair_template_id: string; text?: string; }): Promise<this>;
    public async setModeratorPermissions(options: { name: string; permissions: ModeratorPermission; }): Promise<this>;
    public async setMultipleUserFlairs(flairs: Array<{
        name: string;
        text: string;
        cssClass: string;
    }>): Promise<this>;
    public async showMyFlair(): Promise<this>;
    public async submitLink(options: SubmitLinkOptions): Promise<Submission>;
    public async submitSelfpost(options: SubmitSelfPostOptions): Promise<Submission>;
    public async subscribe(): Promise<this>;
    public async unbanUser(options: { name: string; }): Promise<this>;
    public async unmuteUser(options: { name: string; }): Promise<this>;
    public async unsubscribe(): Promise<this>;
    public async unwikibanUser(options: { name: string; }): Promise<this>;
    public async updateStylesheet(options: { css: string; reason?: string; }): Promise<this>;
    public async uploadBannerImage(options: ImageUploadOptions): Promise<this>;
    public async uploadHeaderImage(options: ImageUploadOptions): Promise<this>;
    public async uploadIcon(options: ImageUploadOptions): Promise<this>;
    public async uploadStylesheetImage(options: ImageUploadOptions & { name: string; }): Promise<this>;
    public async wikibanUser(options: { name: string; }): Promise<this>;*/

}

export type Sort =
	| "confidence"
	| "top"
	| "new"
	| "controversial"
	| "old"
	| "random"
	| "qa"
	| "live"

// this is per-flair
export interface FlairParams {
	text: string;
	cssClass: string;
	textEditable: boolean;
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



