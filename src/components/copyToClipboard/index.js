import React from 'react';
import { View, Text, Clipboard } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class CopyToClipBoard extends React.Component {
  state = { copied: false };
  copy = () => {
    this.setState({ copied: !this.state.copied });
    Clipboard.setString(this.props.value);
    setTimeout(() => {
      this.setState({ copied: !this.state.copied });
    }, 4000);
  }
  render() {
    const { icon, value, style } = this.props;
    return (<View style={styles.container}
    >
    <Text
      style={style}
      onPress={this.copy}>
        {this.state.copied ? 'copied to clipboard' : value}
    </Text>
    {(icon && !this.state.copied) ?
      <Icon
        iconStyle={styles.icon}
        onPress={this.copy}
        type='font-awesome' name='copy' size={18} /> : null }
    </View>);
  }
}

export default CopyToClipBoard;
