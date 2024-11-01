declare const _default: <S extends Record<string, any>, K extends keyof S = keyof S>(initStore: S | (() => S)) => S & {
    refs: S;
    forceUpdate: () => void;
    reset: (keys?: K | K[] | "*") => void;
};
export default _default;
