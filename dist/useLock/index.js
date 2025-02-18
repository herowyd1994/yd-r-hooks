import { useLatest, useReactive } from '../index';
import { useRef } from 'react';
export default (handler, delay = 250) => {
    const { isLocking, $refs } = useReactive({ isLocking: false });
    const { current } = useRef(new Set());
    const done = useLatest(async (...args) => {
        if (isLocking) {
            return Promise.reject('useLock Lock');
        }
        try {
            $refs.isLocking = true;
            const res = await handler(...args);
            await unLock(delay);
            return res;
        }
        catch (err) {
            await unLock();
            return Promise.reject(err);
        }
    });
    const unLock = async (time = 0) => new Promise(resolve => {
        current.add(setTimeout(() => {
            current.forEach(t => clearTimeout(t));
            current.clear();
            $refs.isLocking = false;
            resolve();
        }, time));
    });
    return {
        isLocking,
        done,
        unLock
    };
};
