/** @format */

import { useLatest, useReactive } from '../index';
import { Handler } from '../useLatest/types';
import { useRef } from 'react';

export default <V>(handler: Handler<V>, delay: number = 250) => {
    const { lock, refs } = useReactive({ lock: false });
    const { current } = useRef(new Set<NodeJS.Timeout>());
    const done = useLatest(async (...args: any[]) => {
        if (refs.lock) {
            return Promise.reject('useLock Lock');
        }
        try {
            refs.lock = true;
            const res = await handler(...args);
            await unLock(delay);
            return res;
        } catch (err: any) {
            await unLock();
            return Promise.reject(err);
        }
    });
    const unLock = async (time: number = 0) => {
        (await sleep(time))();
        refs.lock = false;
    };
    const sleep = (delay: number) =>
        new Promise<() => void>(resolve =>
            current.add(
                setTimeout(
                    () =>
                        resolve(() => {
                            current.forEach(t => clearTimeout(t));
                            current.clear();
                        }),
                    delay
                )
            )
        );
    return {
        lock,
        done,
        unLock
    };
};
