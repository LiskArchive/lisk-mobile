import React from 'react';
import { Text, Clipboard } from 'react-native';
import { translate } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from 'constants/styleGuide';
import Icon from '../toolBox/icon';
import withTheme from '../withTheme';
import getStyles from './styles';

class CopyToClipBoard extends React.Component {
  state = { copied: false };

  copy = () => {
    this.setState({ copied: !this.state.copied });
    Clipboard.setString(this.props.value);
    this.Timeout = setTimeout(() => {
      this.setState({ copied: !this.state.copied });
    }, 4000);
  };

  componentWillUnmount() {
    clearTimeout(this.Timeout);
  }

  render() {
    const {
      value,
      type,
      label,
      iconSize,
      styles,
      style,
      iconStyle,
      labelStyle,
      iconColor,
    } = this.props;
    const Element = type || Text;
    const text = label || value;

    const color = iconColor || colors.light.blueGray;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={this.copy}>
        <Element style={labelStyle}>
          {text}
        </Element>
        <TouchableOpacity onPress={this.copy}>
          <Icon
            name={this.state.copied ? 'checkmark' : 'copy'}
            color={this.state.copied ? colors.light.ufoGreen : color}
            size={iconSize || 16}
            style={[styles.copyIcon, iconStyle]}
            />
          </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

export default withTheme(translate()(CopyToClipBoard), getStyles());
