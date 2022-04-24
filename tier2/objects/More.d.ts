import traw from "../traw";
export default interface More {
    children: any;
}
export interface MorefetchMoreOptions {
    amount: number;
    skipReplies: boolean;
}
export default class More {
    traw?: traw | undefined;
    constructor(options: Partial<More>, traw?: traw | undefined);
    fetchMore(options: MorefetchMoreOptions, startIndex?: number, children?: any, nested?: boolean): Promise<void>;
    fetchTree(options: MorefetchMoreOptions, startIndex?: number, children?: any, nested?: boolean): Promise<void>;
}
export declare const emptyChildren: More;
