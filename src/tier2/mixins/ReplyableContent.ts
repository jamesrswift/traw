import RedditContent from "./RedditContent";

export default class ReplyableContent<Type> extends RedditContent<Type> {

    approve() : Promise<this> {

    }

    blockAuthor() : Promise<this> {

    }

    ignoreReports() : Promise<this> {

    }

    remove( /* Options needs defining! */ ) : Promise<this> {

    }

    reply(text: string) : Promise<ReplyableContent<T>> {

    }

    report( /* Options needs defining! */ ) : Promise<this>{

    }

    unignoreReports() : Promise<this> {

    }
    
}