/** @format */

import { useStore, useUnmount, useLock, useUpdate, useLatest } from '../index';
import { Props } from './types';
import { useMemo, useRef } from 'react';

export default ({ time: t, reset: r = false, delay, formatTime = time => time }: Props) => {
    const { count, dispatch } = useStore({ count: t });
    const time = useMemo(() => formatTime(count), [count]);
    const timer = useRef<NodeJS.Timeout>();
    const {
        done: countDown,
        unLock,
        lock
    } = useLock(
        () =>
            new Promise<Promise<void>>(async resolve => {
                let count = t;
                timer.current = setInterval(() => {
                    count -= 1;
                    dispatch({ count });
                    count <= 0 && resolve(abort());
                }, 1000);
            }),
        delay
    );
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
