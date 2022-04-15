import EventEmitter from "events";
import { NotImplemented } from "../../tier0/exceptions";
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
  
export default class LiveThread extends RedditContent<LiveThread> {
    public async acceptContributorInvite(): Promise<this>{
        throw new NotImplemented()
    }
    
    public async addUpdate(body: string): Promise<this>{
        throw new NotImplemented()
    }
    
    public async closeStream(): Promise<void>{
        throw new NotImplemented()
    }
    
    public async closeThread(): Promise<this>{
        throw new NotImplemented()
    }
    
    public async deleteUpdate(options: { id: string; }): Promise<this>{
        throw new NotImplemented()
    }
    
    public async editSettings(options: LiveThreadSettings): Promise<this>{
        throw new NotImplemented()
    }
    
    public async getContributors(): Promise<RedditUser[]>{
        throw new NotImplemented()
    }
    
    public async getDiscussions(options?: ListingOptions): Promise<Listing<Submission>>{
        throw new NotImplemented()
    }
    
    public async getRecentUpdates(options?: ListingOptions): Promise<Listing<LiveUpdate>>{
        throw new NotImplemented()
    }
    
    public async inviteContributor(options: { name: string; permissions: Permissions[]}): Promise<this>{
        throw new NotImplemented()
    }
    
    public async leaveContributor(): Promise<this>{
        throw new NotImplemented()
    }
    
    public async removeContributor(options: { name: string; }): Promise<this>{
        throw new NotImplemented()
    }
    
    public async report(options: { reason: ReportReason; }): Promise<this>{
        throw new NotImplemented()
    }
    
    public async revokeContributorInvite(options: { name: string; }): Promise<this>{
        throw new NotImplemented()
    }
    
    public async setContributorPermissions(options: {
      name: string;
      permissions: Permissions[]
    }): Promise<this>{
        throw new NotImplemented()
    }
    
    public async strikeUpdate(options: { id: string; }): Promise<this>{
        throw new NotImplemented()
    }
    
}
  
type Permissions = 'update' | 'edit' | 'manage';
type ReportReason = 'spam' | 'vote-manipulation' | 'personal-information' | 'sexualizing-minors' | 'site-breaking';
  
export interface LiveThreadSettings {
    title: string;
    description?: string;
    resources?: string;
    nsfw?: boolean;
}
  
interface LiveUpdate {
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
  
interface Embed {
    url: string;
    width: number;
    height: number;
}
  
interface MobileEmbed extends Embed {
    provider_url: string;
    original_url: string;
    version: string;
    provider_name: string;
    type: string;
    thumbnail_url: string;
    thumbnail_height: number;
    thumbnail_width: number;
}
  