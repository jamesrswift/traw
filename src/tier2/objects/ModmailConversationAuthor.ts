import RedditContent from "../mixins/RedditContent";
import Comment from "./Comment";
import traw from "../traw";
import RedditUser from "./RedditUser";
import Submission from "./Submission";

export interface BanStatus {
	endDate?: string | null;
	reason: string;
	isBanned: boolean;
	isPermanent: boolean;
}

export interface RecentPost {
	date: string;
	permalink: string;
	title: string;
}

export interface RecentConvo {
	date: string;
	permalink: string;
	id: string;
	subject: string;
}

export interface RecentComment {
	date: string;
	permalink: string;
	title: string;
	comment: string;
}

export default interface ModmailConversationAuthor
	extends RedditContent<ModmailConversationAuthor> {
	name: string;
	isMod?: boolean;
	isAdmin?: boolean;
	isOp?: boolean;
	isParticipant?: boolean;
	isHidden?: boolean;
	isDeleted?: boolean;

	// these fields only show up sometimes
	banStatus?: BanStatus;
	isSuspended?: boolean;
	isShadowBanned?: boolean;
	recentPosts?: { [id: string]: RecentPost };
	recentConvos?: { [id: string]: RecentConvo };
	recentComments?: { [id: string]: RecentComment };
}

export default class ModmailConversationAuthor extends RedditContent<ModmailConversationAuthor> {
	constructor(options: any, traw: traw, hasFetched: boolean) {
		super(options, traw, hasFetched);

		options.recentComments = Object.keys(options.recentComments).map(
			(commentId) =>
				new Comment(
					{
						name: commentId,
						...options.recentComments[commentId],
					},
					this.traw
				)
		);

		options.recentPosts = Object.keys(options.recentPosts).map(
			(postId) =>
				new Submission(
					{
						name: postId,
						...options.recentPosts[postId],
					},
					this.traw,
					false
				)
		);
	}

	/**
	 * @summary Gets information on a Reddit user for the given modmail.
	 * @returns {RedditUser} An unfetched RedditUser object for the requested user
	 * @example
	 *
	 * r.getNewModmailConversation('efy3lax').getParticipant().getUser()
	 * // => RedditUser { name: 'not_an_aardvark' }
	 * r.getNewModmailConversation('efy3lax').getParticipant().getUser().link_karma.then(console.log)
	 * // => 6
	 */
	getUser(): Promise<RedditUser> {
		return this.traw.getUser(this.name);
	}
}
