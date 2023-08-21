import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import InfoRoundSvg from 'assets/svgs/InfoRoundSvg';
import WarningSvg from 'assets/svgs/WarningSvg';

import { P, B } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
import { colors } from 'constants/styleGuide';

const InfoComponent = ({ text, buttonText, onPress, styles, variant = 'info' }) => {
  let icon = null;

  switch (variant) {
    case 'info':
      icon = <InfoRoundSvg />;
      break;
    case 'warning':
      icon = <WarningSvg color={colors.light.yellowCopacabana} />;
      break;
    default:
      icon = <InfoRoundSvg />;
  }

  return (
    <View style={[styles.container, styles.theme.container, styles.theme[`${variant}Container`]]}>
      {icon}
      <View style={styles.description}>
        <P style={[styles.copy, styles.theme.copy, styles.theme[`${variant}`]]}>{text}</P>
      </View>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <B style={[styles.theme.button]}>{buttonText}</B>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withTheme(InfoComponent, getStyles());
