import React from 'react';
import { FlatList, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { getInfiniteScrollListStyles } from './styles';

export default function InfiniteScrollList(props) {
  const { styles } = useTheme({ styles: getInfiniteScrollListStyles() });

  const fetchMore = () => {
    if (props.hasNextPage) {
      props.fetchNextPage();
    }
  };

  const renderItem = ({ item }) => props.renderItem(item);

  const renderSpinner = props.renderSpinner || (() => <Text>Loading...</Text>);

  const keyExtractor = props.keyExtractor || (({ id }) => id);

  return (
    <FlatList
      data={props.data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={fetchMore}
      onEndReachedThreshold={props.onEndReachedThreshold || 0.2}
      contentContainerStyle={[styles.container, props.style?.container]}
      ListFooterComponent={props.isFetchingNextPage ? renderSpinner : null}
    />
  );
}
