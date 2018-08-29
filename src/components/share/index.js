import React from 'react';
import { View, Text, Share as ShareAPI } from 'react-native';
import Icon from '../toolBox/icon';
import { colors } from '../../constants/styleGuide';
import styles from './styles';

const Share = ({
  icon, value, style, type, children, containerStyle, color,
}) => {
  const Element = type || Text;

  return (
    <View style={[styles.container, containerStyle]}>
      <Element
        style={style}
        onPress={() => ShareAPI.share({
          message: value || children,
          url: '',
        })}>{children || value}</Element>
      {
        icon ? <Icon
                style={styles.icon}
                name='share'
                size={14}
                onPress={() => ShareAPI.share({
                  message: value || children,
                  url: '',
                })}
                color={color || colors.grayScale1} /> : null
      }
    </View>
  );
};

export default Share;
