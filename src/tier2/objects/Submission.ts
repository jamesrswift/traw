import traw from "../traw"
import Comment from "./Comment"
import { FlairTemplate, Sort } from "./Subreddit";
import { AxiosResponse } from "axios";
import { api_type } from "../../tier0/constants";
import { addFullnamePrefix } from "../traw/helpers";
import { NotImplemented } from "../../tier0/exceptions";
import VoteableContent, { RichTextFlair } from "../mixins/VoteableContent";

export interface Media {
	oembed?: {
		/** The username of the uploader of the source media */
		author_name?: string;
		/** URL to the author's profile on the source website */
		author_url?: string;
		description?: string;
		height: number;
		html: string;
		/** Name of the source website, e.g. "gfycat", "YouTube" */
		provider_name: string;
		/** URL of the source website, e.g. "https://www.youtube.com" */
		provider_url: string;
		thumbnail_height: number;
		thumbnail_url: string;
		thumbnail_width: number;
		/** Name of the media on the content site, e.g. YouTube video title */
		title: string;
		type: "video" | "rich";
		version: string;
		width: number;
	};
	reddit_video?: {
		dash_url: string;
		duration: number;
		fallback_url: string;
		height: number;
		hls_url: string;
		is_gif: boolean;
		scrubber_media_url: string;
		transcoding_status: string;
	};
	type?: string;
}

export interface MediaEmbed {
	/** HTML string of the media, usually an iframe */
	content?: string;
	height?: number;
	scrolling?: boolean;
	width?: number;
}

export interface SecureMediaEmbed extends MediaEmbed {
	media_domain_url?: string;
}

export default interface Submission extends VoteableContent<Submission> {
	
	clicked: boolean;
	/*comments: Listing<Comment>;*/
	/** Categories for original content, e.g. "comics", "drawing_and_painting" */
	content_categories: string[] | null;
	contest_mode: boolean;
	domain: string;
	hidden: boolean;
	hide_score: boolean;
	is_crosspostable: boolean;
	is_meta: boolean;
	is_original_content: boolean;
	is_reddit_media_domain: boolean;
	is_robot_indexable: boolean;
	is_self: boolean;
	is_video: boolean;
	link_flair_background_color: string;
	link_flair_css_class: string | null;
	link_flair_richtext: RichTextFlair[];
	link_flair_template_id: string | null;
	link_flair_text: string | null;
	link_flair_text_color: "dark" | "light";
	link_flair_type: "text" | "richtext";
	media: Media | null;
	media_embed: MediaEmbed;
	media_only: boolean;
	num_comments: number;
	num_crossposts: number;
	over_18: boolean;
	parent_whitelist_status: string;
	pinned: boolean;
	previous_visits: number[];
	pwls: number;
	post_hint: string;
	preview: { enabled: boolean; images: ImagePreview[] };
	quarantine: boolean;
	removal_reason: string | null;
	removed_by_category: string | null;
	/** Same content as media, except HTTPS */
	secure_media: Media | null;
	secure_media_embed: SecureMediaEmbed;
	selftext: string;
	selftext_html: string | null;
	spam?: boolean;
	spoiler: boolean;
	subreddit_subscribers: number;
	suggested_sort: Sort | null;
	thumbnail: string;
	thumbnail_height?: number | null;
	thumbnail_width?: number | null;
	title: string;
	upvote_ratio: number;
	url: string;
	view_count: number | null;
	visited: boolean;
	whitelist_status: string;
	wls: number;
}

export default class Submission extends VoteableContent<Submission> {
	constructor(data: Partial<Submission>, traw: traw, _hasFetched: boolean) {
		super(data, traw, _hasFetched);
		/*this._callback = this._callback.bind(this);
		this._sort = this._sort || null;
		this._children = {};
		if (_hasFetched) {
			this.comments = this.comments || getEmptyRepliesListing(this);
		}*/
	}

    protected override transformApiResponse(response: AxiosResponse<Submission, any>): Submission {
        /*
        response._sort = this._sort;
		for (const id in response._children) {
			const child = response._children[id];
			child._sort = response._sort;
			child._cb = response._callback;
		}
		return response;
        */
        throw new NotImplemented()
    }

	/*_callback(child) {
		if (child instanceof Comment) {
			const parent = child.parent_id.startsWith("t1_")
				? this._children[child.parent_id.slice(3)]
				: this;
			if (parent) {
				const listing = parent.replies || parent.comments;
				const index = listing.findIndex((c) => c.id === child.id);
				if (index !== -1) {
					listing[index] = child;
				}
			}
			child._children[child.id] = child;
			this._callback({ _children: child._children });
		} else {
			for (const id in child._children) {
				child._children[id]._sort = this._sort;
				child._children[id]._cb = this._callback;
			}
			Object.assign(this._children, child._children);
		}
	}*/

