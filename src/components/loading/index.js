import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import styles from './styles';

@connect(state => ({
  loading: state.loading,
}), {})
class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
    this.animationDuration = 1000;
  }

  show() {
    this.setState({
      visible: true,
      startTime: new Date(),
    });
  }

  hide() {
    const offset = new Date() - this.state.startTime;
    this.timeout = setTimeout(() => {
      this.setState({ visible: false });
    }, this.animationDuration - (offset % this.animationDuration));
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

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return <View style={this.state.visible ? styles.visible : styles.hidden}></View>;
  }
}

export default Loading;
