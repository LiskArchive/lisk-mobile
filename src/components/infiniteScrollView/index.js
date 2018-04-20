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

  loadMore = ({nativeEvent}) => {
    const { list, count } = this.props;

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20;
      return (layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom) && this.state.reachEnd;
    };
    if (isCloseToBottom(nativeEvent) && list.length < count ) {
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

  render () {
    return <ScrollView onScroll={this.loadMore}
    scrollEventThrottle={400}>{this.props.children}</ScrollView>;
  }
}

export default InfiniteScrollView;
