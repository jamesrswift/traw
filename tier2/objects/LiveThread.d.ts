/// <reference types="node" />
import EventEmitter from "events";
import RedditContent from "../mixins/RedditContent";
import Listing, { ListingOptions } from "./Listing";
import RedditUser from "./RedditUser";
import Submission from "./Submission";
export default interface LiveThread extends RedditContent<LiveThread> {
    description_html: string;
    description: string;
    nsfw: boolean;
    resources_html: string;
    resources: string;
    state: string;
    stream: EventEmitter;
    title: string;
    viewer_count_fuzzed: number | null;
    viewer_count: number | null;
    websocket_url: string | null;
}
/**
 * @Category Reddit Objects
 */
export default class LiveThread extends RedditContent<LiveThread> {
    acceptContributorInvite(): Promise<this>;
    addUpdate(body: string): Promise<this>;
    closeStream(): Promise<void>;
    closeThread(): Promise<this>;
    deleteUpdate(options: {
        id: string;
    }): Promise<this>;
    editSettings(options: LiveThreadSettings): Promise<this>;
    getContributors(): Promise<RedditUser[]>;
    getDiscussions(options?: ListingOptions): Promise<Listing<Submission>>;
    getRecentUpdates(options?: ListingOptions): Promise<Listing<LiveUpdate>>;
    inviteContributor(options: {
        name: string;
        permissions: Permissions[];
    }): Promise<this>;
    leaveContributor(): Promise<this>;
    removeContributor(options: {
        name: string;
    }): Promise<this>;
    report(options: {
        reason: ReportReason;
    }): Promise<this>;
    revokeContributorInvite(options: {
        name: string;
    }): Promise<this>;
    setContributorPermissions(options: {
        name: string;
        permissions: Permissions[];
    }): Promise<this>;
    strikeUpdate(options: {
        id: string;
    }): Promise<this>;
}
export declare type Permissions = 'update' | 'edit' | 'manage';
export declare type ReportReason = 'spam' | 'vote-manipulation' | 'personal-information' | 'sexualizing-minors' | 'site-breaking';
export interface LiveThreadSettings {
    title: string;
    description?: string;
    resources?: string;
    nsfw?: boolean;
}
export interface LiveUpdate {
    body: string;
    name: string;
    embeds: Embed[];
    mobile_embeds: MobileEmbed[];
    author: RedditUser;
    created: number;
    created_utc: number;
    body_html: string;
    stricken: boolean;
    id: string;
}
export interface Embed {
    url: string;
    width: number;
    height: number;
}
export interface MobileEmbed extends Embed {
    provider_url: string;
    original_url: string;
    version: string;
    provider_name: string;
    type: string;
    thumbnail_url: string;
    thumbnail_height: number;
    thumbnail_width: number;
}
