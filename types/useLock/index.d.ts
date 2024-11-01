import { Handler } from '../useLatest/types';
declare const _default: <V>(handler: Handler<V>, delay?: number) => {
    lock: boolean;
    done: Handler<Promise<V>>;
    unLock: (time?: number) => Promise<void>;
};
export default _default;
