"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../../tier0/exceptions");
const RedditContent_1 = __importDefault(require("../mixins/RedditContent"));
const Subreddit_1 = __importDefault(require("./Subreddit"));
/**
 * @Category Reddit Objects
 */
class MultiReddit extends RedditContent_1.default {
    _hasFetched;
    constructor(options, traw, _hasFetched) {
        super(options, traw, _hasFetched);
        this._hasFetched = _hasFetched;
        if (_hasFetched) {
            traw.getUser(this.path.split('/')[2]).then((curator) => this.curator = curator);
            this.subreddits = this.subreddits.map(item => new Subreddit_1.default(item.data || { display_name: item.name }, traw));
        }
    }
    get _uri() {
        return `api/multi${this._path}?expand_srs=true`;
    }
    get _path() {
        return `/user/${this.curator.name}/m/${this.name}`;
    }
    async addSubreddit(sub) {
        sub = typeof sub === 'string' ? sub : sub.display_name;
        await this.put({ url: `api/multi${this._path}/r/${sub}`, form: { model: JSON.stringify({ name: sub }) } });
        return this;
    }
    async copy(newName) {
        const name = await this.traw.getMyName();
        throw new exceptions_1.NotImplemented();
        //@ts-ignore
        return this.post({
            url: 'api/multi/copy',
            form: {
                from: this._path,
                to: `/user/${name}/m/${newName}`,
                display_name: newName
            }
        });
    }
    async delete() {
        await this.traw.delete({ url: `api/multi${this._path}` });
        return this;
    }
    async edit(options) {
        const display_name = options.name?.length ? options.name : this.name;
        throw new exceptions_1.NotImplemented();
        //@ts-ignore
        return this.put({
            url: `api/multi${this._path}`,
            form: {
                model: JSON.stringify({
                    description_md: options.description,
                    display_name,
                    icon_name: options.icon_name,
                    key_color: options.key_color,
                    visibility: options.visibility,
                    weighting_scheme: options.weighting_scheme
                })
            }
        });
    }
    async removeSubreddit(sub) {
        await this.traw.delete({ url: `api/multi${this._path}/r/${typeof sub === 'string' ? sub : sub.display_name}` });
        return this;
    }
    async rename(newName) {
        const name = await this.traw.getMyName();
        throw new exceptions_1.NotImplemented();
        //@ts-ignore
        return this.post({
            url: 'api/multi/rename',
            form: {
                from: this._path,
                to: `/user/${name}/m/${newName}`,
                display_name: newName
            }
        });
    }
}
exports.default = MultiReddit;
