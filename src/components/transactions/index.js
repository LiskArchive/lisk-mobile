import React from 'react';
import { View } from 'react-native';
import List from './list';
import Empty from './empty';

/**
 * The container component containing login and create account functionality
 * 
 * @todo 
 */
class Transactions extends React.Component {
  render() {
    const { transactions, navigate, account } = this.props;

    return (<View>
      {
        !transactions || (transactions.count === 0 && transactions.pending.length === 0) ?
          <Empty /> :
          <List
            navigate={navigate}
            account={account}
            pending={transactions.pending}
            transactions={transactions.confirmed} />
      }
    </View>);
  }
}

export default Transactions;
