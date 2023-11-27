import React from 'react';
import { Animated } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { P, B } from 'components/shared/toolBox/typography';

import getCreateAccountStyles from './CreateAccountButton.styles';

export default function CreateAccountButton({ onPress, style, opacity = 1 }) {
  const { styles } = useTheme({
    styles: getCreateAccountStyles(),
  });

  return (
    <Animated.View style={[styles.container, style?.container, { opacity }]}>
      <P style={[styles.question, styles.theme.question, style?.question]}>
        {i18next.t('auth.register.createAccountButton.text')}
      </P>

      <B
        testID="createAccountButton"
        style={[styles.link, styles.theme.link, style?.link]}
        onPress={onPress}
      >
        {i18next.t('auth.register.createAccountButton.buttonText')}
      </B>
    </Animated.View>
  );
}
