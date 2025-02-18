import { Props } from './types';
declare const _default: ({ time: t, reset, delay, formatTime }: Props) => {
    time: string | number;
    isLocking: boolean;
    countDown: import("../useLatest/types").Handler<Promise<Promise<Promise<void>>>>;
    abort: import("../useLatest/types").Handler<Promise<void>>;
};
export default _default;
