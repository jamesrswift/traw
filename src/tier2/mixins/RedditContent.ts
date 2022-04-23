import traw from "../traw";
import { NotImplemented } from "../../tier0/exceptions";
import { AxiosResponse } from "axios";

export default interface RedditContent<Type extends RedditContent<Type>> {
	created_utc: number;
	created: number;

	/** @description A prefixed ID of the RedditContent object */
	id: string;
	name: string;
}

/**
 * @Category Reddit Objects
 */
export default abstract class RedditContent<Type extends RedditContent<Type>> {
	protected _fetch?: Type;

	constructor(
		options: Partial<Type>,
		public traw: traw,
		protected _hasFetched: boolean = false
	) {
		// parse options
		for (const key of Object.keys(options)) {
			// @ts-expect-error
			this[key] = options[key];
		}

		this._fetch = undefined;
	}

	public async fetch(): Promise<Type> {
		if (!this._fetch) {
			let response = await this.get({ url: this.uri });
			this._fetch = this.transformApiResponse(response);
		}

		// this._fetch is definitely defined as this point in the code flow
		return this._fetch!;
	}

	public async refresh(): Promise<Type> {
		return await this.fetch();
	}

	/** @deprecated */ public toJSON() {
		throw new NotImplemented();
	}

	/**
	 * @internal
	 */
	protected transformApiResponse(response: AxiosResponse<Type, any>): Type {
		throw new NotImplemented();

		// @ts-expect-error
		return response;
	}

	/**
	 * @internal
	 */
	public clone(deep: boolean = false): Type {
		throw new NotImplemented();
	}

	/**
	 * @internal
	 * @description The URI from which the object can be updated.
	 */
	public get uri(): string {
		throw new NotImplemented();
	}

	/** @internal */ public get(options: any) {
		return this.traw.get(options);
	}
	// /** @internal */ public delete( options: any ){ return this.traw.delete(options) }
	/** @internal */ public head(options: any) {
		return this.traw.head(options);
	}
	/** @internal */ public patch(options: any) {
		return this.traw.patch(options);
	}
	/** @internal */ public post(options: any) {
		return this.traw.post(options);
	}
	/** @internal */ public put(options: any) {
		return this.traw.put(options);
	}
}
