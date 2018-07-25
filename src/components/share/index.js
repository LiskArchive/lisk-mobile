import React from 'react';
import { View, Text, Share as ShareAPI } from 'react-native';
import Icon from '../toolBox/icon';
import colors from '../../constants/styleGuide/colors';
import styles from './styles';

const Share = ({
  icon, value, style, type, children, containerStyle,
}) => {
  const Element = type || Text;

  return (
    <View style={[styles.container, containerStyle]}>
      <Element
        style={style}
        onPress={() => ShareAPI.share({
          message: value || children,
          url: '',
        })}>{value || children}</Element>
      {
        icon ? <Icon style={styles.icon} name='share' size={14} color={colors.grayScale1} /> : null
      }
    </View>
  );
};

export default Share;
