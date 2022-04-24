"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../../tier0/exceptions");
const RedditContent_1 = __importDefault(require("../mixins/RedditContent"));
/**
 * @Category Reddit Objects
 */
class LiveThread extends RedditContent_1.default {
    async acceptContributorInvite() {
        throw new exceptions_1.NotImplemented();
    }
    async addUpdate(body) {
        throw new exceptions_1.NotImplemented();
    }
    async closeStream() {
        throw new exceptions_1.NotImplemented();
    }
    async closeThread() {
        throw new exceptions_1.NotImplemented();
    }
    async deleteUpdate(options) {
        throw new exceptions_1.NotImplemented();
    }
    async editSettings(options) {
        throw new exceptions_1.NotImplemented();
    }
    async getContributors() {
        throw new exceptions_1.NotImplemented();
    }
    async getDiscussions(options) {
        throw new exceptions_1.NotImplemented();
    }
    async getRecentUpdates(options) {
        throw new exceptions_1.NotImplemented();
    }
    async inviteContributor(options) {
        throw new exceptions_1.NotImplemented();
    }
    async leaveContributor() {
        throw new exceptions_1.NotImplemented();
    }
    async removeContributor(options) {
        throw new exceptions_1.NotImplemented();
    }
    async report(options) {
        throw new exceptions_1.NotImplemented();
    }
    async revokeContributorInvite(options) {
        throw new exceptions_1.NotImplemented();
    }
    async setContributorPermissions(options) {
        throw new exceptions_1.NotImplemented();
    }
    async strikeUpdate(options) {
        throw new exceptions_1.NotImplemented();
    }
}
exports.default = LiveThread;
