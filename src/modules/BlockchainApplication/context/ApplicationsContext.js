/* eslint-disable max-statements */
import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

import { useApplicationsStorage } from '../hooks/useApplicationsStorage';
import { useApplicationsExplorer } from '../hooks/useApplicationsExplorer';
import { APPLICATIONS_STORAGE_KEY, PINNED_APPLICATIONS_STORAGE_KEY } from '../constants';

import {
  applicationsContextReducer,
  applicationPinsContextReducer,
  getInitContextApplications,
} from './utils';

export const ApplicationsContext = createContext();

/**
 * Context provider of Blockchain Applications. Pass down to children the applications and
 * current application state saved locally by the user.
 * @param {Object} children - React nodes to pass down as children.
 * @returns {Object} value - Blockchain applications state (data, isLoading, isError and error),
 * current application selected by the user and functions to dispatch the applications state and
 * current application.
 */
export function ApplicationsProvider({ children }) {
  const [applications, dispatchApplications] = useReducer(applicationsContextReducer);
  const [pins, dispatchPins] = useReducer(applicationPinsContextReducer);
  const [currentApplication, setCurrentApplication] = useState();

  const { getApplications: getApplicationsStorageData } =
    useApplicationsStorage(APPLICATIONS_STORAGE_KEY);
  const { getApplications: getPinnedApplicationsStorageData } = useApplicationsStorage(
    PINNED_APPLICATIONS_STORAGE_KEY
  );

  const {
    data: defaultApplicationsData,
    isLoading: isLoadingDefaultApplications,
    isError: isErrorOnDefaultApplications,
    error: errorOnDefaultApplications,
  } = useApplicationsExplorer({ applicationsConfig: { params: { isDefault: true } } });

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isError: isErrorOnApplications,
    error: errorOnApplications,
  } = useApplicationsExplorer();

  useEffect(() => {
    if (!applications && defaultApplicationsData && applicationsData) {
      getApplicationsStorageData().then((cachedChainIDs) => {
        const initApplications = getInitContextApplications({
          applications: applicationsData,
          defaultApplications: defaultApplicationsData,
          cachedChainIDs,
        });

        dispatchApplications({ type: 'init', applications: initApplications });
      });

      getPinnedApplicationsStorageData().then((cachedPins) => {
        dispatchPins({ type: 'init', pins: cachedPins || [] });
      });
    }

    if (!currentApplication && defaultApplicationsData) {
      setCurrentApplication(defaultApplicationsData[0]);
    }
  }, [
    defaultApplicationsData,
    applicationsData,
    applications,
    currentApplication,
    getApplicationsStorageData,
    getPinnedApplicationsStorageData,
  ]);

  const isLoading = useMemo(
    () => isLoadingDefaultApplications || isLoadingApplications,
    [isLoadingDefaultApplications, isLoadingApplications]
  );
  const error = useMemo(
    () => errorOnDefaultApplications || errorOnApplications,
    [errorOnDefaultApplications, errorOnApplications]
  );
  const isError = useMemo(
    () => isErrorOnDefaultApplications || isErrorOnApplications,
    [isErrorOnDefaultApplications, isErrorOnApplications]
  );

  return (
    <ApplicationsContext.Provider
      value={{
        applications: {
          data: applications,
          isLoading,
          isError,
          error,
        },
        pins: {
          data: pins,
          isLoading,
          isError,
          error,
        },
        dispatchApplications,
        dispatchPins,
        currentApplication,
        setCurrentApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

/**
 * Allows to consume Blockchain Applications context value as hook.
 * @returns {Object} value - Blockchain Applications context value.
 */
export function useApplications() {
  return useContext(ApplicationsContext);
}