	public override get uri() {
		return `comments/${this.name.slice(3)}${
			this._sort ? `?sort=${this._sort}` : ""
		}`;
	}

	public async _setContestModeEnabled(state: boolean) {
		await this.post({
			url: "api/set_contest_mode",
			form: { api_type, state, id: this.name },
		});
		return this;
	}

	public async _setStickied({
		state,
		num,
	}: {
		state?: boolean;
		num?: number;
	}) {
		await this.post({
			url: "api/set_subreddit_sticky",
			form: { api_type, state, num, id: this.name },
		});
		return this;
	}

	public async assignFlair(options: {
		text: string;
		css_class: string;
	}): Promise<this> {
		await this.fetch();
		await this.traw.assignFlair({
			...options,
			link: this.name,
			subreddit_name: this.subreddit.display_name,
		});
		return this;
	}

	public async disableContestMode(): Promise<this> {
		return this._setContestModeEnabled(false);
	}

	public async enableContestMode(): Promise<this> {
		return this._setContestModeEnabled(true);
	}

	public async fetchAll(options: any) {
		return this.fetchMore({ ...options, amount: Infinity });
	}

	public async fetchMore(options: any) {
		if (typeof options !== "number") {
			options.append = true;
		}
		const comments = await this.replies.fetchMore(options);
		/*this._callback({ _children: comments._children });*/
		this.replies = comments;
		return comments;
	}

	public async getComment(
		commentId: string,
		fetch: boolean = false
	): Promise<Comment> {
		let comment /*= this._children[commentId] || null;
		if (fetch) {
			comment*/ = new Comment( {
				name: addFullnamePrefix(commentId, "t1_"),
				link_id: this.name,
				_sort: this._sort,
				/*_cb: this._callback,*/
			}, this.traw);
		/*}*/
		return comment;
	}

	/*public async getDuplicates(
		options?: ListingOptions
	): Promise<Listing<Submission>> {
		return this.getListing({
			uri: `duplicates/${this.name.slice(3)}`,
			qs: options,
		});
	}*/

	public async getLinkFlairTemplates(): Promise<FlairTemplate[]> {
		await this.fetch();
		return this.subreddit.getLinkFlairTemplates(this.name);
	}

	/* @deprecated */
	/*public async getRelated(options?: ListingOptions): Promise<Submission> {
		const result = await this._getListing({
			uri: `related/${this.name.slice(3)}`,
			qs: options,
		});
		if (result.constructor._name === "Submission") {
			this._r.warn(
				"Submission#getRelated has been deprecated upstream, and will not work as expected."
			);
		}
		return result;
	}*/

	public async hide(): Promise<this> {
		await this.post({ url: "api/hide", form: { id: this.name } });
		return this;
	}

	public async lock(): Promise<this> {
		await this.post({ url: "api/lock", form: { id: this.name } });
		return this;
	}

	public async markAsRead(): Promise<this> {
		await this.post({
			url: "api/store_visits",
			form: { links: this.name },
		});
		return this;
	}

	public async markNsfw(): Promise<this> {
		await this.post({ url: "api/marknsfw", form: { id: this.name } });
		return this;
	}

	public async markSpoiler(): Promise<this> {
		await this.post({ url: "api/spoiler", form: { id: this.name } });
		return this;
	}

	public async selectFlair(options: {
		flair_template_id: string;
		text?: string;
	}): Promise<this> {
		await this.fetch();
		await this.traw.selectFlair({
			...options,
			link: this.name,
			subredditName: this.subreddit.display_name,
		});
		return this;
	}

	public async setSuggestedSort(sort: Sort): Promise<this> {
		await this.post({
			url: "api/set_suggested_sort",
			form: { api_type, id: this.name, sort },
		});
		return this;
	}

	public async sticky({ num }: { num?: number }): Promise<this> {
		await this._setStickied({ state: true, num });
		return this;
	}

	public async unhide(): Promise<this> {
		await this.post({ url: "api/unhide", form: { id: this.name } });
		return this;
	}

	public async unlock(): Promise<this> {
		await this.post({ url: "api/unlock", form: { id: this.name } });
		return this;
	}

	public async unmarkNsfw(): Promise<this> {
		await this.post({ url: "api/unmarknsfw", form: { id: this.name } });
		return this;
	}

	public async unmarkSpoiler(): Promise<this> {
		await this.post({ url: "api/unspoiler", form: { id: this.name } });
		return this;
	}

	public async unsticky(): Promise<this> {
		await this._setStickied({ state: false });
		return this;
	}

	public async submitCrosspost(options: any): Promise<this> {
		await this.traw.submitCrosspost({ ...options, originalPost: this });
		return this;
	}
}

export interface ImagePreviewSource {
	url: string;
	width: number;
	height: number;
}

export interface ImagePreview {
	source: ImagePreviewSource;
	resolutions: ImagePreviewSource[];
	variants: any; // ?
	id: string;
}


import Listing from "./Listing";
