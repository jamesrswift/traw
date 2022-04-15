import { AxiosResponse } from "axios";
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
	/*item.replies = getEmptyRepliesListing(item);*/
	return item;
}

export function buildRepliesTree(childList: any) {
	/*const childMap = keyBy(childList, "name");
	childList.forEach(addEmptyRepliesListing);
	childList
		.filter((child) => child.constructor._name === "Comment")
		.forEach((child) => (child.replies._more = emptyMoreObject));
	remove(childList, (child) => childMap[child.parent_id]).forEach((child) => {
		if (child.constructor._name === "More") {
			childMap[child.parent_id].replies._setMore(child);
			child.link_id = childMap[child.parent_id].link_id;
		} else {
			childMap[child.parent_id].replies.push(child);
		}
	});
	return childList;*/
}
