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
const summaryHeight = 200;

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
  priceTicker: state.liskService.priceTicker,
}), {
  transactionsLoaded: transactionsLoadedAction,
  updateTransactions: blockUpdatedAction,
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
      title: params.title || 'Your wallet',
      headerStyle: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderBottomWidth: 0,
        elevation: 0,
      },
    });
  }

  componentDidMount() {
    const { transactionsLoaded, account, navigation } = this.props;
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
    const { transactions } = this.props;

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
  }

  componentWillUnmount() {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
  }

  onScroll() {
    return Animated.event([{
      nativeEvent: { contentOffset: { y: this.scrollY } },
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
    const {
      styles,
      account,
      transactions,
      navigation,
      updateTransactions,
      priceTicker,
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
          refresh={updateTransactions}
          loadMore={this.loadMore}
          list={listElements}
          count={transactions.count}
        >
          {
            transactions.count > 0 ? (
              <Transactions
                transactions={transactions}
                footer={this.state.footer}
                navigate={navigation.navigate}
                account={account}
              />
            ) : <Empty />
          }
        </InfiniteScrollView>
      );
    }

    return (
      <View style={[styles.container, styles.theme.container]}>
        {
          account ? (
            <AccountSummary
              navigation={navigation}
              scrollY={this.scrollY}
              account={account}
              priceTicker={priceTicker}
              style={styles.accountSummary}
            />
          ) : null
        }
        {content}
      </View>
    );
  }
}

export default withTheme(Home, getStyles());
