import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';

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
  state = {
    refreshing: false,
  };

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
    this.canLoadMore = (this.props.list.length !== nextProps.list.length) || this.state.refreshing;
  }

  onScroll(e) {
    this.props.onScroll(e);
    this.loadMore(e);
  }

  scrollTo = (y) => {
    this.scrollView.scrollTo({ y });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.refresh().then(() => {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 2000);
    });
  }

  render() {
    return <ScrollView onScroll={this.onScroll.bind(this)}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          />
      }
      ref={((el) => { this.scrollView = el; })}
      style={this.props.style}
      stickyHeaderIndices={this.props.stickyHeaderIndices}
      scrollEventThrottle={8}>
      {this.props.children}
    </ScrollView>;
  }
}

export default InfiniteScrollView;
