/** @format */

import { useLatest } from '../index';
import { Handler } from '../useLatest/types';
import { useRef } from 'react';
import { sleep } from '@yd/utils';

export default <V>(handler: Handler<V>, delay: number = 250) => {
    const lock = useRef(false);
    const done = useLatest(async (...args: any[]) => {
        if (lock.current) {
            return Promise.reject('useLock Lock');
        }
        try {
            lock.current = true;
            const res = await handler(...args);
            await unLock(delay);
            return res;
        } catch (err: any) {
            await unLock();
            return Promise.reject(err);
        }
    });
    const unLock = async (time: number = 0) => {
        await sleep(time);
        lock.current = false;
    };
    return {
        lock: lock.current,
        done,
        unLock
    };
};
