import React from 'react';

import { useSelector } from 'react-redux';

import DataRenderer from 'components/shared/DataRenderer';
import { P } from 'components/shared/toolBox/typography';
import { fromBaseToDisplayDenom } from 'utilities/conversions.utils';
import FormattedNumber from 'components/shared/formattedNumber';
import { useTokenMetaQuery } from 'modules/BlockchainApplication/api/useTokenMetaQuery';
import { useTransactionAssets } from '../../../hooks/useTransactionAssets';

export function TransactionAmount({ transaction, style, address }) {
  const {
    data: tokenMetadata,
    isLoading: isLoadingTokenMetadata,
    error: errorOnTokenMetadata,
  } = useTokenMetaQuery(transaction.params.tokenID);

  const transactionAssets = useTransactionAssets({ transaction, address });

  const language = useSelector((state) => state.settings.language);

  const isTokenTransfer =
    transactionAssets.type === 'token:transfer' ||
    transactionAssets.type === 'token:transferCrossChain';

  if (!isTokenTransfer) {
    return null;
  }

  return (
    <DataRenderer
      data={tokenMetadata?.data}
      isLoading={isLoadingTokenMetadata}
      error={errorOnTokenMetadata}
      renderData={(tokens) => {
        const token = tokens[0];

        if (!token) {
          return null;
        }

        const transactionAmount = fromBaseToDisplayDenom({
          amount: transaction.params.amount,
          displayDenom: token.displayDenom,
          denomUnits: token.denomUnits,
        });

        return (
          <P style={[transactionAssets.amount?.style, style]}>
            {`${transactionAssets.amount?.sign} `}
            <FormattedNumber language={language} tokenType={token.symbol}>
              {transactionAmount}
            </FormattedNumber>
          </P>
        );
      }}
    />
  );
}
