import { NotImplemented } from "../../tier0/exceptions";
import RedditContent from "../mixins/RedditContent";
import RedditUser from "./RedditUser";
import Subreddit from "./Subreddit";

export default interface MultiReddit extends RedditContent<MultiReddit> {
	can_edit: boolean;
	copied_from: string | null;
	curator: RedditUser;
	description_html: string;
	description_md: string;
	display_name: string;
	icon_name: MultiRedditIcon;
	icon_url: string | null;
	key_color: string;
	path: string;
	subreddits: Subreddit[];
	visibility: MultiRedditVisibility;
	weighting_schema: MultiRedditWeightingSchema;
}

export default class MultiReddit extends RedditContent<MultiReddit> {
	public async addSubreddit(sub: Subreddit | string): Promise<this> {
		throw new NotImplemented();
	}

	public async copy(options: { newName: string }): Promise<MultiReddit> {
		throw new NotImplemented();
	}

	public async delete(): Promise<this> {
		throw new NotImplemented();
	}

	public async edit(options: MultiRedditProperties): Promise<this> {
		throw new NotImplemented();
	}

	public async removeSubreddit(sub: Subreddit | string): Promise<this> {
		throw new NotImplemented();
	}

	public async rename(options: { newName: string }): Promise<this> {
		throw new NotImplemented();
	}
}

export interface MultiRedditProperties {
	name?: string;
	description?: string;
	visibility?: MultiRedditVisibility;
	icon_name?: MultiRedditIcon;
	key_color?: string;
	weighting_scheme?: MultiRedditWeightingSchema;
}

type MultiRedditWeightingSchema = "classic" | "fresh";
type MultiRedditVisibility = "private" | "public" | "hidden";
type MultiRedditIcon =
	| "art and design"
	| "ask"
	| "books"
	| "business"
	| "cars"
	| "comics"
	| "cute animals"
	| "diy"
	| "entertainment"
	| "food and drink"
	| "funny"
	| "games"
	| "grooming"
	| "health"
	| "life advice"
	| "military"
	| "models pinup"
	| "music"
	| "news"
	| "philosophy"
	| "pictures and gifs"
	| "science"
	| "shopping"
	| "sports"
	| "style"
	| "tech"
	| "travel"
	| "unusual stories"
	| "video";
