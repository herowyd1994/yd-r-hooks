declare const _default: <V extends Record<string, any>, K extends keyof V = keyof V>(initValue: V | (() => V)) => V & {
    $refs: V;
    $forceUpdate: () => void;
    $reset: (keys?: K | K[] | "*") => void;
};
export default _default;
