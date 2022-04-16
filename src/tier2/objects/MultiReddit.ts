import { NotImplemented } from "../../tier0/exceptions";
import RedditContent from "../mixins/RedditContent";
import traw from "../traw";
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

	constructor(options: Partial<MultiReddit>, traw: traw, protected _hasFetched: boolean){
		super(options, traw, _hasFetched);
		if ( _hasFetched ){
			traw.getUser(this.path.split('/')[2]).then( (curator) => this.curator = curator )
			this.subreddits = this.subreddits.map(item => new Subreddit( (<any>item).data || {display_name: item.name}, traw))
		}
	}

	get _uri () {
		return `api/multi${this._path}?expand_srs=true`;
	}

	get _path () {
		return `/user/${this.curator.name}/m/${this.name}`;
	}

	public async addSubreddit(sub: Subreddit | string): Promise<this> {
		sub = typeof sub === 'string' ? sub : sub.display_name;
		await this.put({url: `api/multi${this._path}/r/${sub}`, form: {model: JSON.stringify({name: sub})}});
		return this;
	}

	public async copy(newName: string): Promise<MultiReddit> {
		const name = await this.traw.getMyName();
		throw new NotImplemented();

		//@ts-ignore
		return this.post({
			url: 'api/multi/copy', 
			form: {
				from: this._path,
				to: `/user/${name}/m/${newName}`,
				display_name: newName
			}
		})
	}

	public async delete(): Promise<this> {
		await this.traw.delete({url: `api/multi${this._path}`});
		return this;
	}

	public async edit(options: MultiRedditProperties): Promise<this> {
		const display_name = options.name?.length ? options.name : this.name;

		throw new NotImplemented();

		//@ts-ignore
		return this.put({
			url: `api/multi${this._path}`, 
			form: {
				model: JSON.stringify({
					description_md: options.description,
					display_name,
					icon_name: options.icon_name,
					key_color: options.key_color,
					visibility: options.visibility,
					weighting_scheme: options.weighting_scheme
				})
			}
		});
	}

	public async removeSubreddit(sub: Subreddit | string): Promise<this> {
		await this.traw.delete({url: `api/multi${this._path}/r/${typeof sub === 'string' ? sub : sub.display_name}`});
		return this;
	  }

	public async rename(newName: string ): Promise<this> {
		const name = await this.traw.getMyName();
		throw new NotImplemented();

		//@ts-ignore
		return this.post({
			url: 'api/multi/rename', 
			form: {
				from: this._path,
				to: `/user/${name}/m/${newName}`,
				display_name: newName
			}
		})
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
