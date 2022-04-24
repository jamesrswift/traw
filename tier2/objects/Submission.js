"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(require("./Comment"));
const constants_1 = require("../../tier0/constants");
const helpers_1 = require("../traw/helpers");
const exceptions_1 = require("../../tier0/exceptions");
const VoteableContent_1 = __importDefault(require("../mixins/VoteableContent"));
/**
 * @Category Reddit Objects
 */
class Submission extends VoteableContent_1.default {
    is_created_from_ads_ui;
    constructor(data, traw, _hasFetched) {
        super(data, traw, _hasFetched);
        /*this._callback = this._callback.bind(this);
        this._sort = this._sort || null;
        this._children = {};
        if (_hasFetched) {
            this.comments = this.comments || getEmptyRepliesListing(this);
        }*/
    }
    transformApiResponse(response) {
        /*
        response._sort = this._sort;
        for (const id in response._children) {
            const child = response._children[id];
            child._sort = response._sort;
            child._cb = response._callback;
        }
        return response;
        */
        throw new exceptions_1.NotImplemented();
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
    get uri() {
        return `comments/${this.name.slice(3)}${this._sort ? `?sort=${this._sort}` : ""}`;
    }
    async _setContestModeEnabled(state) {
        await this.post({
            url: "api/set_contest_mode",
            form: { api_type: constants_1.api_type, state, id: this.name },
        });
        return this;
    }
    async _setStickied({ state, num, }) {
        await this.post({
            url: "api/set_subreddit_sticky",
            form: { api_type: constants_1.api_type, state, num, id: this.name },
        });
        return this;
    }
    async assignFlair(options) {
        await this.fetch();
        await this.traw.assignFlair({
            ...options,
            link: this.name,
            subreddit_name: this.subreddit.display_name,
        });
        return this;
    }
    async disableContestMode() {
        return this._setContestModeEnabled(false);
    }
    async enableContestMode() {
        return this._setContestModeEnabled(true);
    }
    async fetchAll(options) {
        return this.fetchMore({ ...options, amount: Infinity });
    }
    async fetchMore(options) {
        if (typeof options !== "number") {
            options.append = true;
        }
        const comments = await this.replies.fetchMore(options);
        /*this._callback({ _children: comments._children });*/
        this.replies = comments;
        return comments;
    }
    async getComment(commentId, fetch = false) {
        let comment /*= this._children[commentId] || null;
        if (fetch) {
            comment*/ = new Comment_1.default({
            name: (0, helpers_1.addFullnamePrefix)(commentId, "t1_"),
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
    async getLinkFlairTemplates() {
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
    async hide() {
        await this.post({ url: "api/hide", form: { id: this.name } });
        return this;
    }
    async lock() {
        await this.post({ url: "api/lock", form: { id: this.name } });
        return this;
    }
    async markAsRead() {
        await this.post({
            url: "api/store_visits",
            form: { links: this.name },
        });
        return this;
    }
    async markNsfw() {
        await this.post({ url: "api/marknsfw", form: { id: this.name } });
        return this;
    }
    async markSpoiler() {
        await this.post({ url: "api/spoiler", form: { id: this.name } });
        return this;
    }
    async selectFlair(options) {
        await this.fetch();
        await this.traw.selectFlair({
            ...options,
            link: this.name,
            subredditName: this.subreddit.display_name,
        });
        return this;
    }
    async setSuggestedSort(sort) {
        await this.post({
            url: "api/set_suggested_sort",
            form: { api_type: constants_1.api_type, id: this.name, sort },
        });
        return this;
    }
    async sticky({ num }) {
        await this._setStickied({ state: true, num });
        return this;
    }
    async unhide() {
        await this.post({ url: "api/unhide", form: { id: this.name } });
        return this;
    }
    async unlock() {
        await this.post({ url: "api/unlock", form: { id: this.name } });
        return this;
    }
    async unmarkNsfw() {
        await this.post({ url: "api/unmarknsfw", form: { id: this.name } });
        return this;
    }
    async unmarkSpoiler() {
        await this.post({ url: "api/unspoiler", form: { id: this.name } });
        return this;
    }
    async unsticky() {
        await this._setStickied({ state: false });
        return this;
    }
    async submitCrosspost(options) {
        await this.traw.submitCrosspost({ ...options, originalPost: this });
        return this;
    }
}
exports.default = Submission;
