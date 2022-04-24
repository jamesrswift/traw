import Subreddit from "./Subreddit";
import RedditContent from "../mixins/RedditContent";
import RedditUser from "./RedditUser";
import ModmailConversationAuthor from "./ModmailConversationAuthor";
export declare enum conversationStates {
    New = 0,
    InProgress = 1,
    Archived = 2
}
export declare enum modActionStates {
    Highlight = 0,
    UnHighlight = 1,
    Archive = 2,
    UnArchive = 3,
    ReportedToAdmins = 4,
    Mute = 5,
    Unmute = 6
}
export interface ModmailMessage {
    body: string;
    bodyMarkdown: string;
    author: RedditUser;
    isInternal: boolean;
    date: string;
    id: string;
}
export interface Author {
    isMod: boolean;
    isAdmin: boolean;
    name: string;
    isOp: boolean;
    isParticipant: boolean;
    isHidden: boolean;
    id: any;
    isDeleted: boolean;
}
export interface Owner {
    displayName: string;
    type: string;
    id: string;
}
export interface ObjId {
    id: string;
    key: string;
}
export default interface ModmailConversation extends RedditContent<ModmailConversation> {
    isAuto: boolean;
    objIds: ObjId[];
    isRepliable: boolean;
    lastUserUpdate?: any;
    isInternal: boolean;
    lastModUpdate: Date;
    lastUpdated: Date;
    authors: Author[];
    owner: Owner | Subreddit;
    id: string;
    isHighlighted: boolean;
    subject: string;
    participant: ModmailConversationAuthor;
    state: number;
    lastUnread?: any;
    numMessages: number;
    messages?: ModmailMessage[];
}
/**
 * @Category Reddit Objects
 */
export default class ModmailConversation extends RedditContent<ModmailConversation> {
    static conversationStates: conversationStates;
    static modActionStats: modActionStates;
    get name(): string;
    reply(body: string, isAuthorHidden?: boolean, isInternal?: boolean): Promise<this>;
    getParticipant(): Promise<ModmailConversationAuthor>;
    isRead(): Promise<boolean>;
    read(): Promise<this>;
    unread(): Promise<this>;
    mute(): Promise<this>;
    unmute(): Promise<this>;
    highlight(): Promise<this>;
    unhighlight(): Promise<this>;
    archive(): Promise<this>;
    unarchive(): Promise<this>;
}
