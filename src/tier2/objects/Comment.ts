import traw from "../traw";
import VoteableContent from "../mixins/VoteableContent";
import Listing, { FetchMoreOptions, ListingOptions } from "./Listing";
import { AxiosResponse } from "axios";
import { NotImplemented } from "../../tier0/exceptions";

export default interface Comment extends VoteableContent<Comment> {
    body_html: string;
	body: string;
	collapsed_reason: any; // ?
	collapsed: boolean;
	controversiality: number;
	depth: number;
	ignore_reports: boolean;
	/** True if comment author is the same as the Submission author */
	is_submitter: boolean;
	link_id: string;
	parent_id: string;
	removed: boolean;
	score_hidden: boolean;
	spam: boolean;
}

export default class Comment extends VoteableContent<Comment> {

    constructor(options: Partial<Comment>, traw: traw, _hasFetched: boolean = false){
        super(options, traw, _hasFetched);

        if ( _hasFetched ){

            if ( this.replies instanceof Listing ){

            }

        }
    }

    protected override transformApiResponse(response: AxiosResponse<any, any>): Comment {

        if ( response.data.kind == "Listing" ){
            Object.assign(this, response.data.data.children[0].data)
            return this;
        } else {
            throw new NotImplemented()
        }
    }

    override get uri(): string {
        return !this.link_id ? `api/info?id=${this.name}` :
                `comments/${this.link_id.slice(3)}?comment=${this.name.slice(3)}${
                    this._sort ? `&sort=${this._sort}` : ""
            }`; 
    }

    public async lock() : Promise<this> {
        await this.post({url: 'api/lock', form: {id: this.name}})
        return this
    }

    public async unlock() : Promise<this> {
        await this.post({url: 'api/unlock', form: {id: this.name}})
        return this
    }

    public async fetchMore(options: FetchMoreOptions) : Promise<Listing<Comment>> {
        if ( typeof options !== "number"){
            /*options.append = true;*/
        }

        const comments = await this.replies.fetchMore(options);
        
        /*if ( this._cb ){
            this._cb({_children: comments._children});
        }*/

        this.replies = comments;
        //return this.replies;
        return new Listing<Comment>({}, this.traw)
    }

    public async fetchAll(options: ListingOptions ) : Promise<Listing<Comment>> {
        return this.fetchMore({...options, amount: Infinity})
    }
}