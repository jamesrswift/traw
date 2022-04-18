import { api_type } from "../../tier0/constants";
import { NotImplemented } from "../../tier0/exceptions";
import traw from "../traw";
import { buildRepliesTree, handleJsonErrors } from "../traw/helpers";
import _ from 'lodash'

export default interface More{
    children: any;
}

export interface MorefetchMoreOptions {
    amount: number;
    skipReplies: boolean;
}

export default class More {

    constructor(options: Partial<More>, public traw?: traw){
        Object.assign(this, options);
    }

    public async fetchMore(options: MorefetchMoreOptions, startIndex: number = 0, children: any = {}, nested: boolean = false ){
        if ( options.amount <= 0 || startIndex >= this.children.length ){
            return [];
        }

        if (!options.skipReplies){
            return this.fetchTree(options, startIndex, children, nested);
        }

        const ids = getNextIdSlice(this.children, startIndex, options.amount, MAX_API_INFO_AMOUNT).map((id: string) => `t1_${id}`);
        const thisBatch = await this.traw!.getListing({uri: 'api/info', qs: {id: ids.join(',')}});
        Object.assign(children, thisBatch._children)
        const nextRequestOptions = {...options, amount: options.amount - ids.length};
        const remainingItems = await this.fetchMore(nextRequestOptions, startIndex + ids.length, children, true);
        const res = _.flatten([thisBatch, remainingItems]);
        if (!nested) {
        res._children = children;
        }
        return res;
    }

    async fetchTree (options: MorefetchMoreOptions, startIndex: number = 0, children: any = {}, nested: boolean = false ) {
        if (options.amount <= 0 || startIndex >= this.children.length) {
            return [];
        }
        const ids = getNextIdSlice(this.children, startIndex, options.amount, MAX_API_MORECHILDREN_AMOUNT);
        const res = await this.traw!.get({
            url: 'api/morechildren',
            params: {api_type, children: ids.join(','), link_id: this.link_id || this.parent_id}
        });
        handleJsonErrors(res);
        let resultTrees = buildRepliesTree(res.data.json.data.things.map(addEmptyRepliesListing));
        Object.assign(children, res._children);
        /**
         * Sometimes, when sending a request to reddit to get multiple comments from a `more` object, reddit decides to only
         * send some of the requested comments, and then stub out the remaining ones in a smaller `more` object. ( ¯\_(ツ)_/¯ )
         * In these cases, recursively fetch the smaller `more` objects as well.
         */
        const childMores = _.remove(resultTrees, c => c instanceof More);
        _.forEach(childMores, c => c.link_id = this.link_id || this.parent_id);
        const expandedTrees = await Promise.all(childMores.map(c => c.fetchTree({...options, amount: Infinity}, 0, children, true)));
        const nexts = await this.fetchMore({...options, amount: options.amount - ids.length}, startIndex + ids.length, children, true);
        resultTrees = _.concat(resultTrees, _.flatten(expandedTrees), nexts);
        if (!nested) {
          resultTrees._children = children;
        }
        return resultTrees;
      }


}

export const emptyChildren = new More({children: []})

function getNextIdSlice (children: any, startIndex: number, desiredAmount: number, limit: number) {
	return children.slice(startIndex, startIndex + Math.min(desiredAmount, limit));
}