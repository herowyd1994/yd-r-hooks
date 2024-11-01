import { useCallback, useRef } from 'react';
export default (handler) => {
    const fn = useRef(handler);
    fn.current = handler;
    return useCallback((...args) => fn.current(...args), []);
};
