import React from 'react';
import { View, Animated } from 'react-native';
import withTheme from '../withTheme';
import getStyles from './styles';

class Progress extends React.Component {
  state = {
    progressRatio: new Animated.Value(0),
  }

  componentDidMount() {
    this.setProgress(0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      this.setProgress(300);
    }
  }

  setProgress(duration) {
    Animated.timing(this.state.progressRatio, {
      toValue: this.props.current / this.props.total,
      duration,
    }).start();
  }

  render() {
    const { styles } = this.props;
    const { progressRatio } = this.state;

    return (
      <View style={[styles.progressContainer, styles.theme.progressContainer]}>
        <Animated.View
          style={[styles.progress, styles.theme.progress, {
            width: progressRatio.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }]}
        />
      </View>
    );
  }
}

export default withTheme(Progress, getStyles());
