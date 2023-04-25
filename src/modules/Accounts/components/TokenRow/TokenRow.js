/* eslint-disable max-statements */
import React from 'react';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { useTheme } from 'contexts/ThemeContext';
import { useTokenMetaQuery } from 'modules/BlockchainApplication/api/useTokenMetaQuery';
import { useTokenAmountInCurrency } from 'modules/SendToken/components/SelectTokenStep/hooks';
import DataRenderer from 'components/shared/DataRenderer';
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
  ).toLocaleString();

  const accountSettings = useSelector((state) => state.settings);

  const {
    data: tokenMetaData,
    isLoading: isTokenMetaLoading,
    error: errorOnTokenMeta,
  } = useTokenMetaQuery(token.tokenID);

  const tokenMeta = tokenMetaData?.data[0];

  const tokenAmountInCurrency = useTokenAmountInCurrency({
    tokenAmount: fromBaseToDisplayDenom({
      amount: token.availableBalance,
      displayDenom: token.displayDenom,
      denomUnits: token.denomUnits,
    }),
    tokenSymbol: tokenMeta?.symbol,
  });

  const { styles } = useTheme({ styles: getTokenRowStyles() });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.row, styles.alignCenter]}>
        <DataRenderer
          data={tokenMeta}
          isLoading={isTokenMetaLoading}
          error={errorOnTokenMeta}
          renderData={(data) => (
            <>
              <Image source={{ uri: data.logo.png }} style={styles.logo} />

              <P style={[styles.title, styles.theme.title]}>{data.chainName}</P>
            </>
          )}
        />
      </View>

      <View style={[styles.balanceContainer]}>
        <DiscreteModeComponent data={balance} blurVariant="balance">
          <H3 style={[styles.theme.title]}>
            {balance} {tokenMeta?.symbol}
          </H3>
        </DiscreteModeComponent>

        {tokenAmountInCurrency.amount && (
          <DataRenderer
            data={tokenMeta}
            isLoading={isTokenMetaLoading}
            error={errorOnTokenMeta}
            renderData={() => (
              <DiscreteModeComponent data={balance} blurVariant="balance">
                <P
                  style={[styles.theme.currency]}
                  testID={`token-currency-${accountSettings.currency}`}
                >
                  {tokenAmountInCurrency.amount} {tokenAmountInCurrency.currency}
                </P>
              </DiscreteModeComponent>
            )}
          />
        )}
      </View>
    </View>
  );
}
