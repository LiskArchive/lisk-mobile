import React from 'react';
import { View } from 'react-native';

import TransactionSummary from 'modules/Transactions/components/TransactionSummary';
import { useTransactionSummary } from 'modules/Transactions/components/TransactionSummary/hooks';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';

import getExternalApplicationSignatureRequestStyles from './styles';

export default function ExternalAppSignatureRequestSummary({
  session,
  transaction,
  recipientApplicationChainID,
  onSubmit,
  onCancel,
}) {
  const summary = useTransactionSummary({
    recipientApplicationChainID,
    recipientAccountAddress: transaction.params.recipientAddress.toString('hex'),
    tokenID: transaction.params.tokenID.toString('hex'),
    amount: Number(transaction.params.amount),
    message: transaction.params.data.toString('hex'),
    priority: transaction.priority ? transaction.priority.toString('hex') : 'low',
    fee: transaction.fee,
  });

  const { styles } = useTheme({ styles: getExternalApplicationSignatureRequestStyles });

  return (
    <>
      <TransactionSummary
        {...summary}
        senderApplication={{
          chainName: session.peer.metadata.name,
          logo: { png: session.peer.metadata.icons[0] },
        }}
      />

      <View style={[styles.buttonContainer]}>
        <Button style={[styles.button]} onPress={onCancel}>
          Back
        </Button>

        <PrimaryButton style={[styles.button]} onPress={onSubmit}>
          Approve
        </PrimaryButton>
      </View>
    </>
  );
}
