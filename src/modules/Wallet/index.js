/* eslint-disable max-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, SafeAreaView, TouchableOpacity
} from 'react-native';
import { translate } from 'react-i18next';
import modalHolder from 'utilities/modal';
import { colors, themes } from 'constants/styleGuide';
import { Manager as TransactionsManager, EmptyState, LoadingState } from 'modules/Accounts/components';
import InfiniteScrollView from 'components/shared/infiniteScrollView';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { DeleteBookmarkModal } from 'modules/Bookmark/components';
import { H3 } from 'components/shared/toolBox/typography';
import LoadingBar from 'components/shared/loading';
import { accountUnFollowed } from 'modules/Accounts/actions';
import BookmarkSvg from 'assets/svgs/BookmarkSvg';
import BookmarkOutlineSvg from 'assets/svgs/BookmarkOutlineSvg';
import useTransactionList from 'modules/Accounts/hooks/useTransactionList';
import getStyles from './styles';
import { AccountSummary } from './components';

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
  styles, navigation, t, route, theme
}) => {
  const followedAccounts = useSelector(state => state.accounts.followed || []);
  const activeToken = useSelector(state => state.settings.token.active);
  const dispatch = useDispatch();

  const {
    transactions, loading, loadMore, refresh, account
  } = useTransactionList({ address: route.params?.address, activeToken });

  const isFollowed = () => {
    return followedAccounts[activeToken].some(
      (item) => item.address === account?.address
    );
  };

  const toggleBookmark = () => {
    const address = route.params?.address;
    if (isFollowed()) {
      modalHolder.open({
        title: 'Delete bookmark',
        component: DeleteBookmarkModal,
        callback: () => dispatch(accountUnFollowed(address))
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
        <LoadingState />
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
            <TransactionsManager
              type="wallet"
              transactions={transactions}
              // footer={footer}
              navigate={navigation.push}
              account={account}
              refreshing={refreshing}
              noTitle
            />
          ) : (
            <EmptyState
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
        rightIconComponent={() => (account
          && <TouchableOpacity onPress={toggleBookmark}>
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

export default withTheme(translate()(Wallet), getStyles());
