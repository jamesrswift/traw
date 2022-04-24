"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../../tier0/exceptions");
const RedditContent_1 = __importDefault(require("../mixins/RedditContent"));
const MultiReddit_1 = __importDefault(require("./MultiReddit"));
/**
 * @Category Reddit Objects
 */
class RedditUser extends RedditContent_1.default {
    get uri() {
        return `user/${this.name}/about`;
    }
    async assignFlair(options) {
        await this.traw.assignFlair({ ...options, name: this.name });
        return this;
    }
    async friend(note) {
        await this.put({
            url: `api/v1/me/friends/${this.name}`,
            data: { user: this.name, note },
        });
        return this;
    }
    async getComments(options) {
        return this.traw.getListing({
            uri: `user/${this.name}/comments`,
            qs: options,
        });
    }
    async getDownvotedContent(options) {
        return this.traw.getListing({
            uri: `user/${this.name}/downvoted`,
            qs: options,
        });
    }
    async getFriendInformation() {
        return this.get({ url: `api/v1/me/friends/${this.name}` });
    }
    async getGildedContent(options) {
        return this.traw.getListing({
            uri: `user/${this.name}/gilded`,
            qs: options,
        });
    }
    async getHiddenContent(options) {
        return this.traw.getListing({
            uri: `user/${this.name}/hidden`,
            qs: options,
        });
    }
    async getMultireddit(name) {
        return new MultiReddit_1.default({ name, curator: this }, this.traw, false);
    }
    async getMultireddits() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({
            url: `api/multi/user/${this.name}`,
            params: { expand_srs: true },
        });
    }
    async getOverview(options) {
        return this.traw.getListing({
            uri: `user/${this.name}/overview`,
            qs: options,
        });
    }
    async getSavedContent(options) {
        return this.traw.getListing({ uri: `user/${this.name}/saved`, qs: options });
    }
    async getSubmissions(options) {
        return this.traw.getListing({
            uri: `user/${this.name}/submitted`,
            qs: options,
        });
    }
    async getTrophies() {
        return this.get({ url: `api/v1/user/${this.name}/trophies` });
    }
    async getUpvotedContent(options) {
        return this.traw.getListing({
            uri: `user/${this.name}/upvoted`,
            qs: options,
        });
    }
    async giveGold(months) {
        await this.post({
            url: `api/v1/gold/give/${this.name}`,
            form: { months },
        });
        return this;
    }
    async unfriend() {
        return this.traw.delete({ url: `api/v1/me/friends/${this.name}` });
    }
}
exports.default = RedditUser;
