import React from 'react';
import connect from 'redux-connect-decorator';
import {
  View, Animated, SafeAreaView, TouchableOpacity
} from 'react-native';
import { translate } from 'react-i18next';
import { account as accountAPI, transactions as transactionsAPI } from '../../../utilities/api';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction
} from '../../../actions/accounts';
import AccountSummary from './accountSummary';
import Transactions from '../../shared/transactions';
import InfiniteScrollView from '../../shared/infiniteScrollView';
import Empty from '../../shared/transactions/empty';
import Loading from '../../shared/transactions/loading';
import {
  loadingStarted as loadingStartedAction,
  loadingFinished as loadingFinishedAction
} from '../../../actions/loading';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import HeaderBackButton from '../router/headerBackButton';
import modalHolder from '../../../utilities/modal';
import DeleteBookmarkModal from '../../shared/bookmarks/deleteBookmarkModal';
import BookmarkSvg from '../../../assets/svgs/BookmarkSvg';
import { H3 } from '../../shared/toolBox/typography';
import LoadingBar from '../../shared/loading';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
@connect(
  (state) => ({
    followedAccounts: state.accounts.followed || [],
    activeToken: state.settings.token.active,
    loading: state.loading
  }),
  {
    loadingStarted: loadingStartedAction,
    loadingFinished: loadingFinishedAction,
    accountFollowed: accountFollowedAction,
    accountUnFollowed: accountUnFollowedAction
  }
)
class Wallet extends React.Component {
  state = {
    account: {},
    transactions: {
      confirmed: [],
      pending: [],
      loaded: false
    }
  };

  scrollY = new Animated.Value(0);

  interpolate = (inputRange, outputRange) =>
    this.scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp'
    });

  async fetchInitialData() {
    const {
      route, loadingStarted, loadingFinished, activeToken
    } = this.props;
    const address = route.params?.address;

    if (!this.address || this.address !== address) {
      loadingStarted();
      this.address = address;
      const account = await accountAPI.getSummary(activeToken, { address });
      const tx = await transactionsAPI.get(activeToken, {
        address
      });
      loadingFinished();

      this.setState({
        account,
        transactions: {
          confirmed: tx.data,
          pending: [],
          loaded: true,
          count: tx.meta.count
        }
      });
    }
  }

  async refresh() {
    const { navigation, activeToken } = this.props;
    const { confirmed } = this.state.transactions;
    const { address } = navigation.state.params;
    const account = await accountAPI.getSummary(activeToken, { address });
    const transactions = await transactionsAPI.get(activeToken, {
      address: this.address
    });
    const newTransactions = transactions.data.filter((t) => t.timestamp > confirmed[0].timestamp);

    if (newTransactions.length > 0) {
      this.setState({
        account,
        transactions: {
          confirmed: [...newTransactions, ...confirmed],
          pending: [],
          count: transactions.meta.count,
          loaded: true
        }
      });
    }
  }

  loadMore = async () => {
    const { confirmed } = this.state.transactions;
    this.props.loadingStarted();

    try {
      const transactions = await transactionsAPI.get(this.props.activeToken, {
        address: this.address,
        offset: confirmed.length
      });

      this.props.loadingFinished();

      if (transactions.data.length > 0) {
        this.setState({
          transactions: {
            confirmed: [...confirmed, ...transactions.data],
            pending: [],
            count: transactions.meta.count,
            loaded: true
          }
        });
      }
    } catch (error) {
      this.props.loadingFinished();
    }
  };

  componentDidMount() {
    this.fetchInitialData();
  }

  toggleBookmark = () => {
    const {
      followedAccounts, navigation, accountUnFollowed, t, activeToken
    } = this.props;

    const isFollowed = followedAccounts[activeToken].some(
      (item) => item.address === this.state.account.address
    );

    if (isFollowed) {
      modalHolder.open({
        title: 'Delete bookmark',
        component: DeleteBookmarkModal,
        callback: () => accountUnFollowed(this.state.account.address)
      });
    } else {
      navigation.navigate({
        name: 'AddBookmark',
        params: {
          account: this.state.account,
          title: t('Add bookmark')
        }
      });
    }
  };


  render() {
    const { transactions, account } = this.state;

    const {
      styles, navigation, t
    } = this.props;

    let content = null;

    if (!transactions.loaded) {
      content = (
        <View style={[styles.loadingContainer]}>
          <Loading />
        </View>
      );
    } else {
      const listElements = transactions.count > 0
        ? [...transactions.pending, ...transactions.confirmed]
        : ['emptyState'];
      content = (
        <InfiniteScrollView
          ref={(el) => {
            this.scrollView = el;
          }}
          scrollEventThrottle={8}
          // onScroll={onScroll}
          // contentContainerStyle={[styles.scrollView]}
          refresh={this.refresh.bind(this)}
          loadMore={this.loadMore}
          list={listElements}
          count={transactions.count}
          renderTitle={() => (
            <View style={[styles.titleContainer, styles.theme.titleContainer]}>
              <H3 style={styles.theme.title}>{t('Activity')}</H3>
              <LoadingBar loading={!!this.props.loading?.length} />
            </View>
          )}
          render={(refreshing) =>
            transactions.count > 0 ? (
              <Transactions
                type="wallet"
                transactions={transactions}
                footer={this.state.footer}
                navigate={navigation.push}
                account={account}
                refreshing={refreshing}
                noTitle
              />
            ) : (
              <Empty refreshing={refreshing} />
            )
          }
        />
      );
    }

    return (
      <View style={[styles.container, styles.theme.container]}>
        <SafeAreaView style={[styles.flex]}>
          <HeaderBackButton
            title="Account Details"
            onPress={this.props.navigation.goBack}
            rightIconComponent={() => (
              <TouchableOpacity onPress={this.toggleBookmark}>
                <BookmarkSvg />
              </TouchableOpacity>
            )}
          />
          {account && account.address ? (
            <AccountSummary
              navigation={navigation}
              scrollY={this.scrollY}
              account={account}
              style={styles.accountSummary}
            />
          ) : null}
          {content}
        </SafeAreaView>
        <View style={[styles.fixedBottom, styles.theme.fixedBottom]} />
      </View>
    );
  }
}

export default withTheme(translate()(Wallet), getStyles());
