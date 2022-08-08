import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import service from 'utilities/api/service';
import account from 'utilities/api/account';
import SendLsk from '../lsk';

jest.mock('utilities/api');
jest.mock('utilities/api/account');
jest.mock('utilities/api/service');

const mockStore = configureMockStore();

const mockStoreProps = {
  account: {
    current: { metadata: { address: 'lskebd9zfkhz6ep9kde24u8h7uxarssxxdnru2xgw' } }
  },
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

describe.skip('Send amount screen', () => {
  beforeEach(() => {
    account.getSummary.mockResolvedValue({
      address: mockStoreProps.account.current.metadata.address,
      balance: '100000000',
      nonce: '10',
    });
  });

  it('Should render Send LSK correctly', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <SendLsk {...mockProps} />
      </Provider>
    );

    expect(getAllByText('Available Balance')).toHaveLength(1);
  });
});

test.skip('Should render correct balance of User LSK', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  expect(getAllByText('1 LSK')).toHaveLength(1);
});

test.skip("Should calculate transaction fee if there's no priority", (done) => {
  const { getAllByText } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  setTimeout(() => {
    expect(getAllByText('0.00138 LSK')).toHaveLength(1);
    done();
  }, 100);
});

test.skip('Should show error message if amount is between 0 and 1e-8', (done) => {
  const { getAllByText, getByLabelText } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  const input = getByLabelText('amount-input');
  act(() => {
    fireEvent.changeText(input, '0.000000001');
    setTimeout(() => {
      expect(getAllByText('Provide a correct amount of LSK')).toHaveLength(1);
      done();
    }, 1000);
  });
});

test.skip('Should show error message if amount to send is a negative value', (done) => {
  const { getAllByText, getByLabelText } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  const input = getByLabelText('amount-input');
  act(() => {
    fireEvent.changeText(input, '-1');
    setTimeout(() => {
      expect(getAllByText('Provide a correct amount of LSK')).toHaveLength(1);
      done();
    }, 1000);
  });
});

test.skip('Should show error message if amount to send is not valid', (done) => {
  const { getAllByText, getByLabelText } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  const input = getByLabelText('amount-input');
  act(() => {
    fireEvent.changeText(input, 'asdf');
    setTimeout(() => {
      expect(getAllByText('Provide a correct amount of LSK')).toHaveLength(1);
      done();
    }, 1000);
  });
});

test.skip('Should show error message if amount to send is empty', (done) => {
  const { getAllByText, getByTestId } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  const submitButton = getByTestId('submit-button');
  fireEvent.press(submitButton);
  act(() => {
    setTimeout(() => {
      expect(getAllByText('Provide a correct amount of LSK')).toHaveLength(1);
      done();
    }, 1000);
  });
});

test.skip('Should re-Calculate transaction fee when the amount to send is changed', (done) => {
  const { getAllByText, getByLabelText } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  const input = getByLabelText('amount-input');
  act(() => {
    fireEvent.changeText(input, '1');
    setTimeout(() => {
      expect(getAllByText('0.00141 LSK')).toHaveLength(1);
      done();
    }, 1000);
  });
});

test.skip('Should re-Calculate transaction fee when message is added', (done) => {
  const { getAllByText, getByLabelText, getByTestId } = render(
    <Provider store={store}>
      <SendLsk {...mockProps} />
    </Provider>
  );

  const button = getByTestId('open-message-input');
  fireEvent.press(button);
  const input = getByLabelText('message-input');
  act(() => {
    fireEvent.changeText(input, 'test data');
    setTimeout(() => {
      expect(getAllByText('0.00147 LSK')).toHaveLength(1);
      done();
    }, 1000);
  });
});

describe.skip('Priority', () => {
  beforeEach(() => {
    service.getDynamicFees = jest.fn();
    service.getDynamicFees.mockResolvedValue({
      Low: 6.222714,
      Medium: 976.222714,
      High: 2012.411464
    });
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
  });

  it('Should show priority selection field when priority is gotten', (done) => {
    const { getAllByText } = render(
      <Provider store={store}>
        <SendLsk {...mockProps} />
      </Provider>
    );

    setTimeout(() => {
      expect(getAllByText('Low')).toHaveLength(1);
      expect(getAllByText('0.001 LSK')).toHaveLength(1);
      expect(getAllByText('Medium')).toHaveLength(1);
      expect(getAllByText('0.003 LSK')).toHaveLength(1);
      expect(getAllByText('High')).toHaveLength(1);
      expect(getAllByText('0.005 LSK')).toHaveLength(1);
      done();
    }, 1000);
  });
});
