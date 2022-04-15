import traw from "../traw";
import RedditContent from "./RedditContent";

export default interface FactoryEnabledClass<Type extends FactoryEnabledClass<Type>> {
    traw: traw
    _hasFetched: boolean
    new( options: Partial<Type>, traw: traw, _hasFetched: boolean ) : Type;
}