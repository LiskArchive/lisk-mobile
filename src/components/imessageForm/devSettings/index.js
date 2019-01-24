import React from 'react';
import { NativeModules, View, TouchableHighlight, Text } from 'react-native';
import styles from './styles';

class DevSettings extends React.Component {
  state = {
    liveReloadEnabled: false,
  }

  componentDidMount() {
    this.onToggleLiveReload();
  }

  onToggleLiveReload = () => {
    const liveReloadEnabled = !this.state.liveReloadEnabled;

    NativeModules.DevSettings.setLiveReloadEnabled(liveReloadEnabled);

    this.setState({
      liveReloadEnabled,
    });
  }

  onOpenDeepLink = () => {
    NativeModules.MessagesManager.openURL('lisk://wallet')
      .then(console.log)
      .catch(console.log);
  }

  render() {
    const { liveReloadEnabled } = this.state;

    return (
      <View style={styles.wrapper}>
        <TouchableHighlight style={styles.button} onPress={this.onToggleLiveReload}>
          <Text style={styles.buttonText}>
            {liveReloadEnabled ? 'Disable' : 'Enable'} Live Reload
          </Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={this.onOpenDeepLink}>
          <Text style={styles.buttonText}>
            Open Lisk App
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default DevSettings;
