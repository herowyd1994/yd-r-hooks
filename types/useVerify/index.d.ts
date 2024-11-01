import { Action, Store, Data, Values } from './types';
declare const _default: <S extends Store, K extends keyof S = keyof S>(initStore: S | (() => S)) => Data<S> & {
    dispatch: (action: Action<S>) => Promise<Values<S>>;
    reset: (keys?: K | K[] | "*") => Promise<Values<S>>;
    validate: (keys?: K | K[] | "*") => Promise<Values<S>>;
    getValues: import("../useLatest/types").Handler<Values<S>>;
    getErrMsg: (key: K) => string;
};
export default _default;
