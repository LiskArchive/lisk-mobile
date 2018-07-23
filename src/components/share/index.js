import React from 'react';
import { View, Text, Share as ShareAPI } from 'react-native';
import Icon from '../toolBox/icon';
import shareIcon from '../../assets/images/icons/share.svg';
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
        icon ? <Icon style={styles.icon} src={shareIcon} size={16} /> : null
      }
    </View>
  );
};

export default Share;
