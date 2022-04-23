import { AxiosResponse } from "axios";
import { NotImplemented } from "../../tier0/exceptions";
import ReplyableContent from "../mixins/ReplyableContent";
import Listing from "./Listing";
import RedditUser from "./RedditUser";
import Subreddit from "./Subreddit";

export default interface PrivateMessage
extends ReplyableContent<PrivateMessage> {
	author?: RedditUser;
	author_fullname?: string
	associated_awarding_id: null; // No idea what the typing of this is when used correctly
	body_html: string;
	body: string;
	context: string;
	dest: string;
	distinguished: string | null;
	first_message_name: string | null;
	first_message: number | null;
	likes: any; // ?
	new: boolean;
	num_comments: number;
	parent_id: string;
	replies: Listing<PrivateMessage>; // Technically a string in the API
	score: number;
	subject: string;
	subreddit_name_prefixed: string;
	subreddit: Subreddit; // Technically a string in the API
	type?: string;
	was_comment: boolean;
}

/**
 * @Category Reddit Objects
 */
export default class PrivateMessage
extends ReplyableContent<PrivateMessage> {
    override get uri() {
		return `message/messages/${this.name.slice(3)}`;
	}

    protected override transformApiResponse(response: AxiosResponse<PrivateMessage, any>): PrivateMessage {

		const responseFormatted = (<unknown>response) as AxiosResponse< {
			kind: 'Listing',
			data: {
				after: null,
				dist: null,
				modhash: null,
				geo_filter: string,
				children: {
					kind: 't4',
					data: Partial<PrivateMessage>
				}[],
				before: null
			}
		}, any>

		// First order of business, retrieve the message contents:
		const message = responseFormatted.data.data.children[0]!.data;

		// Merge (manually) values into class
		this.first_message = message.first_message ?? null;
		this.first_message_name = message.first_message_name ?? null;
		/*this.subreddit = new Subreddit( { display_name: message.subreddit_name_prefixed!.replace(/^\/?r\//, "") }, this.traw );*/
		this.likes = message.likes;
		/* this.replies (tricky) */
		this.author_fullname = message.author_fullname
		this.id = message.id!;
		this.subject = message.subject!;
		this.associated_awarding_id = message.associated_awarding_id!;
		this.score = message.score!;
		/* this.author (tricky) */
		this.num_comments = message.num_comments!;
		this.parent_id = message.parent_id!;
		this.subreddit_name_prefixed = message.subreddit_name_prefixed!;
		this.new = message.new!;
		this.type = message.type!;
		this.body = message.body!;
		this.dest = message.dest!;
		this.was_comment = message.was_comment!;
		this.body_html = message.body_html!;
		this.name = message.name!;
		this.created = message.created!;
		this.created_utc = message.created_utc!;
		this.context = message.context!;
		this.distinguished = message.distinguished!;

		return this;
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