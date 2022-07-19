import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectPinnedApplications } from '../store/selectors';
import { toggleApplicationPin } from '../store/actions';

/**
 * Hook that handle all the logic related to pinning blockchain
 * applications. This enables components/hooks to use pin logic
 * from one single place. Allows user to add/remove a pin by chain ID.
 *
 * @returns {Object} - The pinned applications, a toggle pin handler
 * and a handler for checking pinned application by chain ID.
 */
export function usePinBlockchainApplication() {
	const dispatch = useDispatch();

	const pins = useSelector(selectPinnedApplications);

	const togglePin = useCallback(chainId => dispatch(toggleApplicationPin(chainId)), [dispatch]);

	const checkPinByChainId = useCallback(chainId => pins.includes(chainId), [pins]);

	return { pins, togglePin, checkPinByChainId };
}
