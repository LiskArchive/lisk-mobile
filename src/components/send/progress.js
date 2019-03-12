import React from 'react';
import { View, Animated } from 'react-native';
import connect from 'redux-connect-decorator';
import { tokenMap } from '../../constants/tokens';
import withTheme from '../withTheme';
import getStyles from './styles';
import { colors } from '../../constants/styleGuide';

@connect(state => ({
  activeToken: state.settings.token.active,
}))
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
    const {
      styles, current, total, activeToken,
    } = this.props;
    const { progressRatio } = this.state;

    let color = colors.light.blue;
    if (activeToken === tokenMap.BTC.key) {
      color = colors.light.btc;
    }

    return (
      <View style={[
        styles.progressContainer,
        styles.theme.progressContainer,
        { opacity: current === total ? 0 : 1 },
      ]}>
        <Animated.View
          style={[styles.progress, {
            backgroundColor: color,
            width: progressRatio.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '120%'],
            }),
          }]}
        />
      </View>
    );
  }
}

export default withTheme(Progress, getStyles());
