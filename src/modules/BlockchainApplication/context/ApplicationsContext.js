/* eslint-disable max-statements */
import React, { createContext, useContext, useReducer, useState } from 'react';

import {
  applicationsContextReducer,
  applicationPinsContextReducer,
} from './ApplicationsContext.utils';
import { LISK_TESTNET_APPLICATION } from './ApplicationsContext.constants';

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
  const [isLoadingApplications, setIsLoadingApplications] = useState();
  const [isSuccessApplications, setIsSuccessApplications] = useState();
  const [errorOnApplications, setErrorOnApplications] = useState();

  const [pins, dispatchPins] = useReducer(applicationPinsContextReducer);
  const [pinsStatus, setPinsStatus] = useState(false);
  const [errorOnPins, setErrorOnPins] = useState();

  const [, setCurrentApplication] = useState();
  const [currentApplicationStatus, setCurrentApplicationStatus] = useState();
  const [errorOnCurrentApplication, setErrorOnCurrentApplication] = useState();

  return (
    <ApplicationsContext.Provider
      value={{
        applications: {
          data: applications,
          dispatchData: dispatchApplications,
          isLoading: isLoadingApplications,
          setIsLoading: setIsLoadingApplications,
          isSuccess: isSuccessApplications,
          setIsSuccess: setIsSuccessApplications,
          error: errorOnApplications,
          setError: setErrorOnApplications,
        },
        pins: {
          data: pins,
          dispatchData: dispatchPins,
          status: pinsStatus,
          setStatus: setPinsStatus,
          error: errorOnPins,
          setError: setErrorOnPins,
        },
        currentApplication: {
          data: LISK_TESTNET_APPLICATION,
          setData: setCurrentApplication,
          status: currentApplicationStatus,
          setStatus: setCurrentApplicationStatus,
          error: errorOnCurrentApplication,
          setError: setErrorOnCurrentApplication,
        },
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
