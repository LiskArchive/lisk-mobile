import React from 'react';
import { View, Animated, StatusBar, Platform } from 'react-native';
import connect from 'redux-connect-decorator';
import { withNavigationFocus } from 'react-navigation';
import {
  transactionsReset as transactionsResetAction,
  transactionsLoaded as transactionsLoadedAction,
} from '../../actions/transactions';
import {
  blockUpdated as blockUpdatedAction,
  accountFetched as accountFetchedAction,
} from '../../actions/accounts';
import AccountSummary from '../accountSummary/home';
import Transactions from '../transactions';
import Empty from '../transactions/empty';
import Loading from '../transactions/loading';
import { viewportHeight } from '../../utilities/device';
import InfiniteScrollView from '../infiniteScrollView';
import { tokenMap } from '../../constants/tokens';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes } from '../../constants/styleGuide';

const itemHeight = 90;
const summaryHeight = 200;

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In
 *
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
@connect(state => ({
  account: state.accounts.info || {},
  transactions: state.transactions,
  incognito: state.settings.incognito,
  activeToken: state.settings.token.active,
}), {
  transactionsLoaded: transactionsLoadedAction,
  transactionsReset: transactionsResetAction,
  updateTransactions: blockUpdatedAction,
  accountFetched: accountFetchedAction,
})
class Home extends React.Component {
  state = {
    footer: null,
  }
  scrollY = new Animated.Value(0);
  scrollView = null;

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return ({
      title: params.title || 'Lisk wallet',
      type: 'home',
      headerStyle: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderBottomWidth: 0,
        elevation: 0,
      },
    });
  }

  setHeader = () => {
    const {
      activeToken, navigation: { setParams }, account, incognito,
    } = this.props;

    setParams({
      title: {
        placeHolder: `${tokenMap[activeToken].label} Wallet`,
        type: 'home',
        token: activeToken,
        balance: account[activeToken].balance,
        address: account[activeToken].address,
        scrollY: this.scrollY,
        incognito,
      },
    });
  }

  bindInfiniteScroll = () => {
    this.props.navigation.setParams({
      scrollToTop: () => {
        if (this.scrollView) {
          this.scrollView.scrollTo(0);
        }
      },
    });
  }

  initialTxFetch = (reset) => {
    const {
      transactionsReset,
      transactionsLoaded,
      account,
      activeToken,
      transactions,
    } = this.props;

    if (!transactions.loaded) {
      transactionsLoaded({
        address: account[activeToken].address,
        offset: 0,
      });

      this.initialAnimation();
    }

    if (reset) {
      transactionsReset({
        address: account[activeToken].address,
        offset: 0,
      });

      this.initialAnimation();
    }
  }

  onScroll() {
    return Animated.event([{
      nativeEvent: { contentOffset: { y: this.scrollY } },
    }]);
  }

  loadMore = () => {
    const {
      activeToken, account, transactionsLoaded, transactions,
    } = this.props;

    if (account[activeToken]) {
      transactionsLoaded({
        address: account[activeToken].address,
        offset: transactions.confirmed.length,
      });
    }
  }

  componentDidMount() {
    this.initialDataFetch();
    this.bindInfiniteScroll();
    this.setHeader();
  }

  componentDidUpdate(prevProps) {
    const {
      transactions, account, incognito,
      activeToken, accountFetched, isFocused,
    } = this.props;

    const prevTransactionCount = (
      prevProps.transactions.pending.length + prevProps.transactions.confirmed.length
    );

    const transactionCount = (
      transactions.pending.length + transactions.confirmed.length
    );

    const shouldUpdateState = (
      (prevProps.transactions.loaded !== transactions.loaded) ||
      (prevTransactionCount !== transactionCount)
    );

    if (shouldUpdateState) {
      this.setState({
        footer: Math.floor((viewportHeight() - summaryHeight) / itemHeight) < transactionCount,
      });
    }

    if (
      (prevProps.activeToken !== activeToken) ||
      (prevProps.account[activeToken].balance !== account[activeToken].balance) ||
      (prevProps.incognito !== incognito)
    ) {
      this.setHeader();
    }

    if (prevProps.activeToken !== activeToken) {
      this.apiFetchTimeout = setTimeout(() => {
        this.initialTxFetch(true);
        this.props.accountFetched();
      }, 150);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    clearTimeout(this.apiFetchTimeout);
  }

  render() {
    const {
      styles,
      account,
      followedAccounts,
      transactions,
      navigation,
      updateTransactions,
      priceTicker,
      theme,
      isFocused,
      activeToken,
    } = this.props;

    let content = null;

    if (!transactions.loaded) {
      content = <Loading style={styles.loadingState} />;
    } else {
      const listElements = transactions.count > 0 ?
        [...transactions.pending, ...transactions.confirmed] :
        ['emptyState'];

      content = (
        <InfiniteScrollView
          ref={(el) => { this.scrollView = el; }}
          scrollEventThrottle={8}
          onScroll={this.onScroll.call(this)}
          style={[styles.scrollView]}
          refresh={updateTransactions}
          loadMore={this.loadMore}
          list={listElements}
          count={transactions.count}
          render={refreshing => (
            transactions.count > 0 ? (
              <Transactions
                type='home'
                transactions={transactions}
                footer={this.state.footer}
                navigate={navigation.navigate}
                account={account[activeToken]}
                refreshing={refreshing}
              />
            ) : <Empty refreshing={refreshing} />
          )}
        />
      );
    }
    const otherPageStatusBar = theme === themes.light ? 'dark-content' : 'light-content';
    return (
      <View style={[styles.container, styles.theme.container]}>
        {
          Platform.OS !== 'ios' ?
            <StatusBar barStyle='light-content' /> :
            <StatusBar barStyle={isFocused ? 'light-content' : otherPageStatusBar} />
        }
        <AccountSummary
          navigation={navigation}
          scrollY={this.scrollY}
          style={styles.accountSummary} />
        { content }
      </View>
    );
  }
}

export default withNavigationFocus(withTheme(Home, getStyles()));
