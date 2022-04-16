import { AxiosResponse } from "axios";
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

export function handleJsonErrors(response: any) {
	/*if (!isEmpty(response) && !isEmpty(response.json.errors)) {
		throw new Error(response.json.errors[0]);
	}*/
}

export function getEmptyRepliesListing <ArgType extends ReplyableContent<Type>, Type extends ReplyableContent<Type> >(item: ArgType) : Listing<Type>
{

	if ( item instanceof Comment){
		return new Listing<Type>( {
			uri: `comments/${(item.link_id || item.parent_id).slice(3)}`,
			_query: {comment: item.name.slice(3), sort: item._sort},
			_transform: undefined /* property('comments[0].replies') */,
			_link_id: item.link_id,
			_isCommentList: true
		}, item.traw)
	}

	if ( item instanceof Submission ){
		return new Listing<Type>({
			uri: `comments/${item.id}`,
			_transform: undefined /* property('comments') */,
			_isCommentList: true
		}, item.traw)
	}
	
	return new Listing<Type>({}, item.traw);
  }

export function addEmptyRepliesListing<Type extends ReplyableContent<Type>>(item: Type) {
	throw new NotImplemented();
	return item;
}

export function buildRepliesTree(childList: any) {
	throw new NotImplemented();
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