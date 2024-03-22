/** @format */

import { useStore, useUnmount, useLock, useUpdate, useLatest } from '../index';
import { Props } from './types';
import { useMemo, useRef } from 'react';

export default ({ time: t, reset = false, delay, formatTime = (time) => time }: Props) => {
    const { count, dispatch, reset: r } = useStore({ count: t });
    const time = useMemo(() => formatTime(count), [count]);
    const timer = useRef<NodeJS.Timer>();
    const { done: onCountDown, unLock } = useLock(
        () =>
            new Promise<string | number>(async (resolve) => {
                let { count } = await r();
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
    const onAbort = useLatest(async () => {
        await unLock();
        clearInterval(timer.current);
        reset && (await r());
        return time;
    });
    useUpdate(() => dispatch({ count: t }), [t]);
    useUnmount(onAbort);
    return {
        time,
        onCountDown,
        onAbort
    };
};
