"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../tier0/constants");
const exceptions_1 = require("../../tier0/exceptions");
const RedditContent_1 = __importDefault(require("./RedditContent"));
/**
 * @Category Reddit Objects
 */
class ReplyableContent extends RedditContent_1.default {
    async approve() {
        await this.post({ url: "api/approve", form: { id: this.name } });
        return this;
    }
    async blockAuthor() {
        await this.post({ url: "api/block", form: { id: this.name } });
        return this;
    }
    async ignoreReports() {
        await this.post({ url: "api/ignore_reports", form: { id: this.name } });
        return this;
    }
    async remove(spam = false) {
        await this.post({
            url: "api/remove",
            form: { spam: spam, id: this.name },
        });
        return this;
    }
    async reply(text) {
        throw new exceptions_1.NotImplemented();
    }
    async report(reason, other_reason) {
        await this.post({
            url: "api/report",
            form: {
                api_type: constants_1.api_type,
                reason: reason ?? "other",
                other_reason: other_reason,
                thing_id: this.name,
            },
        });
        return this;
    }
    async unignoreReports() {
        await this.post({
            url: "api/unignore_reports",
            form: { id: this.name },
        });
        return this;
    }
}
exports.default = ReplyableContent;
