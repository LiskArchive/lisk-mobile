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
            dispatchData: jest.fn(),
            status: 'success',
            setStatus: jest.fn(),
            error: null,
            setError: jest.fn(),
          },
          pins: {
            data: mockApplicationsFullData.map((app) => app.chainID),
            dispatchData: jest.fn(),
            status: 'success',
            setStatus: jest.fn(),
            error: null,
            setError: jest.fn(),
          },
          currentApplication: {
            data: mockCurrentApplication,
            setData: jest.fn(),
            status: 'success',
            setStatus: jest.fn(),
            error: null,
            setError: jest.fn(),
          },
        }}
      >
        {children}
      </ApplicationsContext.Provider>
    ),
  });
}
