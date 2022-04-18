import { api_type } from "../../tier0/constants";
import Listing from "../objects/Listing";
import RedditUser from "../objects/RedditUser";
import Subreddit from "../objects/Subreddit";
import { handleJsonErrors } from "../traw/helpers";
import ReplyableContent from "./ReplyableContent";

export interface RichTextFlair {
	/** The string representation of the emoji */
	a?: string;
	/** The type of the flair entry */
	e: "text" | "emoji";
	/** URL of the emoji image */
	u?: string;
	/** The text content of a text flair */
	t?: string;
}

export interface Gildings {
	/** Number of Reddit Silver awarded */
	gid_1: number;
	/** Number of Reddit Gold awarded */
	gid_2: number;
	/** Number of Reddit Platinum awarded */
	gid_3: number;
}

export type SubredditType =
	| "gold_restricted"
	| "archived"
	| "restricted"
	| "employees_only"
	| "gold_only"
	| "private"
	| "user"
	| "public";

export default interface VoteableContent<Type extends VoteableContent<Type>>
	extends ReplyableContent<Type> {
	approved?: boolean;
	approved_at_utc: number | null;
	approved_by: RedditUser | null;
	archived: boolean;
	author: RedditUser;
	author_flair_background_color: string | null;
	author_flair_css_class: string | null;
	author_flair_richtext: RichTextFlair[];
	author_flair_template_id: string | null;
	author_flair_text: string | null;
	author_flair_text_color: string | null;
	author_flair_type: "text" | "richtext";
	author_fullname: string;
	author_patreon_flair: boolean;
	banned_at_utc: number | null;
	banned_by: RedditUser | null;
	can_gild: boolean;
	can_mod_post: boolean;
	distinguished: "admin" | "moderator" | null;
	downs: number;
	edited: number | boolean;
	gilded: number;
	gildings: Gildings;
	locked: boolean;
	/** true = upvoted, false = downvoted, null = hasn't voted */
	likes: boolean | null;
	mod_note: string;
	/** The name of the user that added the mod_note */
	mod_reason_by: string;
	mod_reason_title: string;
	mod_reports: string[];
	no_follow: boolean;
	num_reports: number;
	permalink: string;
	removal_reason: any; // ?
	report_reasons: string[];
	saved: boolean;
	score: number;
	send_replies: boolean;
	stickied: boolean;
	subreddit: Subreddit;
	subreddit_id: string;
	subreddit_name_prefixed: string;
	subreddit_type: SubredditType;
	ups: number;
	user_reports: string[];
}

export default class VoteableContent<Type extends VoteableContent<Type>>
	extends ReplyableContent<Type> {
	public async _vote(direction: number): Promise<this> {
		await this.post({
			url: "api/vote",
			form: { dir: direction, id: this.name },
		});
		return this;
	}

	public async _setInboxRepliesEnabled(state: boolean) {
		return this.post({
			url: "api/sendreplies",
			form: { state, id: this.name },
		});
	}

	public async _mutateAndExpandReplies(limit: number, depth: number) {
		/*if (depth <= 0) {
			return this;
		}
		const repliesKey = this.constructor.name === "Submission" ? "comments" : "replies";
		const replies = await this[repliesKey].fetchMore({
			amount: limit - this[repliesKey].length,
		});
		this[repliesKey] = replies;
		replies.slice(0, limit).map((reply: Type) =>
			reply._mutateAndExpandReplies(limit, depth - 1)
		);*/
		return this;
	}

	public async delete(): Promise<this> {
		await this.post({ url: "api/del", form: { id: this.name } });
		return this;
	}

	public async disableInboxReplies(): Promise<this> {
		await this._setInboxRepliesEnabled(false);
		return this;
	}

	public async distinguish(
		options: { status?: boolean | string; sticky?: boolean } = {}
	): Promise<this> {
		await this.post({
			url: "api/distinguish",
			form: {
				api_type,
				how:
					options.status === true
						? "yes"
						: options.status === false
						? "no"
						: options.status,
				sticky: options.sticky,
				id: this.name,
			},
		});
		return this;
	}

	public async downvote(): Promise<this> {
		return this._vote(-1);
	}

	public async edit(updatedText: string): Promise<this> {
		const res = await this.post({
			url: "api/editusertext",
			form: { api_type, text: updatedText, thing_id: this.name },
		});
		handleJsonErrors(res);
		return this;
	}

	public async enableInboxReplies(): Promise<this> {
		await this._setInboxRepliesEnabled(true);
		return this;
	}

	public async expandReplies(limit?: number, depth?: number): Promise<Type> {
		await this.fetch();
		return this.clone(true)._mutateAndExpandReplies(limit ?? Infinity, depth ?? Infinity )
	}

	public async gild(): Promise<this> {
		await this.post({ url: `api/v1/gold/gild/${this.name}` });
		return this;
	}

	public async save(): Promise<this> {
		await this.post({ url: "api/save", form: { id: this.name } });
		return this;
	}

	public async undistinguish(): Promise<this> {
		return this.distinguish({ status: false, sticky: false });
	}

	public async unsave(): Promise<this> {
		await this.post({ url: "api/unsave", form: { id: this.name } });
		return this;
	}

	public async unvote(): Promise<this> {
		return this._vote(0);
	}

	public async upvote(): Promise<this> {
		return this._vote(1);
	}
}
