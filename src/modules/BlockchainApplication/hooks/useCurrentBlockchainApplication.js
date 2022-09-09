import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import apiClient from 'utilities/api/APIClient'
import { selectCurrentApplication } from '../store/selectors'
import { setCurrentApplication as setCurrentApplicationAction } from '../store/actions'

/**
 * Hook that manages the blockchain application currently logged in
 * by the user.
 *
 * @returns {Array} - Containing (1) Current blockchain application
 * in use and (2) the corresponding handler to set that application.
 */
export function useCurrentBlockchainApplication() {
  const dispatch = useDispatch()

  const currentApplication = useSelector(selectCurrentApplication)

  const setCurrentApplication = useCallback(
    (application) => {
      dispatch(setCurrentApplicationAction(application))

      apiClient.create(application?.serviceURLs[0])
    },
    [dispatch]
  )

  return [currentApplication, setCurrentApplication]
}
