import React from 'react';
import { FlatList, Text } from 'react-native';

/**
 * Infinite scroll list component for rendering API fetched paginated data.
 * @param {Array<Object>} data - List of distinct items to render.
 * @param {Function?} keyExtractor - Function that extracts a unique key for a given
 * item at the specified index. Key is used for caching and as the react key to track
 * item re-ordering. The default extractor checks item.key, then falls back to
 * using the index, like React does.
 * @param {Function} renderItem - Function that takes an item from data and renders
 * it into the list.
 * @param {boolean} hasNextPage - Flag that indicates if there is more data
 * to fetch from the server.
 * @param {Function} fetchNextPage - Function to fetch the data of the next page.
 * @param {boolean} isFetchingNextPage - Flag that indicates if the api data fetcher is
 * requesting data.
 * @param {Function?} renderSpinner - Function to render a loader spinner during fetching
 * next page state.
 * @param {number?} onEndReachedThreshold - How far from the end (in units of visible
 * length of the list) the bottom edge of the list must be from the end of the content to
 * trigger the onEndReached callback. Default is 0.2.
 */
export default function InfiniteScrollList({
  showVerticalScrollIndicator = false,
  ...props
}) {
  const fetchMore = () => {
    if (props.hasNextPage) {
      props.fetchNextPage();
    }
  };

  const renderItem = ({ item }) => props.renderItem(item);

  const renderSpinner = props.renderSpinner || (() => <Text>Loading...</Text>);

  return (
    <FlatList
      data={props.data}
      keyExtractor={props.keyExtractor}
      renderItem={renderItem}
      onEndReached={fetchMore}
      onEndReachedThreshold={props.onEndReachedThreshold || 0.2}
      ListFooterComponent={props.isFetchingNextPage ? renderSpinner : null}
      showVerticalScrollIndicator={showVerticalScrollIndicator}
    />
  );
}
