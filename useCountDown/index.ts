/** @format */

import { useStore, useUnmount, useLock, useUpdate, useLatest } from '../index';
import { Props } from './types';
import { useMemo, useRef } from 'react';

export default ({ time: t, reset: r = false, delay, formatTime = (time) => time }: Props) => {
    const { count, dispatch } = useStore({ count: t });
    const time = useMemo(() => formatTime(count), [count]);
    const timer = useRef<NodeJS.Timer>();
    const {
        done: countDown,
        unLock,
        lock
    } = useLock(
        () =>
            new Promise(async (resolve) => {
                let count = t;
                timer.current = setInterval(() => {
                    count -= 1;
                    dispatch({ count });
                    if (count > 0) {
                        return;
                    }
                    resolve(abort());
                }, 1000);
            }),
        delay
    );
    const abort = useLatest(() => {
        clearInterval(timer.current as any);
        r && dispatch({ count: t });
        return unLock();
    });
    useUpdate(() => !lock && dispatch({ count: t }), [t]);
    useUnmount(abort);
    return {
        time,
        countDown,
        abort
    };
};
