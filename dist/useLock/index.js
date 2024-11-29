import { useLatest, useReactive } from '../index';
import { useRef } from 'react';
export default (handler, delay = 500) => {
    const { lock, refs } = useReactive({ lock: false });
    const { current } = useRef(new Set());
    const done = useLatest(async (...args) => {
        if (refs.lock) {
            return Promise.reject('useLock Lock');
        }
        try {
            refs.lock = true;
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
            refs.lock = false;
            resolve();
        }, time));
    });
    return {
        lock,
        done,
        unLock
    };
};
