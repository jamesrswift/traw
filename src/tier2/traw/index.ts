import baseRequestor from "../../tier0/requestors/baseRequestor";
import RedditUser from "../objects/RedditUser";
import Subreddit, { Sort } from "../objects/subreddit";
import Comment from "../objects/Comment";
import PrivateMessage from "../objects/PrivateMessage";
import { addFullnamePrefix } from "./helpers";
import RedditOwnUser from "../objects/RedditUser/RedditOwnUser";
import { api_type } from "../../tier0/constants";

export default interface traw {
    _ownUserInfo?: RedditOwnUser;
}

export default class traw{

    constructor( protected requestor : baseRequestor ){
        
    }

    public get( options: any ){ return this.requestor.get(options) }
    public delete( options: any ){ return this.requestor.delete(options) }
    public head( options: any ){ return this.requestor.head(options) }
    public patch( options: any ){ return this.requestor.patch(options) }
    public post( options: any ){ return this.requestor.post(options) }
    public put( options: any ){ return this.requestor.put(options) }

    public getUser(name: string): RedditUser{
        return new RedditUser({ name: name.replace(/^\/?u\//, "") }, this)
    }

    public getComment( commentId: string, submissionId?: string, sort?: Sort){
        return new Comment({
            name: addFullnamePrefix(commentId, "t1_"),
            link_id: submissionId ? addFullnamePrefix(submissionId, "t3_") : undefined,
            _sort: sort
        }, this)
    }

    public getSubreddit(displayName: string): Subreddit{
        return new Subreddit({ display_name: displayName.replace(/^\/?r\//, "") }, this)
    }

    public getMessage(messageId: string): PrivateMessage {
        return new PrivateMessage({
            name: addFullnamePrefix(messageId, "t4_")
        }, this)
    }

    public getLivethread(threadId: string): LiveThread {
		return new LiveThread( {
			id: addFullnamePrefix(threadId, "LiveUpdateEvent_").slice(16),
		}, this);
	}

    public async getMe() : Promise<RedditOwnUser>{
        const result = await this.get({url: "api/v1/me" });
        this._ownUserInfo = new RedditOwnUser(<Partial<RedditOwnUser>>result, this, true);
        return this._ownUserInfo;
    }

    public async getMyName(): Promise<string> {
        return this._ownUserInfo 
            ? Promise.resolve<string>(this._ownUserInfo.name)
            : (await this.getMe()).name
    }

    public async getKarma() : Promise<
        { sr: Subreddit; comment_karma: number; link_karma: number }[]
    > {
        return this.get( {url: "api/v1/me/karma"})
    }

    // Needs return type definition!
    public async getPreferences() : Promise<any> {
        return this.get({ url: "api/v1/me/prefs" });
    }

    // Needs parameter and return type definition!
	public async updatePreferences(updatedPreferences: any): Promise<void> {
		await this.patch({
			url: "api/v1/me/prefs",
			data: updatedPreferences,
		});
        return;
	}

    public getMyTrophies(): Promise<Trophy[]> {
		return this.get({ url: "api/v1/me/trophies" });
	}

    public getFriends(): Promise<RedditUser[]> {
		return this.get({ url: "prefs/friends" });
	}

	public getBlockedUsers(): Promise<RedditUser[]> {
		return this.get({ url: "prefs/blocked" });
	}

    public checkCaptchaRequirement(): Promise<boolean> {
		return this.get({ url: "api/needs_captcha" });
	}

    public async getNewCaptchaIdentifier(): Promise<string> {
		const res = await this.post({
			url: "api/new_captcha",
			form: { api_type },
		});
		return res.json.data.iden;
	}

    

}