import traw from "..";

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
	skip_replies?: boolean;
	append?: boolean;
}

export default interface Listing<Type> extends Array<Type> {
	isFinished: boolean;
	_more: any;
	_query: any;
	traw: traw;
}

export default class Listing<Type> extends Array<Type> {

    constructor(options: any, traw: traw){
        super();
        this.traw = traw;

    }
}