import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { H4 } from '../toolBox/typography';
import { transactionsLoaded as transactionsLoadedAction } from '../../actions/transactions';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';
import InfiniteScrollView from '../infiniteScrollView';
import styles from './styles';

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
    return (<View style={styles.container}>
      {
        !this.props.accounts.active ?
          <H4>Loading account</H4> :
          <AccountSummary
            account={this.props.accounts.active}
            style={styles.accountSummary} />
      }
      <InfiniteScrollView
        style={[styles.scrollView]}
        list={this.props.transactions.confirmed}
        count={this.props.transactions.count}
        loadMore={() => this.props.transactionsLoaded({
          senderIdOrRecipientId: this.activeAccount.address,
          offset: this.props.transactions.confirmed.length,
        })}>
        <Transactions transactions={this.props.transactions}
          navigate={this.props.navigation.navigate}
          account={this.activeAccount.address} />
      </InfiniteScrollView>
    </View>);
  }
}

export default Wallet;
