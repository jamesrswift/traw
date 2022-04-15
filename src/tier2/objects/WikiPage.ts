import { AxiosResponse } from "axios";
import { NotImplemented } from "../../tier0/exceptions";
import RedditContent from "../mixins/RedditContent";
import Listing, { ListingOptions } from "./Listing";
import RedditUser from "./RedditUser";
import Submission from "./Submission";
import Subreddit from "./Subreddit";

export default interface WikiPage extends RedditContent<WikiPage>{
    content_html: string;
    content_md: string;
    may_revise: boolean;
    revision_by: RedditUser;
    revision_date: number;
    revision_id: string;
    reason: string;
    subreddit: Subreddit;
    title: string;
}

export default class WikiPage extends RedditContent<WikiPage>{

    public override get uri() : string {
        return `r/${this.subreddit.display_name}/wiki/${this.title}`;
    }

    protected override transformApiResponse(response: AxiosResponse<WikiPage, any>): WikiPage {

        const responseFormatted = <AxiosResponse<{
            kind: 'wikipage',
            data: Partial<WikiPage>
        }, any>><unknown>response

        this.content_md = responseFormatted.data.data.content_md!;
        this.may_revise = responseFormatted.data.data.may_revise!;
        this.reason = responseFormatted.data.data.reason!;
        this.revision_date = responseFormatted.data.data.revision_date!;
        this.revision_id = responseFormatted.data.data.revision_id!;
        this.content_html = responseFormatted.data.data.content_html!;

        // Handle user
        this.revision_by = new RedditUser( (<any> responseFormatted.data.data.revision_by!).data, this.traw );

        return this;
    }


    private async _modifyEditor (name: string, action: string) {
        return this.post({
            url: `r/${this.subreddit.display_name}/api/wiki/alloweditor/${action}`,
            form: {page: this.title, username: name}
        });
    }

    public async addEditor( name: string ): Promise<this> {
        await this._modifyEditor(name, 'add');
        return this;
    }
    
    public async edit(options: EditOptions): Promise<this> {
        await this.post({
            url: `r/${this.subreddit.display_name}/api/wiki/edit`,
            form: {content: options.text, page: this.title, previous: options.previousRevision, reason: options.reason}
        });
        return this;
    }

    public async editSettings(options: Settings): Promise<this>{
        await this.post({
            url: `r/${this.subreddit.display_name}/wiki/settings/${this.title}`,
            form: {listed: options.listed, permlevel: options.permissionLevel}
        });
        return this;
    }

    /*public async getDiscussions(options?: ListingOptions): Promise<Listing<Submission>> {
        return this.getListing({uri: `r/${this.subreddit.display_name}/wiki/discussions/${this.title}`, qs: options});
    }
    
    public async getRevisions(options?: ListingOptions): Promise<Listing<WikiPageRevision>>{
        return this.getListing({uri: `r/${this.subreddit.display_name}/wiki/revisions/${this.title}`, qs: options});
    }
    
    public async getSettings(): Promise<Settings>{
        return this.get({url: `r/${this.subreddit.display_name}/wiki/settings/${this.title}`});
    }*/

    public async hideRevision(id: string ): Promise<this> {
        await this.post({
            url: `r/${this.subreddit.display_name}/api/wiki/hide`,
            params: {page: this.title, revision: id}
        });
        return this;
    }

    public async removeEditor(name: string ): Promise<this>{
        await this._modifyEditor(name, 'del');
        return this;
    }

    public async revert( id: string): Promise<this>{
        await this.post({
            url: `r/${this.subreddit.display_name}/api/wiki/revert`,
            params: {page: this.title, revision: id}
        });
        return this;
    }
}

interface Settings {
    listed: boolean;
    permissionLevel: 0 | 1 | 2;
}
  
interface EditOptions {
    text: string;
    reason?: string;
    previousRevision?: string;
}
  
export interface WikiPageRevision {
    timestamp: number;
    reason: string;
    page: string;
    id: string;
    author: RedditUser;
}
