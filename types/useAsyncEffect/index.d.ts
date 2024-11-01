import { DependencyList } from 'react';
import { Mount, Handler } from './types';
export declare const useAsyncEffect: <V>(mount?: Mount<V>, unMount?: Mount<V> | DependencyList, deps?: DependencyList) => void;
export declare const useMount: (handler: Handler) => void;
export declare const useUnmount: (handler: Handler) => void;
export declare const useUpdate: (handler: Handler, deps: DependencyList, skip?: number) => void;
