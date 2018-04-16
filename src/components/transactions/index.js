import React from 'react';
import { TextInput, Button, Text, ScrollView } from 'react-native';
import List from './list';
import Empty from './empty';

/**
 * The container component containing login and create account functionality
 * 
 * @todo 
 */
class Transactions extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    const { transactions, navigation, account } = this.props;
    return (<ScrollView>
      {
        !transactions || (transactions.count === 0 && transactions.pending.length === 0) ?
          <Empty /> :
          <List
            navigation={navigation}
            account={account}
            pending={transactions.pending}
            transactions={transactions.confirmed} />
      }
    </ScrollView>);
  }
}

export default Transactions;
