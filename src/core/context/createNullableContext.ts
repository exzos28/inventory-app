import {createContext} from 'react';

export default <T extends any>() => createContext<T | undefined>(undefined);
