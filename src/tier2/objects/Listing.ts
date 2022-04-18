import _ from "lodash";
import { parse } from "url";
import { NotImplemented } from "../../tier0/exceptions";
import ReplyableContent from "../mixins/ReplyableContent";
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
		for ( let child of options.children ){
			if ( child.kind != undefined ){
				if ( child.kind == 't3' ){
					// @ts-ignore
					const submission = new Submission(child.data, traw, true)
					console.log(this.push( <any>submission ))
					//console.log("Inserting into listing", submission)
				}
			}
		}
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
		const parsedOptions = _.defaults(
			typeof options === 'number' ? {amount: options} : _.clone(options),
			// Accept either `skip_replies` or `skipReplies` for backwards compatibility.
			{append: true, skipReplies: options.skipReplies}
		);

		if (typeof parsedOptions.amount !== 'number' || Number.isNaN(parsedOptions.amount)) {
			throw new Error('Failed to fetch Listing. (`amount` parameter was missing or invalid)');
		}

		if (parsedOptions.amount <= 0 || this.isFinished) {
			//@ts-ignore
			return parsedOptions.append ? this._clone() : this._clone().empty();
		}

		if (this._cachedLookahead) {
			const cloned = this._clone();
			cloned.push(...cloned._cachedLookahead.splice(0, parsedOptions.amount));
			//@ts-ignore
			return cloned.fetchMore(parsedOptions.amount - cloned.length + this.length);
		}
		//@ts-ignore
		return this._more ? this._fetchMoreComments(parsedOptions) : this._fetchMoreRegular(parsedOptions);
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

	_clone ({deep = false} = {}) {
		const properties = _.pick(this, Object.keys(INTERNAL_DEFAULTS));
		properties._query = _.clone(properties._query);
		properties._cachedLookahead = _.clone(properties._cachedLookahead);
		properties._more = this._more && this._more._clone();
		const shallowChildren = Array.from(this);
		//@ts-ignore
		properties.children = deep
		//@ts-ignore
		  ? shallowChildren.map(item => '_clone' in item && typeof item._clone === 'function' ? item._clone({deep}) : item)
		  : shallowChildren;
		return new Listing(properties, this.traw);
	}

}

export function getEmptyRepliesListing <ArgType extends ReplyableContent<Type>, Type extends ReplyableContent<Type> >(item: ArgType) /*: Listing<Type>*/
{

	/*if ( item instanceof Comment){
		return new Listing<Type>( {
			uri: `comments/${(item.link_id || item.parent_id).slice(3)}`,
			_query: {comment: item.name.slice(3), sort: item._sort},
			_transform: undefined /* property('comments[0].replies') ,
			_link_id: item.link_id,
			_isCommentList: true
		}, item.traw)
	}

	if ( item instanceof Submission ){
		return new Listing<Type>({
			uri: `comments/${item.id}`,
			_transform: undefined /* property('comments') ,
			_isCommentList: true
		}, item.traw)
	}
	
	return new Listing<Type>({}, item.traw);*/
}

export function addEmptyRepliesListing<Type extends ReplyableContent<Type>>(item: Type) {
	throw new NotImplemented();
	return item;
}

export function buildRepliesTree(childList: any) {
	throw new NotImplemented();
}

import Submission from "./Submission";