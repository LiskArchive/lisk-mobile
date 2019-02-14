import React from 'react';
import { View, Text, Clipboard } from 'react-native';
import { translate } from 'react-i18next';
import Icon from '../toolBox/icon';
import { colors } from '../../constants/styleGuide';
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
  }

  componentWillUnmount() {
    clearTimeout(this.Timeout);
  }

  render() {
    const {
      showIcon, value, type, label, iconColor, iconSize,
      styles, style, iconStyle, labelStyle, t,
    } = this.props;
    const Element = type || Text;
    const text = label || value;

    return (<View style={[styles.container, style]}>
      <Element
        style={labelStyle}
        onPress={this.copy}>
          {this.state.copied ? t('Copied to clipboard') : text }
      </Element>
      {(showIcon && !this.state.copied) ?
        <Icon
          onPress={this.copy}
          name='copy'
          color={iconColor || colors.light.white}
          size={iconSize || 16}
          style={[styles.icon, iconStyle]}/> : null }
      </View>);
  }
}

export default withTheme(translate()(CopyToClipBoard), getStyles());
