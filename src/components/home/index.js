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
import ModalHolder from '../../utilities/modal';
import AccountSummary from '../accountSummary/home';
import Transactions from '../transactions';
import Empty from '../transactions/empty';
import Loading from '../transactions/loading';
import IntroModal from './introModal';
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
  btcIntroShown: state.settings.btcIntroShown,
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
  lastActiveToken = null;

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

  resetTxAndFetch = () => {
    const {
      transactionsReset,
      transactionsLoaded,
      account,
      activeToken,
    } = this.props;

    transactionsReset();

    // giving some time for the transition animations to settle
    this.initialFetchTimeout = setTimeout(() => {
      transactionsLoaded({
        address: account[activeToken].address,
        offset: 0,
      });
    }, 200);
  }

  initialDataFetch = () => {
    const {
      transactionsLoaded,
      account,
      activeToken,
    } = this.props;

    // giving some time for the transition animations to settle
    this.initialFetchTimeout = setTimeout(() => {
      transactionsLoaded({
        address: account[activeToken].address,
        offset: 0,
      });
    }, 400);
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

  refreshAccountAndTx = () => {
    this.lastActiveToken = this.props.activeToken;
    this.resetTxAndFetch();
    this.props.accountFetched();
  }

  showIntroModal = () => {
    if (!this.props.btcIntroShown) {
      this.modalTimeout = setTimeout(() => {
        ModalHolder.open({
          title: 'We’ve got a good news!',
          component: IntroModal,
        });
      }, 1200);
    }
  }

  screenWillFocus = () => {
    if (this.lastActiveToken === null) {
      this.bindInfiniteScroll();
      this.setHeader();
      this.showIntroModal();
    }
    if (this.lastActiveToken !== this.props.activeToken) {
      this.refreshAccountAndTx();
      this.setHeader();
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', this.screenWillFocus);
  }

  componentDidUpdate(prevProps) {
    const {
      transactions, account, incognito,
      activeToken, isFocused,
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
      (prevProps.account[activeToken].balance !== account[activeToken].balance) ||
      (prevProps.incognito !== incognito)
    ) {
      this.setHeader();
    }

    if (prevProps.activeToken !== activeToken && isFocused) {
      this.refreshAccountAndTx();
      this.setHeader();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.initialFetchTimeout);
    clearTimeout(this.modalTimeout);
  }

  render() {
    const {
      styles,
      account,
      transactions,
      navigation,
      updateTransactions,
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
          isFocused={isFocused}
          style={styles.accountSummary} />
        { content }
      </View>
    );
  }
}

export default withNavigationFocus(withTheme(Home, getStyles()));
