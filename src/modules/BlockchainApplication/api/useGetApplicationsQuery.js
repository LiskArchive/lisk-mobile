import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { usePinBlockchainApplication } from '../hooks/usePinBlockchainApplication';
import { BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';
import { selectApplications as selectApplicationsSelector } from '../store/selectors';
import { setApplications as setApplicationsAction } from '../store/actions';

/**
 * Hook for fetching blockchain applications metadata and manage the network
 * request state.
 * @returns {Object} - The applications data, a isLoading flag to indicate if
 * the data is loading (network request) and isError object containing an
 * error if occurred during the API call.
 */
export function useGetApplicationsMetaQuery() {
	// TODO: Replace data, isLoading and isError
	// by React Query when package integration is done.
	const [data, setData] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(undefined);

	const applicationsState = useSelector(selectApplicationsSelector);
	const dispatch = useDispatch();

	const { checkPinByChainId } = usePinBlockchainApplication();

	function query() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({ data: BLOCKCHAIN_APPLICATIONS_MOCK });
			}, 250);
		});
	}

	useEffect(() => {
		query()
			.then(res => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch(error => setIsError(error));
	}, []);

	useEffect(() => {
		if (data) {
			const applications = data
				.concat([...Object.values(applicationsState)])
				.map(app => ({ ...app, isPinned: checkPinByChainId(app.chainID) }))
				.sort(a => (a.isPinned ? -1 : 1));

			dispatch(setApplicationsAction(applications));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, checkPinByChainId, dispatch]);

	return { data, isLoading, isError };
}
