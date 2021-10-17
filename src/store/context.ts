import { createContext } from 'react';

export const AppContext = createContext({ count: 0, increment: () => {} });
