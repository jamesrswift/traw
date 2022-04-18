import { api_type } from "../../tier0/constants";
import { NotImplemented } from "../../tier0/exceptions";

import { Sort } from "../objects/Subreddit";
import RedditContent from "./RedditContent";

export default interface ReplyableContent<
Type extends ReplyableContent<Type>
> extends RedditContent<Type> {
	_sort: Sort
	replies: Listing<Comment | PrivateMessage>;
}

export default class ReplyableContent<
	Type extends ReplyableContent<Type>
> extends RedditContent<Type> {
	public async approve(): Promise<this> {
		await this.post({ url: "api/approve", form: { id: this.name } });
		return this;
	}

	public async blockAuthor(): Promise<this> {
		await this.post({ url: "api/block", form: { id: this.name } });
		return this;
	}

	public async ignoreReports(): Promise<this> {
		await this.post({ url: "api/ignore_reports", form: { id: this.name } });
		return this;
	}

	public async remove(spam: boolean = false): Promise<this> {
		await this.post({
			url: "api/remove",
			form: { spam: spam, id: this.name },
		});
		return this;
	}

	public async reply<ReplyType extends ReplyableContent<ReplyType>>(
		text: string
	): Promise<ReplyType>;
	public async reply(text: string): Promise<ReplyableContent<Type>> {
		throw new NotImplemented();
	}

	public async report(reason?: string, other_reason?: string): Promise<this> {
		await this.post({
			url: "api/report",
			form: {
				api_type,
				reason: reason ?? "other",
				other_reason: other_reason,
				thing_id: this.name,
			},
		});
		return this;
	}

	public async unignoreReports(): Promise<this> {
		await this.post({
			url: "api/unignore_reports",
			form: { id: this.name },
		});
		return this;
	}
}


import { Listing } from "../objects";
import PrivateMessage from "../objects/PrivateMessage";
