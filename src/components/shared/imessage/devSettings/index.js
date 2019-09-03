import React from 'react';
import { NativeModules, View, TouchableHighlight, Text } from 'react-native';
import styles from './styles';

class DevSettings extends React.Component {
  state = {
    liveReloadEnabled: false,
    remoteDebuggingEnabled: false,
  };

  componentDidMount() {
    this.onToggleLiveReload();
  }

  onToggleRemoteDebugging = () => {
    const remoteDebuggingEnabled = !this.state.remoteDebuggingEnabled;

    NativeModules.DevSettings.setIsDebuggingRemotely(remoteDebuggingEnabled);

    this.setState({
      remoteDebuggingEnabled,
    });
  };

  onToggleLiveReload = () => {
    const liveReloadEnabled = !this.state.liveReloadEnabled;

    NativeModules.DevSettings.setLiveReloadEnabled(liveReloadEnabled);

    this.setState({
      liveReloadEnabled,
    });
  };

  render() {
    const { liveReloadEnabled, remoteDebuggingEnabled } = this.state;

    return (
      <View style={styles.wrapper}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onToggleRemoteDebugging}
        >
          <Text style={styles.buttonText}>
            {remoteDebuggingEnabled ? 'Disable' : 'Enable'} Remote Debugging
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.onToggleLiveReload}
        >
          <Text style={styles.buttonText}>
            {liveReloadEnabled ? 'Disable' : 'Enable'} Live Reload
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default DevSettings;
