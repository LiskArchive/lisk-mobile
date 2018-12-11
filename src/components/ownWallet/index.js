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
  account: state.accounts.active || {},
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
    const { transactionsLoaded, account } = this.props;
    transactionsLoaded({
      senderIdOrRecipientId: account.address,
      offset: 0,
    });
    this.initialAnimation();
  }

  componentDidUpdate() {
    let { theme } = this.state;
    const { navigation, transactions: { pending, confirmed } } = this.props;
    const transactionCount = pending.length + confirmed.length;

    if ((theme === 'loading') || (theme === 'empty' && transactionCount > 0)) {
      theme = transactionCount === 0 ? 'empty' : 'list';

      this.setState({
        theme,
        footer: Math.floor((viewportHeight() - summaryHeight) / itemHeight) < transactionCount,
      });

      if (theme === 'list' && !navigation.getParam('scrollToTop', false)) {
        navigation.setParams({
          scrollToTop: () => {
            if (this.scrollView) {
              this.scrollView.scrollTo(0);
            }
          },
        });
      }
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
    const { theme, scrollY, footer } = this.state;
    const {
      styles,
      account,
      transactions,
      navigation,
      updateTransactions,
    } = this.props;

    let content = null;

    if (theme === 'loading') {
      content = <Loading />;
    } else {
      const listContent = theme === 'list' ? (
        <Transactions
          transactions={transactions}
          footer={footer}
          navigate={navigation.navigate}
          account={account}
        />
      ) : <Empty />;

      const listElements = theme === 'list' ? [
        ...transactions.pending, ...transactions.confirmed,
      ] : ['emptyState'];

      content = (
        <InfiniteScrollView
          ref={(el) => { this.scrollView = el; }}
          scrollEventThrottle={8}
          onScroll={this.onScroll.call(this)}
          style={[styles.scrollView]}
          refresh={updateTransactions}
          loadMore={this.loadMore}
          list={listElements}
          count={listElements.length}
        >
          {listContent}
        </InfiniteScrollView>
      );
    }

    return (
      <View style={[styles.container, styles.theme.container]}>
        {
          account ? (
            <AccountSummary
              scrollY={scrollY}
              account={account}
              style={styles.accountSummary}
            />
          ) : null
        }
        {content}
      </View>
    );
  }
}

export default withTheme(Wallet, getStyles());
