import { useStore, useUnmount, useLock, useUpdate, useLatest } from '../index';
import { useMemo, useRef } from 'react';
export default ({ time: t, reset = false, delay, formatTime = time => time }) => {
    const { count, $dispatch } = useStore({ count: t });
    const time = useMemo(() => formatTime(count), [count]);
    const timer = useRef();
    const { isLocking, done: countDown, unLock } = useLock(() => new Promise(async (resolve) => {
        let count = t;
        timer.current = setInterval(() => {
            count -= 1;
            $dispatch({ count });
            count <= 0 && resolve(abort());
        }, 1000);
    }), delay);
    const abort = useLatest(() => {
        clearInterval(timer.current);
        reset && $dispatch({ count: t });
        return unLock();
    });
    useUpdate(() => !isLocking && $dispatch({ count: t }), [isLocking, t]);
    useUnmount(abort);
    return {
        time,
        isLocking,
        countDown,
        abort
    };
};
