import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import { B } from '../../../toolBox/typography';
import FormattedNumber from '../../../formattedNumber';
import withTheme from '../../../withTheme';
import getStyles from './styles';
import darkBlur from '../../../../assets/images/amountFormBalanceBlur/dark.png';
import lightBlur from '../../../../assets/images/amountFormBalanceBlur/light.png';

const blurs = { dark: darkBlur, light: lightBlur };

const AmountBalance = ({
  t,
  styles,
  theme,
  incognito,
  value = 0,
  tokenType,
}) => (
  <View
    style={[
      styles.balanceContainer,
      styles.theme.balanceContainer,
      (incognito ? styles.balanceContainerIncognito : {}),
    ]}
  >
    <B style={[styles.balanceText, styles.theme.balanceText]}>
      {t('You have')}
    </B>

    {incognito ?
      <Image
        source={blurs[theme]}
        style={styles.balanceIncognito}
      /> :
      <FormattedNumber
        type={B}
        style={[styles.balanceNumber, styles.theme.balanceNumber]}
        tokenType={tokenType}
      >
        {value}
      </FormattedNumber>
    }
  </View>
);

export default withTheme(translate()(AmountBalance), getStyles());
