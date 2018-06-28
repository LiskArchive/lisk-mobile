import React from 'react';
import connect from 'redux-connect-decorator';
import { H4 } from '../toolBox/typography';
import { transactionsLoaded as transactionsLoadedAction } from '../../actions/transactions';
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
}), {
  transactionsLoaded: transactionsLoadedAction,
})
class Wallet extends React.Component {
  componentWillMount() {
    this.activeAccount = this.props.accounts.active;
  }

  componentDidMount() {
    this.props.transactionsLoaded({
      senderIdOrRecipientId: this.activeAccount.address,
      offset: 0,
    });
  }

  render() {
    return (<InfiniteScrollView
      list={this.props.transactions.confirmed}
      count={this.props.transactions.count}
      loadMore={() => this.props.transactionsLoaded({
        senderIdOrRecipientId: this.activeAccount.address,
        offset: this.props.transactions.confirmed.length,
      })}>
      {
        !this.props.accounts.active ?
          <H4>Loading account</H4> :
          <AccountSummary account={this.props.accounts.active}>
          </AccountSummary>
      }
      <Transactions transactions={this.props.transactions}
        navigate={this.props.navigation.navigate}
        account={this.activeAccount.address} />
    </InfiniteScrollView>);
  }
}

export default Wallet;
