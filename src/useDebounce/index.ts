/** @format */

import { useRef } from 'react';
import { Handler } from '../useLatest/types';

export default <V>(handler: Handler<V>, delay: number = 250) => {
    const timer = useRef<NodeJS.Timeout>(void 0);
    return (...args: any[]) =>
        new Promise(resolve => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => resolve(handler(...args)), delay);
        });
};
