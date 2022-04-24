/// <reference types="node" />
import Comment from "./Comment";
import Listing, { ListingOptions, SortedListingOptions } from "./Listing";
import PrivateMessage from "./PrivateMessage";
import RedditContent from "../mixins/RedditContent";
import RedditUser from "./RedditUser";
import Submission from "./Submission";
import WikiPage, { WikiPageRevision } from "./WikiPage";
import { RichTextFlair } from "../mixins/VoteableContent";
import { AxiosResponse } from "axios";
import { BaseSearchOptions, SubmitLinkOptions, SubmitSelfPostOptions } from "../traw";
import ModmailConversation from "./ModmailConversation";
import { ModAction } from "./ModAction";
export default interface Subreddit extends RedditContent<Subreddit> {
    accept_followers: boolean;
    accounts_active_is_fuzzed: boolean;
    accounts_active: number;
    active_user_count: number;
    advertiser_category: string | null;
    all_original_content: boolean;
    allow_discovery: boolean;
    allow_galleries: boolean;
    allow_images: boolean;
    allow_polls: boolean;
    allow_prediction_contributors: boolean;
    allow_predictions_tournament: boolean;
    allow_predictions: boolean;
    allow_talks: boolean;
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
    community_reviewed: boolean;
    description_html: string;
    description: string;
    disable_contributor_requests: boolean;
    display_name_prefixed: string;
    display_name: string;
    emojis_custom_size: [number, number] | null;
    emojis_enabled: boolean;
    free_form_reports: boolean;
    has_menu_widget: boolean;
    header_img: string | null;
    header_size: [number, number] | null;
    header_title: string | null;
    hide_ads: boolean;
    icon_img: string;
    icon_size: [number, number] | null;
    is_crosspostable_subreddit: boolean;
    is_enrolled_in_new_modmail: boolean | null;
    key_color: string;
    lang: string;
    link_flair_enabled: boolean;
    link_flair_position: "" | "left" | "right";
    mobile_banner_image: string;
    notification_level: string | null /** Will be null if user is not subscribed to this subreddit */;
    original_content_tag_enabled: boolean;
    over18: boolean;
    prediction_leaderboard_entry_type: string;
    primary_color: string /** HEX color code */;
    public_description_html: string;
    public_description: string;
    public_traffic: boolean;
    quarantine: boolean;
    restrict_commenting: boolean;
    restrict_posting: boolean;
    should_archive_posts: boolean;
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
    user_flair_type: string;
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
    #private;
    get uri(): string;
    protected transformApiResponse(response: AxiosResponse<Subreddit, any>): Subreddit;
    acceptModeratorInvite(): Promise<this>;
    addContributor(name: string): Promise<this>;
    addWikiContributor(name: string): Promise<this>;
    banUser(options: BanOptions): Promise<this>;
    configureFlair(options: FlairConfig): Promise<this>;
    createLinkFlairTemplate(options: FlairParams): Promise<this>;
    createUserFlairTemplate(options: FlairParams): Promise<this>;
    deleteAllLinkFlairTemplates(): Promise<this>;
    deleteAllUserFlairTemplates(): Promise<this>;
    deleteBanner(): Promise<this>;
    deleteFlairTemplate(flair_template_id: string): Promise<this>;
    deleteHeader(): Promise<this>;
    deleteIcon(): Promise<this>;
    deleteImage(img_name: string): Promise<this>;
    deleteUserFlair(name: string): Promise<this>;
    editSettings(options: SubredditSettings): Promise<this>;
    getBannedUsers(options?: ListingOptions & {
        name?: string;
    }): Promise<Listing<BannedUser>>;
    getContributors(options?: ListingOptions & {
        name?: string;
    }): Promise<Listing<Contributor>>;
    getControversial(options?: SortedListingOptions): Promise<Listing<Submission>>;
    getEdited(options?: ListingOptions & {
        only?: "links" | "comments";
    }): Promise<Listing<Submission | Comment>>;
    getHot(options?: ListingOptions): Promise<Listing<Submission>>;
    getLinkFlairTemplates(linkId?: string): Promise<FlairTemplate[]>;
    getModerationLog(options?: ListingOptions & {
        mods?: string[];
        type?: ModActionType;
    }): Promise<Listing<ModAction>>;
    getModerators(options?: ListingOptions & {
        name?: string;
    }): Promise<RedditUser[]>;
    getModmail(options?: ListingOptions): Promise<Listing<PrivateMessage>>;
    getNewModmailConversations(options?: ListingOptions): Promise<Listing<ModmailConversation>>;
    getModqueue(options?: ListingOptions & {
        only?: "links" | "comments";
    }): Promise<Listing<Submission | Comment>>;
    getMutedUsers(options?: ListingOptions & {
        name?: string;
    }): Promise<Listing<MutedUser>>;
    getMyFlair(): Promise<FlairTemplate>;
    getNew(options?: ListingOptions): Promise<Listing<Submission>>;
    getNewComments(options?: ListingOptions): Promise<Listing<Comment>>;
    getRandomSubmission(): Promise<Submission>;
    getRecommendedSubreddits(options?: {
        omit?: string[];
    }): Promise<Subreddit[]>;
    getReports(options?: ListingOptions & {
        only?: "links" | "comments";
    }): Promise<Listing<Submission | Comment>>;
    getRising(options?: ListingOptions): Promise<Listing<Submission>>;
    getRules(): Promise<{
        rules: Rule[];
        site_rules: string[];
    }>;
    getSettings(): Promise<SubredditSettings>;
    getSpam(options?: ListingOptions & {
        only?: "links" | "comments";
    }): Promise<Listing<Submission | Comment>>;
    getSticky(num?: number): Promise<Submission>;
    getStylesheet(): Promise<string>;
    getSubmitText(): Promise<string>;
    getTop(options?: ListingOptions & {
        time?: Timespan;
    }): Promise<Listing<Submission>>;
    getUnmoderated(options?: ListingOptions & {
        only?: "links" | "comments";
    }): Promise<Listing<Submission | Comment>>;
    getUserFlair(name: string): Promise<FlairTemplate>;
    getUserFlairList(options?: ListingOptions & {
        name?: string;
    }): Promise<Listing<UserFlair>>;
    getUserFlairTemplates(): Promise<FlairTemplate[]>;
    getWikiBannedUsers(options?: ListingOptions & {
        name?: string;
    }): Promise<Listing<BannedUser>>;
    getWikiContributors(options?: ListingOptions & {
        name?: string;
    }): Promise<Listing<Contributor>>;
    getWikiPage(title: string): WikiPage;
    getWikiPages(): Promise<WikiPage[]>;
    getWikiRevisions(options?: ListingOptions): Promise<Listing<WikiPageRevision>>;
    hideMyFlair(): Promise<this>;
    inviteModerator(name: string, permissions?: ModeratorPermission[]): Promise<this>;
    leaveContributor(): Promise<this>;
    leaveModerator(): Promise<this>;
    muteUser(name: string): Promise<this>;
    removeContributor(name: string): Promise<this>;
    removeModerator(name: string): Promise<this>;
    removeWikiContributor(name: string): Promise<this>;
    revokeModeratorInvite(name: string): Promise<this>;
    search(options: BaseSearchOptions): Promise<Listing<Submission>>;
    selectMyFlair(options: {
        flair_template_id: string;
        text?: string;
    }): Promise<this>;
    setModeratorPermissions(name: string, permissions: ModeratorPermission[]): Promise<this>;
    setMultipleUserFlairs(flairs: Array<{
        name: string;
        text: string;
        cssClass: string;
    }>): Promise<this>;
    showMyFlair(): Promise<this>;
    submitLink(options: SubmitLinkOptions): Promise<Submission>;
    submitSelfpost(options: SubmitSelfPostOptions): Promise<Submission>;
    subscribe(): Promise<this>;
    unbanUser(name: string): Promise<this>;
    unmuteUser(name: string): Promise<this>;
    unsubscribe(): Promise<this>;
    unwikibanUser(name: string): Promise<this>;
    updateStylesheet(css: string, reason?: string): Promise<this>;
    uploadBannerImage(options: ImageUploadOptions): Promise<this>;
    uploadHeaderImage(options: ImageUploadOptions): Promise<this>;
    uploadIcon(options: ImageUploadOptions): Promise<this>;
    uploadStylesheetImage(options: ImageUploadOptions & {
        name: string;
    }): Promise<this>;
    wikibanUser(name: string): Promise<this>;
}
export declare type Sort = "confidence" | "top" | "new" | "controversial" | "old" | "random" | "qa";
export interface FlairParams {
    text: string;
    css_class?: string;
    text_editable?: boolean;
}
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
export declare type BannedUser = UserDetails & {
    note: string;
};
export declare type MutedUser = UserDetails;
export declare type Contributor = UserDetails;
export declare type SubredditType = "public" | "private" | "restricted" | "gold_restricted" | "gold_only" | "archived" | "employees_only";
export declare type LinkType = "any" | "link" | "self";
export declare type SpamLevel = "low" | "high" | "all";
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
    suggested_comment_sort?: Sort;
    spoilers_enabled?: boolean;
    default_set?: boolean;
}
export interface ImageUploadOptions {
    file: string | NodeJS.ReadableStream;
    imageType?: string;
    name?: string;
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
export declare type ModeratorPermission = "wiki" | "posts" | "access" | "mail" | "config" | "flair";
export interface BanOptions {
    name: string;
    banMessage?: string;
    banReason?: string;
    duration?: number;
    banNote?: string;
}
export declare type Timespan = "hour" | "day" | "week" | "month" | "year" | "all";
export declare type ModActionType = "banuser" | "unbanuser" | "removelink" | "approvelink" | "removecomment" | "approvecomment" | "addmoderator" | "invitemoderator" | "uninvitemoderator" | "acceptmoderatorinvite" | "removemoderator" | "addcontributor" | "removecontributor" | "editsettings" | "editflair" | "distinguish" | "marknsfw" | "wikibanned" | "wikicontributor" | "wikiunbanned" | "wikipagelisted" | "removewikicontributor" | "wikirevise" | "wikipermlevel" | "ignorereports" | "unignorereports" | "setpermissions" | "setsuggestedsort" | "sticky" | "unsticky" | "setcontestmode" | "unsetcontestmode" | "lock" | "unlock" | "muteuser" | "unmuteuser" | "createrule" | "editrule" | "deleterule" | "spoiler" | "unspoiler";
