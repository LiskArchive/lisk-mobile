/* eslint-disable max-statements */
import React, { createContext, useContext, useReducer, useState } from 'react';

import { applicationsContextReducer, applicationPinsContextReducer } from './utils';

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
  const [applicationStatus, setApplicationStatus] = useState(false);
  const [_errorOnApplications, setErrorOnApplications] = useState();

  const [pins, dispatchPins] = useReducer(applicationPinsContextReducer);

  const [currentApplication, setCurrentApplication] = useState();
  const [currentApplicationStatus, setCurrentApplicationStatus] = useState(false);
  const [errorOnCurrentApplication, setErrorOnCurrentApplication] = useState();

  return (
    <ApplicationsContext.Provider
      value={{
        applications: {
          data: applications,
          dispatchData: dispatchApplications,
          status: applicationStatus,
          setStatus: setApplicationStatus,
          error: _errorOnApplications,
          setError: setErrorOnApplications,
        },
        pins: {
          data: pins,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: undefined,
          refetch: () => {},
        },
        currentApplication: {
          data: currentApplication,
          setData: setCurrentApplication,
          status: currentApplicationStatus,
          setStatus: setCurrentApplicationStatus,
          error: errorOnCurrentApplication,
          setError: setErrorOnCurrentApplication,
        },
        dispatchPins,
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
