/** @format */

import { useReactive } from '../index';
import { Handler } from '../useLatest/types';

export default <V>(handler: Handler<V>, time: number = 1500) => {
    const { pTime, $refs } = useReactive({ pTime: 0 });
    return (...args: any[]) =>
        new Promise(resolve => {
            const cTime = Date.now();
            if (cTime - pTime >= time) {
                $refs.pTime = cTime;
                resolve(handler(...args));
            }
        });
};
