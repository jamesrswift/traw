"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../tier0/constants");
const helpers_1 = require("../traw/helpers");
const ReplyableContent_1 = __importDefault(require("./ReplyableContent"));
/**
 * @Category Reddit Objects
 */
class VoteableContent extends ReplyableContent_1.default {
    async _vote(direction) {
        await this.post({
            url: "api/vote",
            form: { dir: direction, id: this.name },
        });
        return this;
    }
    async _setInboxRepliesEnabled(state) {
        return this.post({
            url: "api/sendreplies",
            form: { state, id: this.name },
        });
    }
    async _mutateAndExpandReplies(limit, depth) {
        /*if (depth <= 0) {
            return this;
        }
        const repliesKey = this.constructor.name === "Submission" ? "comments" : "replies";
        const replies = await this[repliesKey].fetchMore({
            amount: limit - this[repliesKey].length,
        });
        this[repliesKey] = replies;
        replies.slice(0, limit).map((reply: Type) =>
            reply._mutateAndExpandReplies(limit, depth - 1)
        );*/
        return this;
    }
    async delete() {
        await this.post({ url: "api/del", form: { id: this.name } });
        return this;
    }
    async disableInboxReplies() {
        await this._setInboxRepliesEnabled(false);
        return this;
    }
    async distinguish(options = {}) {
        await this.post({
            url: "api/distinguish",
            form: {
                api_type: constants_1.api_type,
                how: options.status === true
                    ? "yes"
                    : options.status === false
                        ? "no"
                        : options.status,
                sticky: options.sticky,
                id: this.name,
            },
        });
        return this;
    }
    async downvote() {
        return this._vote(-1);
    }
    async edit(updatedText) {
        const res = await this.post({
            url: "api/editusertext",
            form: { api_type: constants_1.api_type, text: updatedText, thing_id: this.name },
        });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async enableInboxReplies() {
        await this._setInboxRepliesEnabled(true);
        return this;
    }
    async expandReplies(limit, depth) {
        await this.fetch();
        return this.clone(true)._mutateAndExpandReplies(limit ?? Infinity, depth ?? Infinity);
    }
    async gild() {
        await this.post({ url: `api/v1/gold/gild/${this.name}` });
        return this;
    }
    async save() {
        await this.post({ url: "api/save", form: { id: this.name } });
        return this;
    }
    async undistinguish() {
        return this.distinguish({ status: false, sticky: false });
    }
    async unsave() {
        await this.post({ url: "api/unsave", form: { id: this.name } });
        return this;
    }
    async unvote() {
        return this._vote(0);
    }
    async upvote() {
        return this._vote(1);
    }
}
exports.default = VoteableContent;
