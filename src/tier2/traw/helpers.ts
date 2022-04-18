import { AxiosResponse } from "axios";
import _ from "lodash";
import { LIVETHREAD_PERMISSIONS, MODERATOR_PERMISSIONS } from "../../tier0/constants";
import { NotImplemented } from "../../tier0/exceptions";
import ReplyableContent from "../mixins/ReplyableContent";
import Comment from "../objects/Comment";
import Listing from "../objects/Listing";
import Submission from "../objects/Submission";

export function hasFullnamePrefix(item: any) {
	return /^(t\d|LiveUpdateEvent)_/.test(item);
}

export function addFullnamePrefix(item: string | any, prefix: string) {
	if (typeof item === "string") {
		return hasFullnamePrefix(item) ? item : prefix + item;
	}
	return item.name;
}

export function handleJsonErrors(response: AxiosResponse<any,any>) {
	if (!_.isEmpty(response) && !_.isEmpty(response.data.json.errors)) {
		throw new Error(response.data.json.errors[0]);
	}
}



/**
* @summary Formats permissions into a '+'/'-' string
* @param {String[]} allPermissionNames All possible permissions in this category
* @param {String[]} permsArray The permissions that should be enabled
* @returns {String} The permissions formatted into a '+'/'-' string
* @api private
*/
export function formatPermissions (allPermissionNames: string[], permsArray?: string[]) {
	if ( permsArray == undefined ) return '+all';
	return allPermissionNames.map(type => (permsArray.includes(type) ? '+' : '-') + type).join(',')
  }
  
  export function formatModPermissions(permsArray?: string[] ){ return formatPermissions( MODERATOR_PERMISSIONS, permsArray) }
  export function formatLivethreadPermissions(permsArray?: string[] ){ return formatPermissions( LIVETHREAD_PERMISSIONS, permsArray) }