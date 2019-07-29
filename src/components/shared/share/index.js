import React from 'react';
import { View, Text, Share as ShareAPI } from 'react-native';
import Icon from '../toolBox/icon';
import { colors } from '../../../constants/styleGuide';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';

const Share = ({
  styles, icon, value, style, type, children, containerStyle, iconColor, title,
}) => {
  const Element = type || Text;

  return (
    <View style={[styles.container, containerStyle]}>
      <Element
        style={style}
        onPress={() => ShareAPI.share({
          message: value || children,
          url: '',
        })}>{children || title}</Element>
      {
        icon ? <Icon
                style={styles.icon}
                name='share'
                size={14}
                onPress={() => ShareAPI.share({
                  message: value || children,
                  url: '',
                })}
                color={iconColor || colors.light.blueGray} /> : null
      }
    </View>
  );
};

export default withTheme(Share, getStyles());
