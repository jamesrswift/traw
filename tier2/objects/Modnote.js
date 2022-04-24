"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteLabel = exports.NoteType = void 0;
const RedditContent_1 = __importDefault(require("../mixins/RedditContent"));
var NoteType;
(function (NoteType) {
    NoteType["NOTE"] = "NOTE";
    NoteType["APPROVAL"] = "APPROVAL";
    NoteType["REMOVAL"] = "REMOVAL";
    NoteType["BAN"] = "BAN";
    NoteType["MUTE"] = "MUTE";
    NoteType["INVITE"] = "INVITE";
    NoteType["SPAM"] = "SPAM";
    NoteType["CONTENT_CHANGE"] = "CONTENT_CHANGE";
    NoteType["MOD_ACTION"] = "MOD_ACTION";
    NoteType["ALL"] = "ALL";
})(NoteType = exports.NoteType || (exports.NoteType = {}));
var NoteLabel;
(function (NoteLabel) {
    NoteLabel["BOT_BAN"] = "BOT_BAN";
    NoteLabel["PERMA_BAN"] = "PERMA_BAN";
    NoteLabel["BAN"] = "BAN";
    NoteLabel["ABUSE_WARNING"] = "ABUSE_WARNING";
    NoteLabel["SPAM_WARNING"] = "SPAM_WARNING";
    NoteLabel["SPAM_WATCH"] = "SPAM_WATCH";
    NoteLabel["SOLID_CONTRIBUTOR"] = "SOLID_CONTRIBUTOR";
    NoteLabel["HELPFUL_USER"] = "HELPFUL_USER";
})(NoteLabel = exports.NoteLabel || (exports.NoteLabel = {}));
/**
 * @Category Reddit Objects
 */
class Modnote extends RedditContent_1.default {
    get uri() {
        return `api/mod/notes?note_id=${this.id}`;
    }
    async delete() {
        if (this.type != NoteType.NOTE)
            return;
        await this.traw.deleteModnote(this.user, this.subreddit, this.id);
        return;
    }
}
exports.default = Modnote;
