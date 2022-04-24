"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VoteableContent_1 = __importDefault(require("../mixins/VoteableContent"));
const Listing_1 = __importDefault(require("./Listing"));
const exceptions_1 = require("../../tier0/exceptions");
/**
 * @Category Reddit Objects
 */
class Comment extends VoteableContent_1.default {
    constructor(options, traw, _hasFetched = false) {
        super(options, traw, _hasFetched);
        if (_hasFetched) {
            /*if ( this.replies instanceof Listing ){

            }
*/
        }
    }
    transformApiResponse(response) {
        if (response.data.kind == "Listing") {
            Object.assign(this, response.data.data.children[0].data);
            return this;
        }
        else {
            throw new exceptions_1.NotImplemented();
        }
    }
    get uri() {
        return !this.link_id
            ? `api/info?id=${this.name}`
            : `comments/${this.link_id.slice(3)}?comment=${this.name.slice(3)}${this._sort ? `&sort=${this._sort}` : ""}`;
    }
    async lock() {
        await this.post({ url: "api/lock", form: { id: this.name } });
        return this;
    }
    async unlock() {
        await this.post({ url: "api/unlock", form: { id: this.name } });
        return this;
    }
    async fetchMore(options) {
        if (typeof options !== "number") {
            /*options.append = true;*/
        }
        const comments = await this.replies.fetchMore(options);
        /*if ( this._cb ){
            this._cb({_children: comments._children});
        }*/
        this.replies = comments;
        //return this.replies;
        return new Listing_1.default({}, this.traw);
    }
    async fetchAll(options) {
        return this.fetchMore({ ...options, amount: Infinity });
    }
}
exports.default = Comment;
