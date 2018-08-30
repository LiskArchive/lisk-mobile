import React from 'react';
import { View, Text, Clipboard } from 'react-native';
import Icon from '../toolBox/icon';
import { colors } from '../../constants/styleGuide';
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
      showIcon, value, type, label, iconColor, iconSize,
      style, iconStyle, labelStyle,
    } = this.props;
    const Element = type || Text;
    const text = label || value;

    return (<View style={[styles.container, style]}>
      <Element
        style={labelStyle}
        onPress={this.copy}>
          {this.state.copied ? 'copied to clipboard' : text }
      </Element>
      {(showIcon && !this.state.copied) ?
        <Icon
          onPress={this.copy}
          name='copy'
          color={iconColor || colors.white}
          size={iconSize || 16}
          style={[styles.icon, iconStyle]}/> : null }
      </View>);
  }
}

export default CopyToClipBoard;
