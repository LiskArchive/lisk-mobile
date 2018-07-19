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
  state = {
    reachEnd: true,
  };
  canLoadMore = true;

  loadMore = ({ nativeEvent }) => {
    // const { list, count } = this.props;

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const paddingToBottom = 20;
      return (layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom) && this.state.reachEnd;
    };
    if (isCloseToBottom(nativeEvent) && this.canLoadMore) {
      this.canLoadMore = false;
      this.props.loadMore();
      this.setState({
        reachEnd: false,
      });
    }
  }

  componentWillReceiveProps = () => {
    this.setState({
      reachEnd: true,
    });
  }

  componentWillUpdate = (nextProps) => {
    this.canLoadMore = (this.props.list.length < nextProps.list.length);
  }

  render() {
    return <ScrollView onScroll={this.loadMore}
      style={this.props.style}
      stickyHeaderIndices={this.props.stickyHeaderIndices}
      scrollEventThrottle={400}>{this.props.children}</ScrollView>;
  }
}

export default InfiniteScrollView;
