/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import * as Lisk from '@liskhq/lisk-client';

import { useTheme } from 'hooks/useTheme';
import { useTokenMetaQuery } from 'modules/BlockchainApplication/api/useTokenMetaQuery';
import { useTokenAmountInCurrency } from 'modules/SendToken/components/SelectTokenStep/hooks';
import DataRenderer from 'components/shared/DataRenderer';
import { P, H3 } from 'components/shared/toolBox/typography';
import { fromRawLsk } from 'utilities/conversions';
import TokenSvg from 'assets/svgs/TokenSvg';

import getTokenRowStyles from './styles';

export default function TokenRow({ token }) {
  const balance = Number(fromRawLsk(token.availableBalance)).toLocaleString();

  const {
    data: tokenMetaData,
    isLoading: isTokenMetaLoading,
    error: errorOnTokenMeta,
  } = useTokenMetaQuery(token.tokenID);

  const tokenAmountInCurrency = useTokenAmountInCurrency({
    tokenAmount: Lisk.transactions.convertBeddowsToLSK(token.availableBalance),
    tokenSymbol: tokenMetaData?.data[0]?.symbol,
  });

  const { styles } = useTheme({ styles: getTokenRowStyles() });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.row, styles.alignCenter]}>
        <DataRenderer
          data={tokenMetaData?.data[0]}
          isLoading={isTokenMetaLoading}
          error={errorOnTokenMeta}
          renderData={(data) => (
            <>
              <TokenSvg symbol={data.symbol} height={28} width={28} />

              <P style={[styles.title, styles.theme.title]}>{data.chainName}</P>
            </>
          )}
        />
      </View>

      <View style={[styles.balanceContainer]}>
        <H3 style={[styles.theme.title]}>{balance}</H3>

        <DataRenderer
          data={tokenMetaData?.data[0]}
          isLoading={isTokenMetaLoading}
          error={errorOnTokenMeta}
          renderData={() => (
            <P style={[styles.theme.currency]}>
              {tokenAmountInCurrency.amount} {tokenAmountInCurrency.currency}
            </P>
          )}
        />
      </View>
    </View>
  );
}
