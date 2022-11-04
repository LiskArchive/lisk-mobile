import React from 'react';

import { ApplicationsContext } from 'modules/BlockchainApplication/context/ApplicationsContext';
import {
  mockApplicationsFullData,
  mockCurrentApplication,
} from 'modules/BlockchainApplication/__fixtures__';
import { queryWrapper } from './queryWrapper';

export function applicationsWrapper({ children }) {
  return queryWrapper({
    children: (
      <ApplicationsContext.Provider
        value={{
          applications: {
            data: mockApplicationsFullData,
            isLoading: false,
            isError: false,
            error: undefined,
          },
          dispatchApplications: jest.fn(),
          currentApplication: mockCurrentApplication,
          setCurrentApplication: jest.fn(),
        }}
      >
        {children}
      </ApplicationsContext.Provider>
    ),
  });
}
