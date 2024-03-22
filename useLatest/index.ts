/** @format */

import { useCallback, useRef } from 'react';
import { Handler } from './types';

export default <V>(handler: Handler<V>) => {
    const fn = useRef<Handler<V>>(handler);
    fn.current = handler;
    return useCallback<Handler<V>>((...args: any[]) => fn.current(...args), []);
};
