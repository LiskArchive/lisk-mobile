import React from 'react';
import { Animated } from 'react-native';
import { translate } from 'react-i18next';
import { P, A } from '../../../toolBox/typography';
import styles from './styles';

const CreateAccount = ({
  t, onPress, style, opacity = 1,
}) => (
  <Animated.View style={[styles.linkWrapper, style, { opacity }]}>
    <P style={styles.question}>
      {t('Don’t have a Lisk ID?')}
    </P>

    <A
      testID='createAccountButton'
      style={styles.link}
      onPress={onPress}
    >
      {t('Create it now')}
    </A>
  </Animated.View>
);

export default translate()(CreateAccount);
