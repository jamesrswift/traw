/// <reference types="node" />
import url from 'url';
export declare const URLSearchParams: {
    new (init?: string | URLSearchParams | string[][] | Record<string, string> | undefined): URLSearchParams;
    prototype: URLSearchParams;
    toString(): string;
} | typeof url.URLSearchParams;
export default URLSearchParams;
