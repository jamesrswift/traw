import RedditContent from "../mixins/RedditContent";
import traw from "../traw";
import RedditUser from "./RedditUser";
export interface BanStatus {
    endDate?: string | null;
    reason: string;
    isBanned: boolean;
    isPermanent: boolean;
}
export interface RecentPost {
    date: string;
    permalink: string;
    title: string;
}
export interface RecentConvo {
    date: string;
    permalink: string;
    id: string;
    subject: string;
}
export interface RecentComment {
    date: string;
    permalink: string;
    title: string;
    comment: string;
}
export default interface ModmailConversationAuthor extends RedditContent<ModmailConversationAuthor> {
    name: string;
    isMod?: boolean;
    isAdmin?: boolean;
    isOp?: boolean;
    isParticipant?: boolean;
    isHidden?: boolean;
    isDeleted?: boolean;
    banStatus?: BanStatus;
    isSuspended?: boolean;
    isShadowBanned?: boolean;
    recentPosts?: {
        [id: string]: RecentPost;
    };
    recentConvos?: {
        [id: string]: RecentConvo;
    };
    recentComments?: {
        [id: string]: RecentComment;
    };
}
export default class ModmailConversationAuthor extends RedditContent<ModmailConversationAuthor> {
    constructor(options: any, traw: traw, hasFetched: boolean);
    /**
     * @summary Gets information on a Reddit user for the given modmail.
     * @returns {RedditUser} An unfetched RedditUser object for the requested user
     * @example
     *
     * r.getNewModmailConversation('efy3lax').getParticipant().getUser()
     * // => RedditUser { name: 'not_an_aardvark' }
     * r.getNewModmailConversation('efy3lax').getParticipant().getUser().link_karma.then(console.log)
     * // => 6
     */
    getUser(): Promise<RedditUser>;
}
