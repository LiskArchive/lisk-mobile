/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Animated,
  View,
  Dimensions,
} from 'react-native';
import getStyles from './styles';
import withTheme from '../withTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 170;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 30;

class RNParallax extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight;
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props;
    return headerMinHeight;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight();
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props;
    return extraScrollHeight;
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }

  getHeaderHeight() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight() + this.getExtraScrollHeight(),
        this.getHeaderMaxHeight(),
        this.getHeaderMinHeight(),
      ],
      extrapolate: 'clamp',
    });
  }

  getNavBarOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });
  }

  getNavBarForegroundOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowNavBar } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: 'clamp',
    });
  }

  getTitleTranslateY() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: 'clamp',
    });
  }

  getTitleOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowTitle } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, alwaysShowTitle ? 1 : 0],
      extrapolate: 'clamp',
    });
  }

  renderHeaderTitle() {
    const { title, headerTitleStyle } = this.props;
    const titleTranslateY = this.getTitleTranslateY();
    const titleOpacity = this.getTitleOpacity();
    const { styles } = this.props;

    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [{ translateY: titleTranslateY }],
            height: this.getHeaderHeight(),
            opacity: titleOpacity,
          },
          headerTitleStyle,
        ]}>
        {title}
      </Animated.View>
    );
  }

  renderScrollView() {
    const {
      renderContent,
      scrollViewProps,
      refreshControl
    } = this.props;
    const { scrollY } = this.state;
    const { onScroll } = scrollViewProps;

    const renderableScrollViewProps = { ...scrollViewProps };
    delete renderableScrollViewProps.onScroll;
    const { styles } = this.props;

    return (
      <Animated.ScrollView
        style={[styles.scrollView]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
            listener: onScroll,
          },
        )}
        refreshControl={refreshControl}
        {...renderableScrollViewProps}>
        <View
          style={[{ marginTop: this.getHeaderMaxHeight() }]}>
          {renderContent()}
        </View>
      </Animated.ScrollView>
    );
  }

  render() {
    const { containerStyle } = this.props;
    const { styles } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderScrollView()}
        {this.renderHeaderTitle()}
      </View>
    );
  }
}

export default withTheme(RNParallax, getStyles());
