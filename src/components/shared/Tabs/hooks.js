import { createContext, useContext } from 'react';

export const TabsContext = createContext();

export function useTabs() {
  return useContext(TabsContext);
}
