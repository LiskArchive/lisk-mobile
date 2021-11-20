import React from 'react';
import { View, Text, Clipboard } from 'react-native';
import { translate } from 'react-i18next';
import Icon from '../toolBox/icon';
import { colors } from '../../../constants/styleGuide';
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
    } = this.props;
    const Element = type || Text;
    const text = label || value;

    return (
      <View style={[styles.container, style]}>
        <Element style={labelStyle} onPress={this.copy}>
          {text}
        </Element>
        <Icon
          onPress={this.copy}
          name={this.state.copied ? 'checkmark' : 'copy'}
          color={this.state.copied ? colors.light.ufoGreen : colors.light.blueGray}
          size={iconSize || 16}
          style={[iconStyle]}
        />
      </View>
    );
  }
}

export default withTheme(translate()(CopyToClipBoard), getStyles());
