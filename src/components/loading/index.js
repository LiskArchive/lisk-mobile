import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Animated, Dimensions } from 'react-native';
import styles from './styles';

@connect(state => ({
  loading: state.loading,
}), {})
class Loading extends React.Component {
  constructor() {
    super();
    const { width } = Dimensions.get('window');
    this.animationDuration = 1000;
    this.startValue = -200;
    this.endValue = width;
    this.state = {
      left: new Animated.Value(-200),
    };
    this.playing = false;
  }

  show() {
    this.playing = true;
    this.animate();
  }

  hide() {
    this.playing = false;
  }

  animate() {
    if (this.playing) {
      const fn = this.animate.bind(this);
      Animated.timing(this.state.left, {
        toValue: this.endValue,
        duration: this.animationDuration,
      }).start(() => {
        Animated.timing(this.state.left, {
          toValue: this.startValue,
          duration: this.animationDuration,
        }).start(fn);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      if (nextProps.loading.length > 0 && this.props.loading.length === 0) {
        this.show();
      } else if (nextProps.loading.length === 0 && this.props.loading.length > 0) {
        this.hide();
      }
    }
  }

  render() {
    return <View style={styles.wrapper}>
      <Animated.View style={[styles.stripe, { left: this.state.left }]}></Animated.View>
    </View>;
  }
}

export default Loading;
