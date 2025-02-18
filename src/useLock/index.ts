/** @format */

import { useLatest, useReactive } from '../index';
import { Handler } from '../useLatest/types';
import { useRef } from 'react';

export default <V>(handler: Handler<V>, delay: number = 250) => {
    const { isLocking, $refs } = useReactive({ isLocking: false });
    const { current } = useRef(new Set<NodeJS.Timeout>());
    const done = useLatest(async (...args) => {
        if (isLocking) {
            return Promise.reject('useLock Lock');
        }
        try {
            $refs.isLocking = true;
            const res = await handler(...args);
            await unLock(delay);
            return res;
        } catch (err) {
            await unLock();
            return Promise.reject(err);
        }
    });
    const unLock = async (time: number = 0) =>
        new Promise<void>(resolve => {
            current.add(
                setTimeout(() => {
                    current.forEach(t => clearTimeout(t));
                    current.clear();
                    $refs.isLocking = false;
                    resolve();
                }, time)
            );
        });
    return {
        isLocking,
        done,
        unLock
    };
};
