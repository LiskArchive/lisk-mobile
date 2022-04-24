import React from 'react';
import { connect } from 'react-redux';
import {
  View, SafeAreaView, TouchableOpacity
} from 'react-native';
import { translate } from 'react-i18next';
import modalHolder from 'utilities/modal';
import { colors, themes } from 'constants/styleGuide';
import Transactions from 'components/shared/transactions';
import InfiniteScrollView from 'components/shared/infiniteScrollView';
import Empty from 'components/shared/transactions/empty';
import Loading from 'components/shared/transactions/loading';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'navigation/headerBackButton';
import DeleteBookmarkModal from 'components/shared/bookmarks/deleteBookmarkModal';
import { H3 } from 'components/shared/toolBox/typography';
import LoadingBar from 'components/shared/loading';
import {
  loadingStarted as loadingStartedAction,
  loadingFinished as loadingFinishedAction
} from 'actions/loading';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction
} from 'packages/Accounts/actions';
import BookmarkSvg from 'assets/svgs/BookmarkSvg';
import BookmarkOutlineSvg from 'assets/svgs/BookmarkOutlineSvg';
import getStyles from './styles';
import AccountSummary from './accountSummary';
import useActivityList from '../../hooks/useActivityList';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */

const Wallet = ({
  styles, navigation, t, route, accountUnFollowed, theme, activeToken, followedAccounts
}) => {
  const {
    transactions, loading, loadMore, refresh, account
  } = useActivityList({ address: route.params?.address, activeToken });

  const isFollowed = () => {
    return followedAccounts[activeToken].some(
      (item) => item.address === account.address
    );
  };

  const toggleBookmark = () => {
    const address = route.params?.address;
    if (isFollowed()) {
      modalHolder.open({
        title: 'Delete bookmark',
        component: DeleteBookmarkModal,
        callback: () => accountUnFollowed(address)
      });
    } else {
      navigation.navigate({
        name: 'AddBookmark',
        params: {
          account: { address },
          title: t('Add bookmark')
        }
      });
    }
  };

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
        scrollEventThrottle={8}
        refresh={refresh}
        loadMore={loadMore}
        list={listElements}
        count={transactions.count}
        renderTitle={() => (
          <View style={[styles.titleContainer, styles.theme.titleContainer]}>
            <H3 style={styles.theme.title}>{t('Activity')}</H3>
            <LoadingBar loading={loading} />
          </View>
        )}
        render={(refreshing) =>
          transactions.count > 0 ? (
            <Transactions
              type="wallet"
              transactions={transactions}
              // footer={footer}
              navigate={navigation.push}
              account={account}
              refreshing={refreshing}
              noTitle
            />
          ) : (
            <Empty
              style={[styles.emptyContainer, styles.theme.emptyContainer]}
              refreshing={refreshing} />
          )
        }
      />
    );
  }

  return <View style={[styles.container, styles.theme.container]}>
    <SafeAreaView style={[styles.flex]}>
      <HeaderBackButton
        title="Account Details"
        onPress={navigation.goBack}
        rightIconComponent={() => (
          <TouchableOpacity onPress={toggleBookmark}>
            {isFollowed() ? (
              <BookmarkSvg />
            ) : (
              <BookmarkOutlineSvg
                color={theme === themes.light
                  ? colors.light.zodiacBlue : colors.dark.mountainMist}
              />
            )}
          </TouchableOpacity>
        )}
      />
      {account && account.address ? (
        <AccountSummary
          navigation={navigation}
          account={account}
          style={styles.accountSummary}
        />
      ) : null}
      {content}
    </SafeAreaView>
    <View style={[styles.fixedBottom, styles.theme.fixedBottom]} />
  </View>;
};

const mapStateToProps = state => ({
  followedAccounts: state.accounts.followed || [],
  activeToken: state.settings.token.active,
  loading: state.loading
});

const mapDispatchToProps = {
  loadingStarted: loadingStartedAction,
  loadingFinished: loadingFinishedAction,
  accountFollowed: accountFollowedAction,
  accountUnFollowed: accountUnFollowedAction
};

export default withTheme(translate()(connect(
  mapStateToProps, mapDispatchToProps
)(Wallet)), getStyles());