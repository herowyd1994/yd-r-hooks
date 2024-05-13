/** @format */

import { useStore, useUnmount, useLock, useUpdate, useLatest } from '../index';
import { Props } from './types';
import { useMemo, useRef } from 'react';

export default ({ time: t, reset: r = false, delay, formatTime = (time) => time }: Props) => {
    const { count, dispatch, reset } = useStore({ count: t });
    const time = useMemo(() => formatTime(count), [count]);
    const timer = useRef<NodeJS.Timer>();
    const { done: onCountDown, unLock } = useLock(
        () =>
            new Promise(async (resolve) => {
                let count = t;
                timer.current = setInterval(() => {
                    count -= 1;
                    dispatch({ count });
                    if (count > 0) {
                        return;
                    }
                    resolve(onAbort());
                }, 1000);
            }),
        delay
    );
    const onAbort = useLatest(() => {
        clearInterval(timer.current);
        timer.current = void 0;
        r && dispatch({ count: t });
        return unLock();
    });
    useUpdate(() => !timer.current && dispatch({ count: t }), [t]);
    useUnmount(onAbort);
    return {
        time,
        onCountDown,
        onAbort
    };
};
