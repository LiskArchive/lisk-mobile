import React from 'react';
import { View, Animated } from 'react-native';
import connect from 'redux-connect-decorator';
import { transactionsLoaded as transactionsLoadedAction } from '../../actions/transactions';
import { blockUpdated as blockUpdatedAction } from '../../actions/accounts';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';
import Empty from '../transactions/empty';
import Loading from '../transactions/loading';
import { viewportHeight } from '../../utilities/device';
import InfiniteScrollView from '../infiniteScrollView';
import withTheme from '../withTheme';
import getStyles from './styles';

const itemHeight = 90;
const summaryHeight = 250;

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
  account: state.accounts.active,
  transactions: state.transactions,
}), {
  transactionsLoaded: transactionsLoadedAction,
  updateTransactions: blockUpdatedAction,
})
class Wallet extends React.Component {
  state = {
    scrollY: new Animated.Value(0),
    theme: 'loading',
  };

  scrollView = null;

  componentDidMount() {
    const { navigation, transactionsLoaded, account } = this.props;
    transactionsLoaded({
      senderIdOrRecipientId: account.address,
      offset: 0,
    });
    navigation.setParams({
      scrollToTop: () => {
        if (this.scrollView) {
          this.scrollView.scrollTo(0);
        }
      },
    });
    this.initialAnimation();
  }

  componentDidUpdate(prevProps) {
    const { theme } = this.state;
    const { pending, confirmed } = this.props.transactions;
    const transactionCount = pending.length + confirmed.length;
    const previousTransactionCount = (
      prevProps.transactions.pending.length + prevProps.transactions.confirmed.length
    );

    if ((theme === 'empty' || theme === 'loading') && transactionCount !== previousTransactionCount) {
      this.setState({
        theme: transactionCount === 0 ? 'empty' : 'list',
        footer: Math.floor((viewportHeight() - summaryHeight) / itemHeight) < transactionCount,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
  }

  onScroll() {
    return Animated.event([{
      nativeEvent: { contentOffset: { y: this.state.scrollY } },
    }]);
  }

  initialAnimation = () => {
    this.timeout1 = setTimeout(() => {
      if (this.scrollView) {
        this.scrollView.scrollTo(1);
      }
    }, 100);
    this.timeout2 = setTimeout(() => {
      if (this.scrollView) {
        this.scrollView.scrollTo(-1);
      }
    }, 120);
  }

  loadMore = () => {
    if (this.props.account) {
      this.props.transactionsLoaded({
        senderIdOrRecipientId: this.props.account.address,
        offset: this.props.transactions.confirmed.length,
      });
    }
  }

  render() {
    const { styles, transactions } = this.props;

    return (<View style={[styles.container, styles.theme.container]}>
      {
        this.props.account ?
          <AccountSummary
            scrollY={this.state.scrollY}
            account={this.props.account}
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
          ref={(el) => { this.scrollView = el; }}
          scrollEventThrottle={8}
          onScroll={this.onScroll.call(this)}
          style={[styles.scrollView]}
          list={[...transactions.pending, ...transactions.confirmed]}
          count={transactions.count}
          refresh={this.props.updateTransactions}
          loadMore={this.loadMore}>
          <Transactions transactions={transactions}
            footer={this.state.footer}
            navigate={this.props.navigation.navigate}
            account={this.props.account} />
        </InfiniteScrollView> : null
      }
    </View>);
  }
}

export default withTheme(Wallet, getStyles());
