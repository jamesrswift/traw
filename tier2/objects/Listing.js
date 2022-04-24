"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRepliesTree = exports.addEmptyRepliesListing = exports.getEmptyRepliesListing = void 0;
const lodash_1 = __importDefault(require("lodash"));
const url_1 = require("url");
const exceptions_1 = require("../../tier0/exceptions");
const More_1 = __importDefault(require("./More"));
const INTERNAL_DEFAULTS = {
    _query: {},
    _transform: (value) => value,
    _method: 'get',
    _isCommentList: false,
    _link_id: null,
    _uri: null,
    _more: null,
    _cachedLookahead: null
};
/**
 * @Category Reddit Objects
 */
class Listing extends Array {
    constructor(options, traw) {
        super();
        for (let child of options.children) {
            if (child.kind != undefined) {
                //console.log(child.kind)
                if (child.kind == 't3') {
                    const submission = new Submission_1.default(child.data, traw, true);
                    this.push(submission);
                }
                else if (child.kind == 't5') {
                    const subreddit = new Subreddit_1.default(child.data, traw, true);
                    this.push(subreddit);
                }
            }
        }
        this.traw = traw;
        this._cachedLookahead = options._cachedLookahead;
        // Set defaults
        for (let key of Object.keys(INTERNAL_DEFAULTS)) {
            this[key] = this[key] ?? INTERNAL_DEFAULTS[key];
        }
        // Set query
        this._query.before = options.before;
        this._query.after = options.after;
        // Setup more
        if (options.children && options.children[options.children.length - 1] instanceof More_1.default) {
            this.#setMore(this.pop());
        }
    }
    #setUri(value) {
        const parsedUri = (0, url_1.parse)(value, true);
        this._uri = parsedUri.pathname ?? undefined;
        // Setup query
        for (let key of Object.keys(parsedUri.query)) {
            this._query[key] = this._query[key] ?? parsedUri.query[key];
        }
        // Mutual exclusion
        if (parsedUri.query.before != undefined) {
            this._query.after = undefined;
        }
        else {
            this._query.before = undefined;
        }
    }
    get isFinished() {
        if (this._isCommentList) {
            /* return isEmpty(this._cachedLookahead) && !!this._more && isEmpty(this._more.children)*/
            return this._cachedLookahead.length == 0 && !!this._more && this._more.children.length == 0;
        }
        else {
            return !this._uri || (this._query.after === null && this._query.before === null);
        }
    }
    fetchMore(options) {
        const parsedOptions = lodash_1.default.defaults(typeof options === 'number' ? { amount: options } : lodash_1.default.clone(options), 
        // Accept either `skip_replies` or `skipReplies` for backwards compatibility.
        { append: true, skipReplies: options.skipReplies });
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
    fetchAll(options) {
        return this.fetchMore({ ...options, amount: Infinity });
    }
    #setMore(moreObj) {
        this._more = moreObj;
        this._isCommentList = true;
    }
    empty() {
        this.splice(0, this.length);
        return this;
    }
    _clone({ deep = false } = {}) {
        const properties = lodash_1.default.pick(this, Object.keys(INTERNAL_DEFAULTS));
        properties._query = lodash_1.default.clone(properties._query);
        properties._cachedLookahead = lodash_1.default.clone(properties._cachedLookahead);
        properties._more = this._more && this._more._clone();
        const shallowChildren = Array.from(this);
        //@ts-ignore
        properties.children = deep
            //@ts-ignore
            ? shallowChildren.map(item => '_clone' in item && typeof item._clone === 'function' ? item._clone({ deep }) : item)
            : shallowChildren;
        return new Listing(properties, this.traw);
    }
}
exports.default = Listing;
function getEmptyRepliesListing(item) {
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
exports.getEmptyRepliesListing = getEmptyRepliesListing;
function addEmptyRepliesListing(item) {
    throw new exceptions_1.NotImplemented();
    return item;
}
exports.addEmptyRepliesListing = addEmptyRepliesListing;
function buildRepliesTree(childList) {
    throw new exceptions_1.NotImplemented();
}
exports.buildRepliesTree = buildRepliesTree;
const Submission_1 = __importDefault(require("./Submission"));
const Subreddit_1 = __importDefault(require("./Subreddit"));
