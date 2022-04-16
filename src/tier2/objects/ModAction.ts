import RedditContent from "../mixins/RedditContent";
import Subreddit from "./Subreddit";

export interface ModAction extends RedditContent<ModAction> {
	target_body: string;
	mod_id36: string;
	created_utc: number;
	subreddit: Subreddit;
	target_title: string | null;
	target_permalink: string;
	subreddit_name_prefixed: string;
	details: string | null;
	action: string;
	target_author: string;
	target_fullname: string;
	sr_id36: string;
	id: string;
	mod: string;
	description: string | null;
}
