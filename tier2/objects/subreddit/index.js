"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../tier0/constants");
const RedditContent_1 = __importDefault(require("../../mixins/RedditContent"));
const helpers_1 = require("../../traw/helpers");
class Subreddit extends RedditContent_1.default {
    get uri() {
        return `r/${this.display_name}/about`;
    }
    transformApiResponse(response) {
        return response.data;
    }
    async acceptModeratorInvite() {
        const res = await this.post({
            url: `r/${this.display_name}/api/accept_moderator_invite`,
            form: { api_type: constants_1.api_type },
        });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async addContributor(name) {
        return this.#friend(name, "contributor");
    }
    async addWikiContributor(name) {
        return this.#friend(name, "wikicontributor");
    }
    async banUser(options) {
        return this;
    }
    async #friend(x, y) {
        return this;
    }
}
exports.default = Subreddit;
