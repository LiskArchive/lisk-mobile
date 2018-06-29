import React from 'react';
import connect from 'redux-connect-decorator';
import { Text } from 'react-native';

@connect(state => ({
  loading: state.loading,
  peers: state.peers,
}), {})
class LoadingBar extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.markedAsLoaded = false;
  }

  markLoaded() {
    this.props.markAsLoaded();
    this.markedAsLoaded = true;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.markedAsLoaded && nextProps.peers.data) this.markLoaded();

    if (nextProps.loading && nextProps.loading.length > 0 && this.props.loading.length === 0) {
      this.startTime = new Date();
      this.setState({ visible: true });
    }
    if (nextProps.loading && nextProps.loading.length === 0 && this.props.loading.length > 0) {
      const timeDiff = new Date() - this.startTime;
      const animationDuration = 1000;
      this.timeout = setTimeout(() => {
        this.setState({ visible: false });
      }, animationDuration - (timeDiff % animationDuration));
    }
  }

  componentDidMount() {
    if (this.props.peers.data) this.markLoaded();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return <Text>{ this.state.visible ? 'Loading...' : '' }</Text>;
  }
}

export default LoadingBar;
