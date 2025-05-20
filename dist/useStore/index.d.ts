import { Action, Callback } from './types';
declare const _default: <S extends Record<string, any>, K extends keyof S = keyof S>(initStore: S | (() => S)) => S & {
    $dispatch: (action: Action<S>) => Promise<S>;
    $reset: (keys?: K | K[] | "*") => Promise<S>;
    $subscribe: (callback: Callback<S>) => () => Callback<S>[];
};
export default _default;
