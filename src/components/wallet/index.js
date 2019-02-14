import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Animated } from 'react-native';
import { account as accountAPI } from '../../utilities/api';
import { getTransactions } from '../../utilities/api/lisk/transactions';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';
import InfiniteScrollView from '../infiniteScrollView';
import Empty from '../transactions/empty';
import Loading from '../transactions/loading';
import {
  loadingStarted as loadingStartedAction,
  loadingFinished as loadingFinishedAction,
} from '../../actions/loading';
import withTheme from '../withTheme';
import getStyles from './styles';

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
  followedAccounts: state.accounts.followed || [],
  priceTicker: state.liskService.priceTicker,
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
      loaded: false,
    },
  }

  scrollY = new Animated.Value(0);

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return ({
      title: params.title || '',
      type: 'wallet',
      headerStyle: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderBottomWidth: 0,
        elevation: 0,
      },
    });
  }

  async retrieveTransactions(offset) {
    return getTransactions({
      senderIdOrRecipientId: this.address,
      offset,
    })
      .then(res => ({
        confirmed: res.data,
        count: res.meta.count,
      }))
      .catch(console.log); // eslint-disable-line no-console
  }

  onScroll() {
    return Animated.event([{
      nativeEvent: { contentOffset: { y: this.scrollY } },
    }]);
  }

  interpolate = (inputRange, outputRange) =>
    this.scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

  setHeader = () => {
    const storedAccount = this.props.followedAccounts.filter(item =>
      item.address === this.state.account.address);
    this.props.navigation.setParams({
      title: {
        type: 'wallet',
        placeHolder: storedAccount.length === 1 ? storedAccount[0].label : '',
        balance: this.state.account.balance,
        address: this.state.account.address,
        interpolate: this.interpolate,
      },
    });
  }

  async fetchInitialData() {
    const { navigation, loadingStarted, loadingFinished } = this.props;
    loadingStarted();
    const account = await accountAPI.getSummary('LSK', navigation.state.params.address);
    const tx = await this.retrieveTransactions(0);
    loadingFinished();

    this.setState({
      account,
      transactions: {
        confirmed: tx.confirmed,
        pending: [],
        loaded: true,
        count: tx.count,
      },
    }, () => {
      this.setHeader();
    });
  }

  async refresh() {
    const { navigation } = this.props;
    const { confirmed } = this.state.transactions;
    const account = await accountAPI.getSummary('LSK', navigation.state.params.address);
    const transactions = await this.retrieveTransactions(0);
    const newTransactions = transactions.confirmed.filter(item =>
      item.timestamp > confirmed[0].timestamp);

    if (newTransactions.length > 0) {
      this.setState({
        account,
        transactions: {
          confirmed: [...newTransactions, ...confirmed],
          pending: [],
          count: transactions.count,
          loaded: true,
        },
      });
    }
  }

  loadMore = () => {
    this.props.loadingStarted();
    const { confirmed } = this.state.transactions;
    this.retrieveTransactions(confirmed.length)
      .then((transactions) => {
        this.props.loadingFinished();
        if (transactions.confirmed.length > 0) {
          this.setState({
            transactions: {
              confirmed: [...confirmed, ...transactions.confirmed],
              pending: [],
              count: transactions.count,
              loaded: true,
            },
          });
        }
      })
      .catch((err) => {
        this.props.loadingFinished();
        console.log(err); // eslint-disable-line no-console
      });
  }

  componentDidMount() {
    this.address = this.props.navigation.state.params.address;
    this.fetchInitialData();
  }

  componentDidUpdate(prevProps, prevState) {
    const storedAccount = this.props.followedAccounts.filter(item =>
      item.address === this.state.account.address);
    const prevStoredAccount = prevProps.followedAccounts.filter(item =>
      item.address === this.state.account.address);

    if (storedAccount.length !== prevStoredAccount.length ||
      (storedAccount.length && storedAccount[0].label !== prevStoredAccount[0].label) ||
      this.state.account.balance !== prevState.account.balance) {
      this.setHeader();
    }
  }

  render() {
    const {
      transactions, account,
    } = this.state;

    const {
      styles,
      navigation,
      priceTicker,
      followedAccounts,
    } = this.props;

    let content = null;

    if (!transactions.loaded) {
      content = <Loading />;
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
          refresh={this.refresh.bind(this)}
          loadMore={this.loadMore}
          list={listElements}
          count={transactions.count}
          render={refreshing => (
            transactions.count > 0 ? (
              <Transactions
                type='wallet'
                transactions={transactions}
                footer={this.state.footer}
                navigate={navigation.navigate}
                account={account}
                followedAccounts={followedAccounts}
                refreshing={refreshing}
              />
            ) : <Empty refreshing={refreshing} />
          )}
        />
      );
    }

    return (
      <View style={[styles.container, styles.theme.container]}>
        {
          account && account.address ? (
            <AccountSummary
              navigation={navigation}
              scrollY={this.scrollY}
              account={account}
              priceTicker={priceTicker}
              style={styles.accountSummary}
              type='wallet'
            />
          ) : null
        }
        {content}
      </View>
    );
  }
}

export default withTheme(Wallet, getStyles());
