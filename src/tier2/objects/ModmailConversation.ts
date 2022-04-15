import Subreddit from "./Subreddit";
import RedditContent from "../mixins/RedditContent";
import RedditUser from "./RedditUser";
import ModmailConversationAuthor from "./ModmailConversationAuthor";
import { NotImplemented } from "../../tier0/exceptions";

export enum conversationStates {
	New = 0,
	InProgress = 1,
	Archived = 2,
}

export enum modActionStates {
	Highlight = 0,
	UnHighlight = 1,
	Archive = 2,
	UnArchive = 3,
	ReportedToAdmins = 4,
	Mute = 5,
	Unmute = 6,
}

export interface ModmailMessage {
	body: string;
	bodyMarkdown: string;
	author: RedditUser;
	isInternal: boolean;
	date: string;
	id: string;
}

export interface Author {
	isMod: boolean;
	isAdmin: boolean;
	name: string;
	isOp: boolean;
	isParticipant: boolean;
	isHidden: boolean;
	id: any;
	isDeleted: boolean;
}

export interface Owner {
	displayName: string;
	type: string;
	id: string;
}

export interface ObjId {
	id: string;
	key: string;
}

export default interface ModmailConversation
	extends RedditContent<ModmailConversation> {
	isAuto: boolean;
	objIds: ObjId[];
	isRepliable: boolean;
	lastUserUpdate?: any;
	isInternal: boolean;
	lastModUpdate: Date;
	lastUpdated: Date;
	authors: Author[];
	// sometimes an Owner, sometimes a Subreddit
	owner: Owner | Subreddit;
	id: string;
	isHighlighted: boolean;
	subject: string;
	participant: ModmailConversationAuthor;
	state: number;
	lastUnread?: any;
	numMessages: number;
	messages?: ModmailMessage[];
}

export default class ModmailConversation extends RedditContent<ModmailConversation> {
	static conversationStates: conversationStates;
	static modActionStats: modActionStates;

	public async reply(
		body: string,
		isAuthorHidden?: boolean,
		isInternal?: boolean
	): Promise<this> {
		throw new NotImplemented();
	}

	public async getParticipant(): Promise<ModmailConversationAuthor> {
		throw new NotImplemented();
	}

	public async isRead(): Promise<boolean> {
		throw new NotImplemented();
	}

	public async read(): Promise<this> {
		throw new NotImplemented();
	}

	public async unread(): Promise<this> {
		throw new NotImplemented();
	}

	public async mute(): Promise<this> {
		throw new NotImplemented();
	}

	public async unmute(): Promise<this> {
		throw new NotImplemented();
	}

	public async highlight(): Promise<this> {
		throw new NotImplemented();
	}

	public async unhighlight(): Promise<this> {
		throw new NotImplemented();
	}

	public async archive(): Promise<this> {
		throw new NotImplemented();
	}

	public async unarchive(): Promise<this> {
		throw new NotImplemented();
	}
}
