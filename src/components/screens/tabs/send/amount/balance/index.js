import React from 'react';
import {
  View, Image, Text, ImageBackground
} from 'react-native';
import { translate } from 'react-i18next';
import { B, P } from '../../../../../shared/toolBox/typography';
import FormattedNumber from '../../../../../shared/formattedNumber';
import withTheme from '../../../../../shared/withTheme';
import getStyles from './styles';
import darkBlur from '../../../../../../assets/images/amountFormBalanceBlur/dark.png';
import lightBlur from '../../../../../../assets/images/amountFormBalanceBlur/light.png';
import amountBg from '../../../../../../assets/images/amount-bg.png';
import amountBgLight from '../../../../../../assets/images/amount-bg-light.png';
import { themes } from '../../../../../../constants/styleGuide';

const blurs = { dark: darkBlur, light: lightBlur };

const AmountBalance = ({
  t,
  styles,
  theme,
  incognito,
  value = 0,
  tokenType,
  language,
  currency,
  valueInCurrency
}) => (
  <ImageBackground
    style={[
      styles.balanceContainer,
      styles.theme.balanceContainer,
    ]}
    source={theme === themes.dark ? amountBg : amountBgLight}
  >
    <P style={[styles.balanceText, styles.theme.balanceText]}>{t('Available Balance')}</P>
    {incognito ? (
      <Image source={blurs[theme]} style={styles.balanceIncognito} />
    ) : (
      <View style={[styles.row]}>
        <FormattedNumber
          type={B}
          style={[styles.balanceNumber, styles.theme.balanceNumber]}
          tokenType={tokenType}
          language={language}
        >
          {value}
        </FormattedNumber>
        {valueInCurrency ? (
          <View style={styles.currencyContainer}>
            <Text style={[styles.translated, styles.theme.translated]}>
              <Text>~&nbsp;</Text>
              {`${valueInCurrency} ${currency}`}
            </Text>
          </View>
        ) : null}
      </View>
    )}
  </ImageBackground>
);

export default withTheme(translate()(AmountBalance), getStyles());
