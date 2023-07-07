/* eslint-disable max-statements */
import React from 'react';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { useTheme } from 'contexts/ThemeContext';
import { useTokenAmountInCurrency } from 'modules/SendToken/components/SelectTokenStep/hooks';
import { P, H3 } from 'components/shared/toolBox/typography';
import DiscreteModeComponent from 'components/shared/DiscreteModeComponent';
import { fromBaseToDisplayDenom } from 'utilities/conversions.utils';

import getTokenRowStyles from './TokenRow.styles';

export default function TokenRow({ token }) {
  const balance = Number(
    fromBaseToDisplayDenom({
      amount: token.availableBalance,
      displayDenom: token.displayDenom,
      denomUnits: token.denomUnits,
    })
  ).toLocaleString('en-US');

  const accountSettings = useSelector((state) => state.settings);

  const tokenAmountInCurrency = useTokenAmountInCurrency({
    tokenAmount: fromBaseToDisplayDenom({
      amount: token.availableBalance,
      displayDenom: token.displayDenom,
      denomUnits: token.denomUnits,
    }),
    tokenSymbol: token.symbol,
  });

  const { styles } = useTheme({ styles: getTokenRowStyles() });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.row, styles.alignCenter]}>
        <Image source={{ uri: token.logo.png }} style={styles.logo} />

        <P style={[styles.title, styles.theme.title]}>{token.chainName}</P>
      </View>

      <View style={[styles.balanceContainer]}>
        <DiscreteModeComponent data={balance} blurVariant="balance">
          <H3 style={[styles.balanceText, styles.theme.balanceText]}>
            {balance} {token.symbol}
          </H3>
        </DiscreteModeComponent>

        {tokenAmountInCurrency.amount && (
          <DiscreteModeComponent data={balance} blurVariant="balance">
            <P
              style={[styles.currencyText, styles.theme.currencyText]}
              testID={`token-currency-${accountSettings.currency}`}
            >
              ~{tokenAmountInCurrency.amount} {tokenAmountInCurrency.currency}
            </P>
          </DiscreteModeComponent>
        )}
      </View>
    </View>
  );
}
