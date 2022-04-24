"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modActionStates = exports.conversationStates = void 0;
const RedditContent_1 = __importDefault(require("../mixins/RedditContent"));
const ModmailConversationAuthor_1 = __importDefault(require("./ModmailConversationAuthor"));
const exceptions_1 = require("../../tier0/exceptions");
var conversationStates;
(function (conversationStates) {
    conversationStates[conversationStates["New"] = 0] = "New";
    conversationStates[conversationStates["InProgress"] = 1] = "InProgress";
    conversationStates[conversationStates["Archived"] = 2] = "Archived";
})(conversationStates = exports.conversationStates || (exports.conversationStates = {}));
var modActionStates;
(function (modActionStates) {
    modActionStates[modActionStates["Highlight"] = 0] = "Highlight";
    modActionStates[modActionStates["UnHighlight"] = 1] = "UnHighlight";
    modActionStates[modActionStates["Archive"] = 2] = "Archive";
    modActionStates[modActionStates["UnArchive"] = 3] = "UnArchive";
    modActionStates[modActionStates["ReportedToAdmins"] = 4] = "ReportedToAdmins";
    modActionStates[modActionStates["Mute"] = 5] = "Mute";
    modActionStates[modActionStates["Unmute"] = 6] = "Unmute";
})(modActionStates = exports.modActionStates || (exports.modActionStates = {}));
/**
 * @Category Reddit Objects
 */
class ModmailConversation extends RedditContent_1.default {
    static conversationStates;
    static modActionStats;
    get name() {
        return this.id;
    }
    async reply(body, isAuthorHidden, isInternal) {
        throw new exceptions_1.NotImplemented();
    }
    async getParticipant() {
        const res = await this.get({ url: `api/mod/conversations/${this.id}/user` });
        return new ModmailConversationAuthor_1.default(res, this.traw, true);
    }
    async isRead() {
        return this.lastUnread === null;
    }
    async read() {
        this.traw.markNewModmailConversationsAsRead([this]);
        return this;
    }
    async unread() {
        this.traw.markNewModmailConversationsAsUnread([this]);
        return this;
    }
    async mute() {
        await this.post({ url: `api/mod/conversations/${this.id}/mute` });
        return this;
    }
    async unmute() {
        await this.post({ url: `api/mod/conversations/${this.id}/unmute` });
        return this;
    }
    async highlight() {
        await this.post({ url: `api/mod/conversations/${this.id}/highlight` });
        ;
        return this;
    }
    async unhighlight() {
        await this.traw.delete({ url: `api/mod/conversations/${this.id}/highlight` });
        return this;
    }
    async archive() {
        await this.post({ url: `api/mod/conversations/${this.id}/archive` });
        return this;
    }
    async unarchive() {
        await this.post({ url: `api/mod/conversations/${this.id}/unarchive` });
        ;
        return this;
    }
}
exports.default = ModmailConversation;
