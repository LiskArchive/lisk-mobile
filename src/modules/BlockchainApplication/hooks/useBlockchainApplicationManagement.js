import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
	addApplicationByChainId as addApplicationAction,
	deleteApplicationByChainId as deleteApplicationAction,
} from '../store/actions';
import { useCurrentBlockchainApplication } from './useCurrentBlockchainApplication';
import { BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import { useGetApplicationsMetaQuery } from '../api/useGetApplicationsQuery';

/**
 * Hook that handle all the logic related to blockchain applications management.
 * Enables the component/hooks to use applications logic from one single place.
 *
 * @returns {Object} - Available blockchain applications array, a set
 * application handler, get application by chain ID handler and  a delete
 * application by ID handler.
 */
export function useBlockchainApplicationManagement() {
	const dispatch = useDispatch();

	const [currentApplication, setCurrentApplication] = useCurrentBlockchainApplication();

	const applications = useGetApplicationsMetaQuery();

	const addApplicationByChainId = useCallback(
		application => {
			if (application.isDefault) return;

			dispatch(addApplicationAction(application));
		},
		[dispatch],
	);

	const getApplicationByChainId = useCallback(
		chainId => applications.find(app => app.chainID === chainId),
		[applications],
	);

	const deleteApplicationByChainId = useCallback(
		chainId => {
			dispatch(deleteApplicationAction(chainId));

			if (currentApplication && currentApplication.chainID === chainId) {
				// Set Lisk as default if application in use is being deleted.
				setCurrentApplication(BLOCKCHAIN_APPLICATIONS_MOCK[0]);
			}
		},
		[currentApplication, dispatch, setCurrentApplication],
	);

	return {
		applications,
		addApplicationByChainId,
		getApplicationByChainId,
		deleteApplicationByChainId,
	};
}
