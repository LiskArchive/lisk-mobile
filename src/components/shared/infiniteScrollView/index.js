import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { themes, colors } from '../../../constants/styleGuide';

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
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };
    if (isCloseToBottom(nativeEvent) && this.canLoadMore) {
      this.canLoadMore = false;
      this.props.loadMore();
    }
  };

  componentDidUpdate() {
    this.canLoadMore = this.props.list.length < this.props.count;
  }

  onScroll = e => {
    this.props.onScroll(e);
    this.loadMore(e);
  };

  scrollTo = y => {
    this.scrollView.scrollTo({ y });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.refresh().then(() => {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 2000);
    });
  };

  render() {
    return (
      <ScrollView
        onScroll={this.onScroll}
        refreshControl={
          <RefreshControl
            progressViewOffset={170}
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            tintColor={
              this.props.theme === themes.light
                ? colors.light.slateGray
                : colors.dark.platinum
            }
          />
        }
        ref={el => {
          this.scrollView = el;
        }}
        style={this.props.style}
        stickyHeaderIndices={this.props.stickyHeaderIndices}
        scrollEventThrottle={8}
      >
        {this.props.render(this.state.refreshing)}
      </ScrollView>
    );
  }
}

InfiniteScrollView.defaultProps = {
  theme: themes.light,
};

export default InfiniteScrollView;
