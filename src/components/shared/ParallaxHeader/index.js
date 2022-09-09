/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import getStyles from './styles'
import withTheme from '../withTheme'

class RNParallax extends Component {
  constructor() {
    super()
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props
    return headerMaxHeight
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props
    return headerMinHeight
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight()
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props
    return extraScrollHeight
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance() - 50]
  }

  getHeaderHeight() {
    const { scrollY } = this.state
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight() + this.getExtraScrollHeight(),
        this.getHeaderMaxHeight(),
        this.getHeaderMinHeight(),
      ],
      extrapolate: 'clamp',
    })
  }

  getNavBarOpacity() {
    const { scrollY } = this.state
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    })
  }

  getNavBarForegroundOpacity() {
    const { scrollY } = this.state
    const { alwaysShowNavBar } = this.props
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: 'clamp',
    })
  }

  getTitleTranslateY() {
    const { scrollY } = this.state
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: 'clamp',
    })
  }

  getTitleOpacity() {
    const { scrollY } = this.state
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })
  }

  renderHeaderTitle() {
    const { title, headerTitleStyle } = this.props
    const titleTranslateY = this.getTitleTranslateY()
    const titleOpacity = this.getTitleOpacity()
    const { styles } = this.props

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
        ]}
      >
        {title}
      </Animated.View>
    )
  }

  renderScrollView() {
    const { renderContent, scrollViewProps, refreshControl, reference } = this.props
    const { scrollY } = this.state
    const { onScroll } = scrollViewProps

    const renderableScrollViewProps = { ...scrollViewProps }
    delete renderableScrollViewProps.onScroll
    const { styles } = this.props

    return (
      <Animated.ScrollView
        style={[styles.scrollView]}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
          listener: onScroll,
        })}
        ref={reference}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
        {...renderableScrollViewProps}
      >
        {this.renderHeaderTitle()}
        <View style={[{ marginTop: this.getHeaderMaxHeight() }]}>{renderContent()}</View>
      </Animated.ScrollView>
    )
  }

  render() {
    const { containerStyle } = this.props
    const { styles } = this.props
    return <View style={[styles.container, containerStyle]}>{this.renderScrollView()}</View>
  }
}

export default withTheme(RNParallax, getStyles())
