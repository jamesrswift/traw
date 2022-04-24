"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../../tier0/exceptions");
/**
 * @Category Reddit Objects
 */
class RedditContent {
    traw;
    _hasFetched;
    _fetch;
    constructor(options, traw, _hasFetched = false) {
        this.traw = traw;
        this._hasFetched = _hasFetched;
        // parse options
        for (const key of Object.keys(options)) {
            // @ts-expect-error
            this[key] = options[key];
        }
        this._fetch = undefined;
    }
    async fetch() {
        if (!this._fetch) {
            let response = await this.get({ url: this.uri });
            this._fetch = this.transformApiResponse(response);
        }
        // this._fetch is definitely defined as this point in the code flow
        return this._fetch;
    }
    async refresh() {
        return await this.fetch();
    }
    /** @deprecated */ toJSON() {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @internal
     */
    transformApiResponse(response) {
        throw new exceptions_1.NotImplemented();
        // @ts-expect-error
        return response;
    }
    /**
     * @internal
     */
    clone(deep = false) {
        throw new exceptions_1.NotImplemented();
    }
    /**
     * @internal
     * @description The URI from which the object can be updated.
     */
    get uri() {
        throw new exceptions_1.NotImplemented();
    }
    /** @internal */ get(options) {
        return this.traw.get(options);
    }
    // /** @internal */ public delete( options: any ){ return this.traw.delete(options) }
    /** @internal */ head(options) {
        return this.traw.head(options);
    }
    /** @internal */ patch(options) {
        return this.traw.patch(options);
    }
    /** @internal */ post(options) {
        return this.traw.post(options);
    }
    /** @internal */ put(options) {
        return this.traw.put(options);
    }
}
exports.default = RedditContent;
