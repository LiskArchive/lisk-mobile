import React from 'react';
import connect from 'redux-connect-decorator';
import { Text } from 'react-native';
import { getTransactions, getAccount } from '../../utilities/http';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';
import InfiniteScrollView from '../infiniteScrollView';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Login
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
@connect(state => ({
  accounts: state.accounts,
  transactions: state.transactions,
}), {})
class Wallet extends React.Component {
  state = {
    account: {},
    transactions: {
      confirmed: [],
      pending: [],
    },
  }

  componentDidMount() {
    this.address = this.props.navigation.state.params.address;
    this.setTransactions();
    this.setAccount();
  }

  setTransactions = () => {
    getTransactions({
      senderId: this.address,
      recipientId: this.address,
      offset: this.state.transactions.confirmed.length,
    }).then((res) => {
      const { transactions, count } = res;
      this.setState({
        transactions: {
          count,
          confirmed: [...this.state.transactions.confirmed, ...transactions],
          pending: [],
        },
      });
    });
  }

  setAccount() {
    getAccount(this.props.navigation.state.params.address)
      .then((account) => {
        this.setState({ account });
      });
  }

  render() {
    return (<InfiniteScrollView
      list={this.state.transactions.confirmed}
      count={this.state.transactions.count}
      loadMore={this.setTransactions}>
      {
        this.state.account ?
          <AccountSummary account={this.state.account} /> : <Text>Loading account</Text>
      }

      <Transactions transactions={this.state.transactions}
        loadMore={this.setTransactions}
        navigate={this.props.navigation.navigate}
        account={this.state.account.address} />
    </InfiniteScrollView>);
  }
}

export default Wallet;
