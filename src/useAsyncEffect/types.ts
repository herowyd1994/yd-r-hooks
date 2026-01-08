/** @format */

import { RefObject } from 'react';

export type Mount<V> = (context: RefObject<V | undefined>) => any;
export type Handler = () => ReturnType<Mount<unknown>>;
