import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { P } from '../../../toolBox/typography';
import { deviceHeight, SCREEN_HEIGHTS } from '../../../../utilities/device';
import withTheme from '../../../withTheme';
import getStyles from './styles';

const AmountHeader = ({ styles, t }) => (deviceHeight() < SCREEN_HEIGHTS.SM ? null : (
  <View style={styles.headerContainer}>
    <P style={styles.theme.subHeader}>
      {t('Enter the amount you want to send.')}
    </P>
  </View>
));

export default withTheme(translate()(AmountHeader), getStyles());
