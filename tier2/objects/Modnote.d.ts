import RedditContent from "../mixins/RedditContent";
export declare enum NoteType {
    NOTE = "NOTE",
    APPROVAL = "APPROVAL",
    REMOVAL = "REMOVAL",
    BAN = "BAN",
    MUTE = "MUTE",
    INVITE = "INVITE",
    SPAM = "SPAM",
    CONTENT_CHANGE = "CONTENT_CHANGE",
    MOD_ACTION = "MOD_ACTION",
    ALL = "ALL"
}
export declare enum NoteLabel {
    BOT_BAN = "BOT_BAN",
    PERMA_BAN = "PERMA_BAN",
    BAN = "BAN",
    ABUSE_WARNING = "ABUSE_WARNING",
    SPAM_WARNING = "SPAM_WARNING",
    SPAM_WATCH = "SPAM_WATCH",
    SOLID_CONTRIBUTOR = "SOLID_CONTRIBUTOR",
    HELPFUL_USER = "HELPFUL_USER"
}
export interface mod_action_data {
    action: null;
    /** @summary Reddit content ID of the linked comment, if present*/
    reddit_id?: string;
    details: null;
    description: null;
}
export interface user_note_data {
    /** @summary Raw text of the note */
    note: string;
    /** @summary Reddit content ID of the linked comment, if present*/
    reddit_id: string | null;
    /** @summary Label type, null if unset */
    label: NoteLabel | null;
}
export default interface Modnote extends RedditContent<Modnote> {
    /** @summary Prefixed subreddit ID on which the note was made */
    subreddit_id: string;
    /** @summary Display name (unprefixed) of the subreddit on which the note was made */
    subreddit: string;
    /** @summary Prefixed RedditUser ID that made the note */
    operator_id: string;
    /** @summary Display name (unprefixed) of the RedditUser that made the note */
    operator: string;
    /** @summary Prefixed RedditUser ID that is the object of the note */
    user_id: string;
    /** @summary Display name (unprefixed) of the RedditUser that is the object of the note */
    user: string;
    /** @summary  */
    mod_action_data: mod_action_data;
    /** @summary  */
    user_note_data: user_note_data;
    /** @summary Base64 encoded value? Looks like B64 encoded value of time note was created in ms since epoch	 */
    cursor: string;
    /** @summary  */
    type: NoteType;
}
export interface ModnoteResponse {
    mod_notes: Modnote[];
    start_cursor: string;
    end_cursor: string;
    has_next_page: false;
}
/**
 * @Category Reddit Objects
 */
export default class Modnote extends RedditContent<Modnote> {
    get uri(): string;
    delete(): Promise<void>;
}
