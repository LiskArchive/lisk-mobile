import { createContext, useContext } from 'react';

export const PickerContext = createContext({});

export function usePicker() {
  return useContext(PickerContext);
}
