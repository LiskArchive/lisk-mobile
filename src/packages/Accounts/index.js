/* eslint-disable complexity */
/* eslint-disable max-lines */
import React, {
  createRef, useEffect, useRef, useState
} from 'react';
import {
  View, Animated, StatusBar, Platform, RefreshControl, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from '@react-navigation/compat';
import Transactions from 'components/shared/transactions';
import Empty from 'components/shared/transactions/empty';
import Loading from 'components/shared/transactions/loading';
import { deviceHeight } from 'utilities/device';
import InfiniteScrollView from 'components/shared/infiniteScrollView';
import ParallaxHeader from 'components/shared/ParallaxHeader';
import HomeHeaderTitle from 'navigation/homeHeaderTitle';
import BTCRemoval from 'components/screens/banners/BtcRemoval';
import withTheme from 'components/shared/withTheme';
import { colors, themes } from 'constants/styleGuide';
import Banner from 'components/shared/banner';
import { fetchData, persistData } from 'utilities/storage';
import { getNetworkInfo as getNetworkInfoAction } from 'actions/network';
import { settingsUpdated as settingsUpdatedAction } from 'actions/settings';
import {
  accountFetched as accountFetchedAction
} from 'actions/accounts';

import getStyles from './styles';
import {
  showInitializationModal
} from './utils';
import AccountSummary from './accountSummary/home';
import useActivityList from '../../hooks/useActivityList';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In
 *
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */

// eslint-disable-next-line max-statements
const Home = ({
  styles,
  account,
  navigation,
  theme,
  isFocused,
  activeToken,
  incognito,
  getNetworkInfo,
  settingsUpdated,
  route
}) => {
  const {
    transactions,
    loadMore,
    loading, refresh, refreshing
  } = useActivityList({ address: account[activeToken].address, activeToken });
  const [hideBtcRemoval, setHideBtcRemoval] = useState(true);

  const scrollY = useRef(new Animated.Value(0));
  const scrollView = createRef();

  const scrollToTop = () => {
    if (scrollView.current.scrollTo) {
      scrollView.current.scrollTo({ y: 0, animated: true });
    }
  };

  const setHeader = () => {
    const {
      setOptions
    } = navigation;
    setOptions({
      headerTitle: () => (
        <HomeHeaderTitle type="home" scrollToTop={scrollToTop} />
      ),
      tabBarVisible: hideBtcRemoval
    });
  };

  const closeBtcBanner = () => {
    persistData('@list-hideBtcRemoval', 'true');
    setHideBtcRemoval(true);
  };

  const checkBTCBanner = async () => {
    const hideBtcRemoval = await fetchData('@list-hideBtcRemoval');
    setHideBtcRemoval(Boolean(hideBtcRemoval));
  };

  useEffect(() => {
    setHeader();
  }, [hideBtcRemoval]);

  useEffect(() => {
    const { setParams } = navigation;
    if (activeToken) {
      getNetworkInfo(activeToken);
    }
    setParams({
      scrollToTop
    });
    if (route.params && route.params.discreet && !incognito) {
      settingsUpdated({ incognito: true });
    }
    const initializationTimeout = setTimeout(() => {
      showInitializationModal({
        account, activeToken, transactions, navigation
      });
    }, 1200);
    checkBTCBanner();

    return () => {
      clearTimeout(initializationTimeout);
    };
  }, []);

  let content = null;
  if (transactions.loaded) {
    const listElements = transactions.count > 0
      ? [...transactions.pending, ...transactions.confirmed]
      : ['emptyState'];
    content = (
      <InfiniteScrollView
        scrollEventThrottle={8}
        style={[styles.scrollView]}
        refresh={refresh}
        loadMore={loadMore}
        list={listElements}
        count={transactions.count}
        render={(refreshing) =>
          transactions.count > 0 ? (
            <Transactions
              type="home"
              transactions={transactions}
              // footer={footer}
              navigate={navigation.navigate}
              account={account[activeToken]}
              refreshing={refreshing}
            />
          ) : (
            <Empty
              style={[styles.emptyContainer, styles.theme.emptyContainer]}
              refreshing={loading}
            />
          )
        }
      />
    );
  } else {
    content = <Loading style={[styles.emptyContainer, styles.theme.emptyContainer]} />;
  }
  const otherPageStatusBar = theme === themes.light ? 'dark-content' : 'light-content';
  if (!hideBtcRemoval) {
    return (
      <Banner>
        <BTCRemoval closeBanner={closeBtcBanner} />
      </Banner>
    );
  }
  return (
    <SafeAreaView style={[styles.flex, styles.theme.homeContainer]}>
      {Platform.OS !== 'ios' ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle={isFocused ? 'light-content' : otherPageStatusBar} />
      )}
      <ParallaxHeader
        reference={scrollView}
        headerMinHeight={70}
        headerMaxHeight={260}
        extraScrollHeight={20}
        navbarColor="#3498db"
        alwaysShowTitle={false}
        refreshControl={
          <RefreshControl
            progressViewOffset={deviceHeight() / 3}
            onRefresh={refresh}
            refreshing={refreshing}
            tintColor={
              theme === themes.light ? colors.light.slateGray : colors.dark.platinum
            }
          />
        }
        title={
          <AccountSummary
            navigation={navigation}
            scrollY={scrollY.current}
            isFocused={isFocused}
            incognito={incognito}
          />
        }
        renderContent={() => content}
        scrollViewProps={{
          onScroll: loadMore
        }}
      />
      <View style={[styles.fixedBg, styles.theme.fixedBg]}></View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  account: state.accounts.info || {},
  incognito: state.settings.incognito,
  activeToken: state.settings.token.active,
  settings: state.settings,
  followedAccounts: state.accounts.followed || [],
});

const mapDispatchToProps = ({
  accountFetched: accountFetchedAction,
  settingsUpdated: settingsUpdatedAction,
  getNetworkInfo: getNetworkInfoAction
});

export default withNavigationFocus(
  withTheme(connect(mapStateToProps, mapDispatchToProps)(Home), getStyles())
);
