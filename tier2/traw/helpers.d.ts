import { AxiosResponse } from "axios";
export declare function hasFullnamePrefix(item: any): boolean;
export declare function addFullnamePrefix(item: string | any, prefix: string): any;
export declare function handleJsonErrors(response: AxiosResponse<any, any>): void;
/**
* @summary Formats permissions into a '+'/'-' string
* @param {String[]} allPermissionNames All possible permissions in this category
* @param {String[]} permsArray The permissions that should be enabled
* @returns {String} The permissions formatted into a '+'/'-' string
* @api private
*/
export declare function formatPermissions(allPermissionNames: string[], permsArray?: string[]): string;
export declare function formatModPermissions(permsArray?: string[]): string;
export declare function formatLivethreadPermissions(permsArray?: string[]): string;
