import React from 'react';
import connect from 'redux-connect-decorator';
import { Text } from 'react-native';
import { getAccount } from '../../utilities/api/account';
import { getTransactions } from '../../utilities/api/transactions';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';
import InfiniteScrollView from '../infiniteScrollView';
import {
  loadingStarted as loadingStartedAction,
  loadingFinished as loadingFinishedAction,
} from '../../actions/loading';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
@connect(state => ({
  accounts: state.accounts,
  transactions: state.transactions,
  activePeer: state.peers.activePeer,
}), {
  loadingStarted: loadingStartedAction,
  loadingFinished: loadingFinishedAction,
})
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
    this.props.loadingStarted('getTransactions');
    getTransactions(this.props.activePeer, {
      senderIdOrRecipientId: this.address,
      offset: this.state.transactions.confirmed.length,
    }).then((res) => {
      const { data } = res;
      this.setState({
        transactions: {
          confirmed: [...this.state.transactions.confirmed, ...data],
          pending: [],
        },
      });
      this.props.loadingFinished('getTransactions');
    });
  }

  setAccount() {
    getAccount(this.props.activePeer, this.props.navigation.state.params.address)
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
