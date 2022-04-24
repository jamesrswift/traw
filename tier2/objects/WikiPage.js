"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../../tier0/exceptions");
const RedditContent_1 = __importDefault(require("../mixins/RedditContent"));
const RedditUser_1 = __importDefault(require("./RedditUser"));
/**
 * @Category Reddit Objects
 */
class WikiPage extends RedditContent_1.default {
    get uri() {
        return `r/${this.subreddit.display_name}/wiki/${this.title}`;
    }
    transformApiResponse(response) {
        const responseFormatted = response;
        this.content_md = responseFormatted.data.data.content_md;
        this.may_revise = responseFormatted.data.data.may_revise;
        this.reason = responseFormatted.data.data.reason;
        this.revision_date = responseFormatted.data.data.revision_date;
        this.revision_id = responseFormatted.data.data.revision_id;
        this.content_html = responseFormatted.data.data.content_html;
        // Handle user
        this.revision_by = new RedditUser_1.default(responseFormatted.data.data.revision_by.data, this.traw);
        return this;
    }
    async _modifyEditor(name, action) {
        return this.post({
            url: `r/${this.subreddit.display_name}/api/wiki/alloweditor/${action}`,
            form: { page: this.title, username: name }
        });
    }
    async addEditor(name) {
        await this._modifyEditor(name, 'add');
        return this;
    }
    async edit(options) {
        await this.post({
            url: `r/${this.subreddit.display_name}/api/wiki/edit`,
            form: { content: options.text, page: this.title, previous: options.previousRevision, reason: options.reason }
        });
        return this;
    }
    async editSettings(options) {
        await this.post({
            url: `r/${this.subreddit.display_name}/wiki/settings/${this.title}`,
            form: { listed: options.listed, permlevel: options.permissionLevel }
        });
        return this;
    }
    async getDiscussions(options) {
        return this.traw.getListing({ uri: `r/${this.subreddit.display_name}/wiki/discussions/${this.title}`, qs: options });
    }
    async getRevisions(options) {
        return this.traw.getListing({ uri: `r/${this.subreddit.display_name}/wiki/revisions/${this.title}`, qs: options });
    }
    async getSettings() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: `r/${this.subreddit.display_name}/wiki/settings/${this.title}` });
    }
    async hideRevision(id) {
        await this.post({
            url: `r/${this.subreddit.display_name}/api/wiki/hide`,
            params: { page: this.title, revision: id }
        });
        return this;
    }
    async removeEditor(name) {
        await this._modifyEditor(name, 'del');
        return this;
    }
    async revert(id) {
        await this.post({
            url: `r/${this.subreddit.display_name}/api/wiki/revert`,
            params: { page: this.title, revision: id }
        });
        return this;
    }
}
exports.default = WikiPage;
