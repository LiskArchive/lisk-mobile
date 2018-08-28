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
    const {
      icon, value, style, type, label,
    } = this.props;
    const Element = type || Text;
    const text = label || value;

    return (<View style={styles.container}
    >
    <Element
      style={style}
      onPress={this.copy}>
        {this.state.copied ? 'copied to clipboard' : text }
    </Element>
    {(icon && !this.state.copied) ?
      <Icon
        style={style}
        iconStyle={styles.icon}
        onPress={this.copy}
        type='font-awesome' name='copy' size={18} /> : null }
    </View>);
  }
}

export default CopyToClipBoard;
