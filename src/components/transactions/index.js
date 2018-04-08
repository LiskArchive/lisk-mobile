import React from 'react';
import connect from 'redux-connect-decorator';
import { TextInput, Button, Text, ScrollView } from 'react-native';
import { getNetwork, networks } from '../../utilities/networks';
import { transactionsLoaded } from '../../actions/transactions';
import List from './list';
import Empty from './empty';

@connect(state => ({
  accounts: state.accounts,
  transactions: state.transactions,
}), {
  transactionsLoaded,
})

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

  componentWillMount() {
    const activeAccount = this.props.accounts.list[this.props.accounts.active];
    this.props.transactionsLoaded({
      senderId: activeAccount.address,
      recipientId: activeAccount.address,
    });
  }

  render() {
    const { transactions, navigation } = this.props;
    const activeAccount = this.props.accounts.list[this.props.accounts.active];
    return (<ScrollView>
      {
        transactions.count === 0 && transactions.pending.length === 0 ?
          <Empty /> :
          <List
            navigation={navigation}
            account={activeAccount.address}
            pending={transactions.pending}
            transactions={transactions.confirmed} />
      }
    </ScrollView>);
  }
}

export default Transactions;
