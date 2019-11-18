import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import { B, P } from '../../../../../shared/toolBox/typography';
import FormattedNumber from '../../../../../shared/formattedNumber';
import withTheme from '../../../../../shared/withTheme';
import getStyles from './styles';
import darkBlur from '../../../../../../assets/images/amountFormBalanceBlur/dark.png';
import lightBlur from '../../../../../../assets/images/amountFormBalanceBlur/light.png';

const blurs = { dark: darkBlur, light: lightBlur };

const AmountBalance = ({
  t,
  styles,
  theme,
  incognito,
  value = 0,
  tokenType,
  language,
}) => (
  <View
    style={[
      styles.balanceContainer,
      styles.theme.balanceContainer,
      incognito ? styles.balanceContainerIncognito : {},
    ]}
  >
    <P style={[styles.balanceText, styles.theme.balanceText]}>
      {t('Your Balance')}
    </P>

    {incognito ? (
      <Image source={blurs[theme]} style={styles.balanceIncognito} />
    ) : (
      <FormattedNumber
        type={B}
        style={[styles.balanceNumber, styles.theme.balanceNumber]}
        tokenType={tokenType}
        language={language}
      >
        {value}
      </FormattedNumber>
    )}
  </View>
);

export default withTheme(translate()(AmountBalance), getStyles());
