import React from 'react';
import { ScrollView } from 'react-native';

/**
 * InfiniteScrollView is a wrapper for react native ScrollView
 * component.
 * Accepts 3 parameter
 *
 * @param {Array} list - The list to fill on scroll
 * @param {Number} count - The maximum amount possible in the list
 */
class InfiniteScrollView extends React.Component {
  canLoadMore = true;

  loadMore = ({ nativeEvent }) => {
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const paddingToBottom = 20;
      return (layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom);
    };

    if (isCloseToBottom(nativeEvent) && this.canLoadMore) {
      this.canLoadMore = false;
      this.props.loadMore();
    }
  }

  componentWillUpdate = (nextProps) => {
    this.canLoadMore = (this.props.list.length !== nextProps.list.length);
  }

  onScroll(e) {
    this.props.onScroll(e);
    this.loadMore(e);
  }

  render() {
    return <ScrollView onScroll={this.onScroll.bind(this)}
      style={this.props.style}
      stickyHeaderIndices={this.props.stickyHeaderIndices}
      scrollEventThrottle={8}>{this.props.children}</ScrollView>;
  }
}

export default InfiniteScrollView;
