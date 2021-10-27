import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SendLsk from '../lsk';

const mockProps = {
  accounts: {
    info: {
      LSK: {
        balance: 1000000000
      }
    }
  }
};

describe('Send LSK', () => {
  it('calculates and renders available balance', () => {
    const container = render(<SendLsk accounts={mockProps.accounts} />);
    expect(container.getByText('1 LSK')).toExist();
  });
});
