"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Listing_1 = __importDefault(require("./Listing"));
const RedditContent_1 = __importDefault(require("../mixins/RedditContent"));
const WikiPage_1 = __importDefault(require("./WikiPage"));
const constants_1 = require("../../tier0/constants");
const helpers_1 = require("../traw/helpers");
const exceptions_1 = require("../../tier0/exceptions");
const fs_1 = require("fs");
/**
 * @Category Reddit Objects
 */
class Subreddit extends RedditContent_1.default {
    get uri() {
        return `r/${this.display_name}/about`;
    }
    transformApiResponse(response) {
        const payload = response.data.data;
        // Assignment
        this.accept_followers = payload.accept_followers;
        this.accounts_active = payload.accounts_active;
        this.accounts_active_is_fuzzed = payload.accounts_active_is_fuzzed;
        this.active_user_count = payload.active_user_count;
        this.advertiser_category = payload.advertiser_category;
        this.all_original_content = payload.all_original_content;
        this.allow_discovery = payload.allow_discovery;
        this.allow_galleries = payload.allow_galleries;
        this.allow_images = payload.allow_images;
        this.allow_polls = payload.allow_polls;
        this.allow_prediction_contributors =
            payload.allow_prediction_contributors;
        this.allow_predictions = payload.allow_predictions;
        this.allow_predictions_tournament =
            payload.allow_predictions_tournament;
        this.allow_talks = payload.allow_talks;
        this.allow_videogifs = payload.allow_videogifs;
        this.allow_videos = payload.allow_videos;
        this.banner_background_color = payload.banner_background_color;
        this.banner_background_image = payload.banner_background_image;
        this.banner_img = payload.banner_img;
        this.banner_size = payload.banner_size;
        this.can_assign_link_flair = payload.can_assign_link_flair;
        this.can_assign_user_flair = payload.can_assign_user_flair;
        this.collapse_deleted_comments = payload.collapse_deleted_comments;
        this.comment_score_hide_mins = payload.comment_score_hide_mins;
        this.community_icon = payload.community_icon;
        this.community_reviewed = payload.community_reviewed;
        this.created = payload.created;
        this.created_utc = payload.created_utc;
        this.description = payload.description;
        this.description_html = payload.description_html;
        this.disable_contributor_requests =
            payload.disable_contributor_requests;
        this.display_name = payload.display_name;
        this.display_name_prefixed = payload.display_name_prefixed;
        this.emojis_custom_size = payload.emojis_custom_size;
        this.emojis_enabled = payload.emojis_enabled;
        this.free_form_reports = payload.free_form_reports;
        this.has_menu_widget = payload.has_menu_widget;
        this.header_img = payload.header_img;
        this.header_size = payload.header_size;
        this.header_title = payload.header_title;
        this.hide_ads = payload.hide_ads;
        this.icon_img = payload.icon_img;
        this.icon_size = payload.icon_size;
        this.id = payload.id;
        this.is_crosspostable_subreddit = payload.is_crosspostable_subreddit;
        this.is_enrolled_in_new_modmail = payload.is_enrolled_in_new_modmail;
        this.key_color = payload.key_color;
        this.lang = payload.lang;
        this.link_flair_enabled = payload.link_flair_enabled;
        this.link_flair_position = payload.link_flair_position;
        this.mobile_banner_image = payload.mobile_banner_image;
        this.name = payload.name;
        this.notification_level = payload.notification_level;
        this.original_content_tag_enabled =
            payload.original_content_tag_enabled;
        this.over18 = payload.over18;
        this.prediction_leaderboard_entry_type =
            payload.prediction_leaderboard_entry_type;
        this.primary_color = payload.primary_color;
        this.public_description = payload.public_description;
        this.public_description_html = payload.public_description_html;
        this.public_traffic = payload.public_traffic;
        this.quarantine = payload.quarantine;
        this.restrict_commenting = payload.restrict_commenting;
        this.restrict_posting = payload.restrict_posting;
        this.should_archive_posts = payload.should_archive_posts;
        this.show_media = payload.show_media;
        this.show_media_preview = payload.show_media_preview;
        this.spoilers_enabled = payload.spoilers_enabled;
        this.submission_type = payload.submission_type;
        this.submit_link_label = payload.submit_link_label;
        this.submit_text = payload.submit_text;
        this.submit_text_html = payload.submit_text_html;
        this.submit_text_label = payload.submit_text_label;
        this.subreddit_type = payload.subreddit_type;
        this.subscribers = payload.subscribers;
        this.suggested_comment_sort = payload.suggested_comment_sort;
        this.title = payload.title;
        this.url = payload.url;
        this.user_can_flair_in_sr = payload.user_can_flair_in_sr;
        this.user_flair_background_color = payload.user_flair_background_color;
        this.user_flair_css_class = payload.user_flair_css_class;
        this.user_flair_enabled_in_sr = payload.user_flair_enabled_in_sr;
        this.user_flair_position = payload.user_flair_position;
        this.user_flair_richtext = payload.user_flair_richtext;
        this.user_flair_template_id = payload.user_flair_template_id;
        this.user_flair_text = payload.user_flair_text;
        this.user_flair_text_color = payload.user_flair_text_color;
        this.user_flair_type = payload.user_flair_type;
        this.user_has_favorited = payload.user_has_favorited;
        this.user_is_banned = payload.user_is_banned;
        this.user_is_contributor = payload.user_is_contributor;
        this.user_is_moderator = payload.user_is_moderator;
        this.user_is_muted = payload.user_is_muted;
        this.user_is_subscriber = payload.user_is_subscriber;
        this.user_sr_flair_enabled = payload.user_sr_flair_enabled;
        this.user_sr_theme_enabled = payload.user_sr_theme_enabled;
        this.whitelist_status = payload.whitelist_status;
        this.wiki_enabled = payload.wiki_enabled;
        this.wls = payload.wls;
        return this;
    }
    async acceptModeratorInvite() {
        const res = await this.post({
            url: `r/${this.display_name}/api/accept_moderator_invite`,
            form: { api_type: constants_1.api_type }
        });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async addContributor(name) {
        return this.#friend({ name, type: 'contributor' });
    }
    async addWikiContributor(name) {
        return this.#friend({ name, type: 'wikicontributor' });
    }
    async banUser(options) {
        return this.#friend({
            name: options.name,
            ban_message: options.banMessage,
            ban_reason: options.banReason,
            duration: options.duration,
            note: options.banNote,
            type: 'banned'
        });
    }
    async configureFlair(options) {
        await this.post({ url: `r/${this.display_name}/api/flairconfig`, form: {
                api_type: constants_1.api_type,
                flair_enabled: options.userFlairEnabled,
                flair_position: options.userFlairPosition,
                flair_self_assign_enabled: options.userFlairSelfAssignEnabled,
                link_flair_position: options.linkFlairPosition,
                link_flair_self_assign_enabled: options.linkFlairSelfAssignEnabled
            } });
        return this;
    }
    async createLinkFlairTemplate(options) {
        return this.#createFlairTemplate({ ...options, flair_type: 'LINK_FLAIR' });
    }
    async createUserFlairTemplate(options) {
        return this.#createFlairTemplate({ ...options, flair_type: 'USER_FLAIR' });
    }
    async deleteAllLinkFlairTemplates() {
        return this.#deleteFlairTemplates('LINK_FLAIR');
    }
    async deleteAllUserFlairTemplates() {
        return this.#deleteFlairTemplates('USER_FLAIR');
    }
    async deleteBanner() {
        const res = await this.post({ url: `r/${this.display_name}/api/delete_sr_banner`, form: { api_type: constants_1.api_type } });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async deleteFlairTemplate(flair_template_id) {
        await this.post({
            url: `r/${this.display_name}/api/deleteflairtemplate`,
            form: { api_type: constants_1.api_type, flair_template_id }
        });
        return this;
    }
    async deleteHeader() {
        const res = await this.post({ url: `r/${this.display_name}/api/delete_sr_header`, form: { api_type: constants_1.api_type } });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async deleteIcon() {
        const res = await this.post({ url: `r/${this.display_name}/api/delete_sr_icon`, form: { api_type: constants_1.api_type } });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async deleteImage(img_name) {
        const res = await this.post({
            url: `r/${this.display_name}/api/delete_sr_img`,
            form: { api_type: constants_1.api_type, img_name }
        });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async deleteUserFlair(name) {
        await this.post({ url: `r/${this.display_name}/api/deleteflair`, form: { api_type: constants_1.api_type, name } });
        return this;
    }
    async editSettings(options) {
        const currentValues = await this.getSettings();
        const name = (await this.fetch()).name;
        /*await this.traw._createOrEditSubreddit({
          ...renameKey(currentValues, 'subreddit_type', 'type'),
          ...options,
          sr: name
        });*/
        throw new exceptions_1.NotImplemented();
        return this;
    }
    async getBannedUsers(options) {
        // Loadash.renameKey alternative:
        options.user = options?.name;
        delete options?.name;
        return this.traw.getListing({ uri: `r/${this.display_name}/about/banned`, qs: options });
    }
    async getContributors(options) {
        // Loadash.renameKey alternative:
        options.user = options?.name;
        delete options?.name;
        return this.traw.getListing({ uri: `r/${this.display_name}/about/contributors`, qs: options });
    }
    async getControversial(options) {
        return this.traw.getControversial(this.display_name, options);
    }
    async getEdited(options) {
        return this.traw.getListing({ uri: `r/${this.display_name}/about/edited`, qs: options });
    }
    async getHot(options) {
        return this.traw.getHot(this.display_name, options);
    }
    async getLinkFlairTemplates(linkId) {
        const options = linkId ? { link: linkId } : { is_newlink: true };
        const res = await this.#getFlairOptions(options);
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return res.choices;
    }
    async getModerationLog(options) {
        let parsedOptions = { ...options };
        if (options?.mods != undefined) {
            parsedOptions = { ...options, mods: options.mods.join(',') };
            delete parsedOptions.mods;
        }
        return this.traw.getListing({ uri: `r/${this.display_name}/about/log`, qs: parsedOptions });
    }
    async getModerators(options) {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: `r/${this.display_name}/about/moderators`, params: { user: options.name } });
    }
    async getModmail(options) {
        return this.traw.getListing({ uri: `r/${this.display_name}/about/message/moderator`, qs: options });
    }
    async getNewModmailConversations(options) {
        return this.traw.getNewModmailConversations({ ...options, entity: this.display_name });
    }
    async getModqueue(options) {
        return this.traw.getListing({ uri: `r/${this.display_name}/about/modqueue`, qs: options });
    }
    async getMutedUsers(options) {
        // Loadash.renameKey alternative:
        options.user = options?.name;
        delete options?.name;
        return this.traw.getListing({ uri: `r/${this.display_name}/about/muted`, qs: options });
    }
    async getMyFlair() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return (await this.#getFlairOptions()).current;
    }
    async getNew(options) {
        return this.traw.getNew(this.display_name, options);
    }
    async getNewComments(options) {
        return this.traw.getNewComments(this.display_name, options);
    }
    async getRandomSubmission() {
        return this.traw.getRandomSubmission(this.display_name);
    }
    async getRecommendedSubreddits(options) {
        const toOmit = options?.omit && options.omit.join(',');
        const names = await this.get({ url: `api/recommend/sr/${this.display_name}`, params: { omit: toOmit } });
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return map(names, 'sr_name');
    }
    async getReports(options) {
        return this.traw.getListing({ uri: `r/${this.display_name}/about/reports`, qs: options });
    }
    async getRising(options) {
        return this.traw.getRising(this.display_name, options);
    }
    async getRules() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: `r/${this.display_name}/about/rules` });
    }
    async getSettings() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: `r/${this.display_name}/about/edit` });
    }
    async getSpam(options) {
        return this.traw.getListing({ uri: `r/${this.display_name}/about/spam`, qs: options });
    }
    async getSticky(num) {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: `r/${this.display_name}/about/sticky`, params: { num } });
    }
    async getStylesheet() {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return this.get({ url: `r/${this.display_name}/stylesheet`, json: false });
    }
    async getSubmitText() {
        const res = await this.get({ url: `r/${this.display_name}/api/submit_text` });
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return res.submit_text;
    }
    async getTop(options) {
        return this.traw.getTop(this.display_name, options);
    }
    async getUnmoderated(options) {
        return this.traw.getListing({ uri: `r/${this.display_name}/about/unmoderated`, qs: options });
    }
    async getUserFlair(name) {
        const res = await this.#getFlairOptions({ name });
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return res.current;
    }
    async getUserFlairList(options) {
        return this.traw.getListing({ uri: `r/${this.display_name}/api/flairlist`, qs: options, _transform: (response) => {
                /**
                 * For unknown reasons, responses from the api/flairlist endpoint are formatted differently than responses from all other
                 * Listing endpoints. Most Listing endpoints return an object with a `children` property containing the Listing's children,
                 * and `after` and `before` properties corresponding to the `after` and `before` querystring parameters that a client should
                 * use in the next request. However, the api/flairlist endpoint returns an object with a `users` property containing the
                 * Listing's children, and `next` and `prev` properties corresponding to the `after` and `before` querystring parameters. As
                 * far as I can tell, there's no actual reason for this difference. >_>
                 */
                response.after = response.next || null;
                response.before = response.prev || null;
                response.children = response.users;
                return new Listing_1.default(response, this.traw);
            } });
    }
    async getUserFlairTemplates() {
        const res = await this.#getFlairOptions();
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return res.choices;
    }
    async getWikiBannedUsers(options) {
        // Loadash.renameKey alternative:
        options.user = options?.name;
        delete options?.name;
        return this.traw.getListing({ uri: `r/${this.display_name}/about/wikibanned`, qs: options });
    }
    async getWikiContributors(options) {
        // Loadash.renameKey alternative:
        options.user = options?.name;
        delete options?.name;
        return this.traw.getListing({ uri: `r/${this.display_name}/about/wikicontributors`, qs: options });
    }
    getWikiPage(title) {
        return new WikiPage_1.default({ subreddit: this, title }, this.traw);
    }
    async getWikiPages() {
        const res = await this.get({ url: `r/${this.display_name}/wiki/pages` });
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        return res.map(title => this.getWikiPage(title));
    }
    async getWikiRevisions(options) {
        return this.traw.getListing({ uri: `r/${this.display_name}/wiki/revisions`, qs: options });
    }
    async hideMyFlair() {
        return this.#setMyFlairVisibility(false);
    }
    async inviteModerator(name, permissions) {
        return this.#friend({ name, permissions: (0, helpers_1.formatModPermissions)(permissions), type: 'moderator_invite' });
    }
    async leaveContributor() {
        const name = (await this.fetch()).name;
        const res = await this.post({ url: 'api/leavecontributor', form: { id: name } });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async leaveModerator() {
        const name = (await this.fetch()).name;
        const res = await this.post({ url: 'api/leavemoderator', form: { id: name } });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async muteUser(name) {
        return this.#friend({ name, type: 'muted' });
    }
    async removeContributor(name) {
        return this.#unfriend({ name, type: 'contributor' });
    }
    async removeModerator(name) {
        return this.#unfriend({ name, type: 'moderator' });
    }
    async removeWikiContributor(name) {
        return this.#unfriend({ name, type: 'wikicontributor' });
    }
    async revokeModeratorInvite(name) {
        return this.#unfriend({ name, type: 'moderator_invite' });
    }
    async search(options) {
        return this.traw.search({ ...options, subreddit: this, restrictSr: true });
    }
    async selectMyFlair(options) {
        throw new exceptions_1.NotImplemented();
        // @ts-ignore
        const name = await this.traw._getMyName();
        // @ts-ignore
        await this.traw._selectFlair({ ...options, subredditName: this.display_name, name });
        return this;
    }
    async setModeratorPermissions(name, permissions) {
        const res = await this.post({
            url: `r/${this.display_name}/api/setpermissions`,
            form: { api_type: constants_1.api_type, name, permissions: (0, helpers_1.formatModPermissions)(permissions), type: 'moderator' }
        });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async setMultipleUserFlairs(flairs) {
        throw new exceptions_1.NotImplemented();
    }
    async showMyFlair() {
        return this.#setMyFlairVisibility(true);
    }
    async submitLink(options) {
        return this.traw.submitLink({ ...options, subredditName: this.display_name });
    }
    async submitSelfpost(options) {
        return this.traw.submitSelfpost({ ...options, subredditName: this.display_name });
    }
    async subscribe() {
        return this.#setSubscribed(true);
    }
    async unbanUser(name) {
        return this.#unfriend({ name, type: 'banned' });
    }
    async unmuteUser(name) {
        return this.#unfriend({ name, type: 'muted' });
    }
    async unsubscribe() {
        return this.#setSubscribed(false);
    }
    async unwikibanUser(name) {
        return this.#unfriend({ name, type: 'wikibanned' });
    }
    async updateStylesheet(css, reason) {
        const res = await this.post({
            url: `r/${this.display_name}/api/subreddit_stylesheet`,
            form: { api_type: constants_1.api_type, op: 'save', reason, stylesheet_contents: css }
        });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async uploadBannerImage(options) {
        return this.#uploadSrImg({ file: options.file, imageType: options.imageType, upload_type: 'banner' });
    }
    async uploadHeaderImage(options) {
        return this.#uploadSrImg({ file: options.file, imageType: options.imageType, upload_type: 'header' });
    }
    async uploadIcon(options) {
        return this.#uploadSrImg({ file: options.file, imageType: options.imageType, upload_type: 'icon' });
    }
    async uploadStylesheetImage(options) {
        return this.#uploadSrImg({ file: options.file, imageType: options.imageType, upload_type: 'img' });
    }
    async wikibanUser(name) {
        return this.#friend({ name, type: 'wikibanned' });
    }
    /*
     * Private declarations
     */
    async #friend(options) {
        const res = await this.post({
            url: `r/${this.display_name}/api/friend`,
            form: { ...options, api_type: constants_1.api_type }
        });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async #unfriend(options) {
        const res = await this.post({
            url: `r/${this.display_name}/api/unfriend`,
            form: { ...options, api_type: constants_1.api_type }
        });
        (0, helpers_1.handleJsonErrors)(res);
        return this;
    }
    async #setSubscribed(status) {
        await this.post({
            url: 'api/subscribe',
            form: {
                action: status ? 'sub' : 'unsub',
                sr_name: this.display_name
            }
        });
        return this;
    }
    async #uploadSrImg({ name, file, upload_type, imageType }) {
        const parsedFile = typeof file === 'string' ? (0, fs_1.createReadStream)(file) : file;
        const result = await this.post({
            url: `r/${this.display_name}/api/upload_sr_img`,
            formData: { name, upload_type, img_type: imageType, file: parsedFile }
        });
        (0, helpers_1.handleJsonErrors)(result);
        return this;
    }
    async #setMyFlairVisibility(flair_enabled) {
        await this.post({ url: `r/${this.display_name}/api/setflairenabled`, form: { api_type: constants_1.api_type, flair_enabled } });
        return this;
    }
    async #createFlairTemplate({ text, css_class, flair_type, text_editable = false }) {
        await this.post({
            url: `r/${this.display_name}/api/flairtemplate`,
            form: { api_type: constants_1.api_type, text, css_class, flair_type, text_editable }
        });
        return this;
    }
    async #deleteFlairTemplates(flair_type) {
        await this.post({ url: `r/${this.display_name}/api/clearflairtemplates`, form: { api_type: constants_1.api_type, flair_type } });
        return this;
    }
    #getFlairOptions({ name, link, is_newlink } = {}) {
        return this.post({ url: `r/${this.display_name}/api/flairselector`, form: { name, link, is_newlink } });
    }
}
exports.default = Subreddit;
