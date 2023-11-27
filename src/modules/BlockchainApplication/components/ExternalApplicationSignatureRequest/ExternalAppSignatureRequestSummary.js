import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import TransactionSummary from 'modules/Transactions/components/TransactionSummary';
import { useTransactionSummary } from 'modules/Transactions/components/TransactionSummary/hooks';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { H3, P } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';

import getExternalApplicationSignatureRequestStyles from './styles';

export default function ExternalAppSignatureRequestSummary({
  session,
  transaction,
  senderApplicationChainID,
  onSubmit,
  onCancel,
}) {
  const summary = useTransactionSummary({
    recipientApplicationChainID: senderApplicationChainID,
    recipientAccountAddress: transaction.params.recipientAddress.toString('hex'),
    tokenID: transaction.params.tokenID.toString('hex'),
    amount: Number(transaction.params.amount),
    message: transaction.params.data.toString('hex'),
    priority: transaction.priority ? transaction.priority.toString('hex') : 'low',
    fee: transaction.fee,
  });

  const { styles } = useTheme({ styles: getExternalApplicationSignatureRequestStyles });

  return (
    <View style={styles.container}>
      <H3 style={[styles.title, styles.theme.title]}>
        {i18next.t('application.externalApplicationSignatureRequest.summary.title')}
      </H3>

      <P style={[styles.description, styles.theme.description]}>
        {i18next.t('application.externalApplicationSignatureRequest.summary.description')}
      </P>

      <View style={[styles.chainIDContainer, styles.theme.chainIDContainer]}>
        <P style={[styles.description, styles.theme.description]}>Chain ID</P>

        <P style={[styles.chainIDValue, styles.theme.chainIDValue]}>{senderApplicationChainID}</P>
      </View>

      <TransactionSummary
        {...summary}
        senderApplication={{
          displayName: session.peer.metadata.name,
          logo: { png: session.peer.metadata.icons[0] },
        }}
      />

      <View style={[styles.footer]}>
        <Button style={[styles.buttonLeft]} onPress={onCancel}>
          {i18next.t('application.externalApplicationSignatureRequest.summary.cancelButtonText')}
        </Button>

        <PrimaryButton style={[styles.buttonRight]} onPress={onSubmit}>
          {i18next.t('application.externalApplicationSignatureRequest.summary.continueButtonText')}
        </PrimaryButton>
      </View>
    </View>
  );
}
