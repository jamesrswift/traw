import RedditContent from "../mixins/RedditContent";
import RedditUser from "./RedditUser";
import Subreddit from "./Subreddit";

export enum NoteType{
    NOTE = 'NOTE',
    APPROVAL = 'APPROVAL',
    REMOVAL = "REMOVAL", 
    BAN = "BAN", 
    MUTE = "MUTE", 
    INVITE = "INVITE", 
    SPAM = "SPAM", 
    CONTENT_CHANGE = "CONTENT_CHANGE", 
    MOD_ACTION = "MOD_ACTION", 
    ALL = "ALL"
}

export enum NoteLabel{
    BOT_BAN = "BOT_BAN", 
    PERMA_BAN = "PERMA_BAN", 
    BAN = "BAN", 
    ABUSE_WARNING = "ABUSE_WARNING", 
    SPAM_WARNING = "SPAM_WARNING", 
    SPAM_WATCH = "SPAM_WATCH", 
    SOLID_CONTRIBUTOR = "SOLID_CONTRIBUTOR", 
    HELPFUL_USER = "HELPFUL_USER"
}

export default interface Modnote extends RedditContent<Modnote>{
    label: NoteLabel;
    note: string;
    reddit_id: string; // Fully prefixed RedditContent ID
    subreddit: Subreddit;
    user: RedditUser
}

export default class Modnote extends RedditContent<Modnote>{
    public override get uri() : string {
        return `api/mod/notes?note_id=${this.id}`
    }
}