import { AxiosResponse } from "axios";
import { NotImplemented } from "../../tier0/exceptions";
import ReplyableContent from "../mixins/ReplyableContent";
import Listing from "./Listing";
import RedditUser from "./RedditUser";
import Subreddit from "./subreddit";

export default interface PrivateMessage
extends ReplyableContent<PrivateMessage> {
	author: RedditUser;
	body_html: string;
	body: string;
	context: string;
	dest: string;
	distinguished: string | null;
	first_message_name: string;
	first_message: number;
	likes: any; // ?
	new: boolean;
	num_comments: number;
	parent_id: string;
	replies: Listing<PrivateMessage>;
	score: number;
	subject: string;
	subreddit_name_prefixed: string;
	subreddit: Subreddit;
	was_comment: boolean;
}

export default class PrivateMessage
extends ReplyableContent<PrivateMessage> {
    override get uri() {
		return `message/messages/${this.name.slice(3)}`;
	}

    protected override async transformApiResponse(response: AxiosResponse<PrivateMessage, any>): PrivateMessage {
        throw new NotImplemented()
    }

    public async deleteFromInbox(): Promise<this> {
		await this.post({ url: "api/del_msg", form: { id: this.name } });
		return this;
	}

	public async markAsRead(): Promise<this> {
		await this.traw.markMessagesAsRead([this]);
		return this;
	}

	public async markAsUnread(): Promise<this> {
		await this.traw.markMessagesAsUnread([this]);
		return this;
	}

	public async muteAuthor(): Promise<this> {
		await this.post({
			url: "api/mute_message_author",
			form: { id: this.name },
		});
		return this;
	}

	public async unmuteAuthor(): Promise<this> {
		await this.post({
			url: "api/unmute_message_author",
			form: { id: this.name },
		});
		return this;
	}
}