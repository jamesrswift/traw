"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RedditContent_1 = __importDefault(require("../mixins/RedditContent"));
const Comment_1 = __importDefault(require("./Comment"));
const Submission_1 = __importDefault(require("./Submission"));
class ModmailConversationAuthor extends RedditContent_1.default {
    constructor(options, traw, hasFetched) {
        super(options, traw, hasFetched);
        options.recentComments = Object.keys(options.recentComments).map((commentId) => new Comment_1.default({
            name: commentId,
            ...options.recentComments[commentId],
        }, this.traw));
        options.recentPosts = Object.keys(options.recentPosts).map((postId) => new Submission_1.default({
            name: postId,
            ...options.recentPosts[postId],
        }, this.traw, false));
    }
    /**
     * @summary Gets information on a Reddit user for the given modmail.
     * @returns {RedditUser} An unfetched RedditUser object for the requested user
     * @example
     *
     * r.getNewModmailConversation('efy3lax').getParticipant().getUser()
     * // => RedditUser { name: 'not_an_aardvark' }
     * r.getNewModmailConversation('efy3lax').getParticipant().getUser().link_karma.then(console.log)
     * // => 6
     */
    getUser() {
        return this.traw.getUser(this.name);
    }
}
exports.default = ModmailConversationAuthor;
