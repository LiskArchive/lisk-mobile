import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectPinnedApplications } from '../store/selectors';
import { toggleApplicationPin } from '../store/actions';

export function usePinBlockchainApplication() {
  const dispatch = useDispatch();
  const pins = useSelector(selectPinnedApplications);

  const togglePin = useCallback((chainId) => dispatch(toggleApplicationPin(chainId)), []);
  const checkPinByChainId = useCallback((chainId) => pins.includes(chainId), [pins]);
  return {
    pins, togglePin, checkPinByChainId,
  };
}
