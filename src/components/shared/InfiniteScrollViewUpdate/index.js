import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, View, FlatList, SafeAreaView } from "react-native";
import { translate } from "react-i18next";
import { themes, colors } from "../../../constants/styleGuide";
import Item from '../transactions/item'
import withTheme from "../withTheme";
import getStyles from './styles'
import { H3 } from "../toolBox/typography";

/**
 * InfiniteScrollView is a wrapper for react native ScrollView
 * component.
 * Accepts 3 parameter
 *
 * @param {Array} data - The list to fill on scroll
 * @param {Number} count - The maximum amount possible in the list
 */

const InfiniteScrollViewUpdate = ({
  loadMore,
  data,
  count,
  onScroll,
  refresh,
  theme,
  contentContainerStyle,
  navigate,
  incognito,
  account,
  activeToken,
  followedAccounts,
  styles,
  t,
}) => {
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollView = useRef().current;

  const fetchMoreData = ({ nativeEvent }) => {
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y
        >= contentSize.height - paddingToBottom
      );
    };
    if (isCloseToBottom(nativeEvent) && canLoadMore) {
      setCanLoadMore(false);
      loadMore();
    }
  };

  useEffect(() => {
    setCanLoadMore(data.length < count);
  }, [data, count]);

  const onPageScroll = (e) => {
    onScroll(e);
    fetchMoreData(e);
  };

  const onRefresh = () => {
    setRefreshing(true);
    refresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.flex} >
    <FlatList
      onScroll={onPageScroll}
      refreshControl={
        <RefreshControl
          progressViewOffset={100}
          onRefresh={onRefresh}
          refreshing={refreshing}
          tintColor={
            theme === themes.light
              ? colors.light.slateGray
              : colors.dark.platinum
          }
        />
      }
      ListHeaderComponent={() =>
        <View style={[styles.innerContainer]}>
          <H3 style={[styles.title, styles.theme.title]}>
            {t('Activity')}
          </H3>
        </View>
      }
      // stickyHeaderIndices={[1]}
      data={data}
      renderItem={({ item }) => (
        <Item
          navigate={navigate}
          incognito={incognito}
          account={account}
          activeToken={activeToken}
          followedAccounts={followedAccounts}
          tx={item}
          theme={theme} />
      )}
      showsVerticalScrollIndicator={false}
      style={[styles.container, styles.theme.container]}
      contentContainerStyle={[
        styles.contentContainer,
        styles.theme.contentContainer,
      ]}
      ref={scrollView}
      keyExtractor={(data) => data.id}
      scrollEventThrottle={8}
    />
    </SafeAreaView>
  );
};

InfiniteScrollViewUpdate.defaultProps = {
  theme: themes.light,
};

export default withTheme(translate()(InfiniteScrollViewUpdate), getStyles());
