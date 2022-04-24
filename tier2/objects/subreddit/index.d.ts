/// <reference types="node" />
import { AxiosResponse } from "axios";
import RedditContent from "../../mixins/RedditContent";
import { RichTextFlair } from "../../mixins/VoteableContent";
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
    #private;
    get uri(): string;
    protected transformApiResponse(response: AxiosResponse<Subreddit, any>): Subreddit;
    acceptModeratorInvite(): Promise<this>;
    addContributor(name: string): Promise<this>;
    addWikiContributor(name: string): Promise<this>;
    banUser(options: BanOptions): Promise<this>;
}
export declare type Sort = "confidence" | "top" | "new" | "controversial" | "old" | "random" | "qa" | "live";
export interface FlairParams {
    text: string;
    cssClass: string;
    textEditable: boolean;
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
