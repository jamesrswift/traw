import { parse } from "url";
import { NotImplemented } from "../../tier0/exceptions";
import traw from "../traw"
import More from "./More";

export interface ListingOptions {
	limit?: number;
	after?: string;
	before?: string;
	show?: string;
	count?: number;
}

export interface SortedListingOptions extends ListingOptions {
	time?: "all" | "hour" | "day" | "week" | "month" | "year";
}

export interface FetchMoreOptions {
	amount: number;
	skipReplies?: boolean;
	append?: boolean;
}

export default interface Listing<Type> extends Array<Type> {
	traw: traw;

	_query: ListingOptions;
	_transform: (arg0: any)=>any;
	_method: string;
	_isCommentList: boolean;
	_link_id?: string;
	_uri?: string;
	_more: any
	_cachedLookahead?: any;
}

const INTERNAL_DEFAULTS = {
	_query: {},
	_transform: (value: any) => value,
	_method: 'get',
	_isCommentList: false,
	_link_id: null,
	_uri: null,
	_more: null,
	_cachedLookahead: null
};

export default class Listing<Type> extends Array<Type> {

    constructor(options: any, traw: traw){
        super();
		this.push( ...options.children || [] );
        this.traw = traw;
		this._cachedLookahead = options._cachedLookahead;
		
		// Set defaults
		for ( let key of Object.keys(INTERNAL_DEFAULTS) ){
			this[key as keyof this] = this[key as keyof this] ?? <any>INTERNAL_DEFAULTS[key as keyof typeof INTERNAL_DEFAULTS]!;
		}

		// Set query
		this._query.before = options.before;
		this._query.after = options.after;

		// Setup more
		if ( options.children && options.children[options.children.length - 1] instanceof More ){
			this.#setMore(<More><unknown>this.pop())
		}

    }

	#setUri( value: string ){
		const parsedUri = parse(value, true);
		this._uri = parsedUri.pathname ?? undefined;

		// Setup query
		for ( let key of Object.keys(parsedUri.query) ){
			this._query[key as keyof ListingOptions] = this._query[key as keyof ListingOptions] ?? <any>parsedUri.query[key]
		}

		// Mutual exclusion
		if ( parsedUri.query.before != undefined ){
			this._query.after = undefined;
		} else {
			this._query.before = undefined;
		}
	}

	public get isFinished () : boolean {
		if ( this._isCommentList ){
			/* return isEmpty(this._cachedLookahead) && !!this._more && isEmpty(this._more.children)*/
			return this._cachedLookahead.length == 0 && !!this._more && this._more.children.length == 0;
		} else {
			return !this._uri || (this._query.after === null && this._query.before === null);
		}
	}

	fetchMore(options: FetchMoreOptions): Listing<Type>{
		throw new NotImplemented()
	}

	fetchAll(options?: FetchMoreOptions): Listing<Type>{
		return this.fetchMore({...options, amount: Infinity});
	}

	#setMore (moreObj: More ){
		this._more = moreObj;
		this._isCommentList = true;
	}

	public empty() : this {
		this.splice(0, this.length);
		return this;
	}

}

