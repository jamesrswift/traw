"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReplyableContent_1 = __importDefault(require("../mixins/ReplyableContent"));
/**
 * @Category Reddit Objects
 */
class PrivateMessage extends ReplyableContent_1.default {
    get uri() {
        return `message/messages/${this.name.slice(3)}`;
    }
    transformApiResponse(response) {
        const responseFormatted = response;
        // First order of business, retrieve the message contents:
        const message = responseFormatted.data.data.children[0].data;
        // Merge (manually) values into class
        this.first_message = message.first_message ?? null;
        this.first_message_name = message.first_message_name ?? null;
        /*this.subreddit = new Subreddit( { display_name: message.subreddit_name_prefixed!.replace(/^\/?r\//, "") }, this.traw );*/
        this.likes = message.likes;
        /* this.replies (tricky) */
        this.author_fullname = message.author_fullname;
        this.id = message.id;
        this.subject = message.subject;
        this.associated_awarding_id = message.associated_awarding_id;
        this.score = message.score;
        /* this.author (tricky) */
        this.num_comments = message.num_comments;
        this.parent_id = message.parent_id;
        this.subreddit_name_prefixed = message.subreddit_name_prefixed;
        this.new = message.new;
        this.type = message.type;
        this.body = message.body;
        this.dest = message.dest;
        this.was_comment = message.was_comment;
        this.body_html = message.body_html;
        this.name = message.name;
        this.created = message.created;
        this.created_utc = message.created_utc;
        this.context = message.context;
        this.distinguished = message.distinguished;
        return this;
    }
    async deleteFromInbox() {
        await this.post({ url: "api/del_msg", form: { id: this.name } });
        return this;
    }
    async markAsRead() {
        await this.traw.markMessagesAsRead([this]);
        return this;
    }
    async markAsUnread() {
        await this.traw.markMessagesAsUnread([this]);
        return this;
    }
    async muteAuthor() {
        await this.post({
            url: "api/mute_message_author",
            form: { id: this.name },
        });
        return this;
    }
    async unmuteAuthor() {
        await this.post({
            url: "api/unmute_message_author",
            form: { id: this.name },
        });
        return this;
    }
}
exports.default = PrivateMessage;
