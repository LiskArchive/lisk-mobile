import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SendLsk from '../lsk';

const mockStore = configureMockStore();

const mockStoreProps = {
  service: {
    priceTicker: {
      LSK: {
        currency: 'USD'
      }
    }
  },
  settings: {
    language: 'en'
  }
};

const store = mockStore(mockStoreProps);

const mockProps = {
  settings: {
    token: {
      active: 'LSK'
    }
  },
  accounts: {
    info: {
      LSK: {
        balance: 100000000,
        nonce: 5
      }
    }
  },
  pricesRetrieved: jest.fn(),
  dynamicFeesRetrieved: jest.fn(),
  navigation: {
    state: { params: {} },
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn()
  },
  sharedData: {}
};

test('Renders Send LSK correctly', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  expect(getAllByText('Available Balance')).toHaveLength(1);
});

test('Renders correct balance of User LSK', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  expect(getAllByText('1 LSK')).toHaveLength(1);
});
