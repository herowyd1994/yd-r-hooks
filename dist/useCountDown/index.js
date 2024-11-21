import { useStore, useUnmount, useLock, useUpdate, useLatest } from '../index';
import { useMemo, useRef } from 'react';
export default ({ time: t, reset: r = false, delay, formatTime = time => time }) => {
    const { count, dispatch } = useStore({ count: t });
    const time = useMemo(() => formatTime(count), [count]);
    const timer = useRef();
    const { done: countDown, unLock, lock } = useLock(() => new Promise(async (resolve) => {
        let count = t;
        timer.current = setInterval(() => {
            count -= 1;
            dispatch({ count });
            count <= 0 && resolve(abort());
        }, 1000);
    }), delay);
    const abort = useLatest(() => {
        clearInterval(timer.current);
        r && dispatch({ count: t });
        return unLock();
    });
    useUpdate(() => !lock && dispatch({ count: t }), [lock, t]);
    useUnmount(abort);
    return {
        time,
        countDown,
        abort
    };
};
