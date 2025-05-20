import { MutableRefObject } from 'react';
export type Mount<V> = (context: MutableRefObject<V | undefined>) => any;
export type Handler = () => ReturnType<Mount<unknown>>;
