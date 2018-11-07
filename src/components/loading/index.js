import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import progressBar from '../../assets/animations/progressBar.json';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  loading: state.loading,
}), {})
class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      loop: true,
    };
  }

  show() {
    this.setState({ loop: true });
    this.animation.play();
  }

  hide() {
    this.setState({ loop: false });
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
    const { styles } = this.props;

    return <View style={styles.wrapper}>
      <LottieView
        style={styles.animation}
        source={progressBar}
        loop={this.state.loop}
        ref={(el) => { this.animation = el; }}/>
    </View>;
  }
}

export default withTheme(Loading, getStyles());
