import { useContext } from 'react';

// eslint-disable-next-line import/no-cycle
import { PickerContext } from './index';

export function usePicker() {
  return useContext(PickerContext);
}
