import React from 'react';
import { View, Animated } from 'react-native';
import connect from 'redux-connect-decorator';
import { transactionsLoaded as transactionsLoadedAction } from '../../actions/transactions';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';
import Empty from '../transactions/empty';
import Loading from '../transactions/loading';
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
  state = {
    scrollY: new Animated.Value(0),
    theme: 'loading',
  };

  scrollView = null;

  componentWillMount() {
    this.activeAccount = this.props.accounts.active || {};
  }

  componentDidUpdate() {
    const { confirmed, pending } = this.props.transactions;
    this.activeAccount = this.props.accounts.active || {};
    if (this.state.theme === 'loading' || this.state.theme === 'empty') {
      this.setState({
        theme: (confirmed.length === 0 && pending.length === 0) ? 'empty' : 'list',
      });
    }
  }

  componentDidMount() {
    this.props.transactionsLoaded({
      senderIdOrRecipientId: this.activeAccount.address,
      offset: 0,
    });
  }

  onScroll() {
    return Animated.event([{
      nativeEvent: { contentOffset: { y: this.state.scrollY } },
    }]);
  }

  render() {
    const { transactions, transactionsLoaded } = this.props;
    return (<View style={styles.container}>
      {
        this.props.accounts.active ?
          <AccountSummary
            scrollY={this.state.scrollY}
            account={this.props.accounts.active}
            style={styles.accountSummary} /> : null
      }
      {
        (this.state.theme === 'loading') ? <Loading /> : null
      }
      {
        (this.state.theme === 'empty') ? <Empty /> : null
      }
      {
        (this.state.theme === 'list') ? <InfiniteScrollView
          ref={(el) => { if (el) this.scrollView = el; }}
          scrollEventThrottle={8}
          onScroll={this.onScroll.call(this)}
          style={[styles.scrollView]}
          list={transactions.confirmed}
          count={transactions.count}
          loadMore={() => transactionsLoaded({
            senderIdOrRecipientId: this.activeAccount.address,
            offset: transactions.confirmed.length,
          })}>
          <Transactions transactions={transactions}
            navigate={this.props.navigation.navigate}
            account={this.activeAccount.address} />
        </InfiniteScrollView> : null
      }
    </View>);
  }
}

export default Wallet;
