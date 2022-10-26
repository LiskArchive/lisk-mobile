import React from 'react';
import { View, Text, Share as ShareAPI } from 'react-native';
import { colors } from 'constants/styleGuide';
import Icon from '../toolBox/icon';
import withTheme from '../withTheme';
import getStyles from './styles';

const Share = ({
  styles,
  icon,
  value,
  style,
  type,
  children,
  containerStyle,
  iconColor,
  title,
}) => {
  const Element = type || Text;

  const shareContent = async () => {
    await ShareAPI.share({
      message: value || children,
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Element style={[style, styles.text]} onPress={shareContent}>
        {children || title}
      </Element>
      {icon && (
        <Icon
          style={styles.icon}
          name="share"
          size={20}
          onPress={shareContent}
          color={iconColor || colors.light.blueGray}
        />
      )}
    </View>
  );
};

export default withTheme(Share, getStyles());
