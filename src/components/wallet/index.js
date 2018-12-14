import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Animated } from 'react-native';
import { getAccount } from '../../utilities/api/account';
import { getTransactions } from '../../utilities/api/transactions';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';
import InfiniteScrollView from '../infiniteScrollView';
import Empty from '../transactions/empty';
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
  activePeer: state.peers.activePeer,
  followedAccounts: state.accounts.followed,
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
    this.props.loadingStarted();
    return getTransactions(this.props.activePeer, {
      senderIdOrRecipientId: this.address,
      offset,
    })
      .then((res) => {
        this.props.loadingFinished();
        return res.data;
      })
      .catch((err) => {
        this.props.loadingFinished();
        return console.log(err); // eslint-disable-line no-console
      });
  }

  async retrieveAccount() {
    return getAccount(this.props.activePeer, this.props.navigation.state.params.address)
      .then(account => account)
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
        placeHolder: storedAccount.length === 1 ? storedAccount[0].label : '',
        balance: this.state.account.balance,
        address: this.state.account.address,
        interpolate: this.interpolate,
      },
    });
  }

  async fetchInitialData() {
    const account = await this.retrieveAccount();
    const confirmed = await this.retrieveTransactions(0);

    this.setState({
      account,
      transactions: {
        confirmed,
        pending: [],
      },
    }, () => {
      this.setHeader();
    });
  }

  async refresh() {
    const { confirmed } = this.state.transactions;
    const account = await this.retrieveAccount();
    const transactions = await this.retrieveTransactions(0);
    const newTransactions = transactions.filter(item => item.timestamp > confirmed[0].timestamp);

    if (newTransactions.length > 0) {
      this.setState({
        account,
        transactions: {
          confirmed: [...newTransactions, ...confirmed],
          pending: [],
        },
      });
    }
  }

  loadMore = () => {
    const { confirmed } = this.state.transactions;
    this.retrieveTransactions(confirmed.length)
      .then((res) => {
        const { data } = res;
        if (data.length > 0) {
          this.setState({
            transactions: {
              confirmed: [...confirmed, ...data],
              pending: [],
            },
          });
        }
      })
      .catch(console.log); // eslint-disable-line no-console
  }

  componentDidMount() {
    this.address = this.props.navigation.state.params.address;
    this.fetchInitialData();
  }

  componentDidUpdate(prevProps) {
    const storedAccount = this.props.followedAccounts.filter(item =>
      item.address === this.state.account.address);
    const prevStoredAccount = prevProps.followedAccounts.filter(item =>
      item.address === this.state.account.address);

    if (storedAccount.length !== prevStoredAccount.length ||
      (storedAccount.length && storedAccount[0].label !== prevStoredAccount[0].label)) {
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
    } = this.props;

    let content = <Empty />;

    if (transactions.confirmed.length) {
      content = (<InfiniteScrollView
        ref={(el) => { this.scrollView = el; }}
        scrollEventThrottle={8}
        onScroll={this.onScroll.call(this)}
        style={[styles.scrollView]}
        refresh={this.refresh.bind(this)}
        loadMore={this.loadMore}
        list={transactions.confirmed}
        count={transactions.confirmed.length}
      >
        <Transactions
          type='wallet'
          transactions={transactions}
          navigate={navigation.navigate}
          account={account}
        />
      </InfiniteScrollView>);
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
