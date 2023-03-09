/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'contexts/ThemeContext';
import TransactionSummary from 'modules/Transactions/components/TransactionSummary';
import { useTransactionSummary } from 'modules/Transactions/components/TransactionSummary/hooks';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useSignTransactionModal } from 'modules/Transactions/hooks/useSignTransactionModal';
import { getDryRunTransactionError } from '../../../Transactions/utils/helpers';

import getSendTokenSummaryStepStyles from './styles';

export default function SendTokenSummaryStep({ form, prevStep, transaction }) {
  const navigation = useNavigation();

  const senderApplicationChainID = form.watch('senderApplicationChainID');
  const recipientApplicationChainID = form.watch('recipientApplicationChainID');
  const recipientAccountAddress = form.watch('recipientAccountAddress');
  const tokenID = form.watch('tokenID');
  const amount = parseFloat(form.watch('amount'));
  const message = form.watch('message');
  const priority = form.watch('priority');

  const summary = useTransactionSummary({
    senderApplicationChainID,
    recipientApplicationChainID,
    recipientAccountAddress,
    tokenID,
    amount,
    message,
    priority,
    fee: transaction.data.transaction.fee,
    messageFee: transaction.data.transaction.params.messageFee,
  });

  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
  });

  const dryRunTransactionError =
    form.dryRunTransactionMutation.error ||
    (form.dryRunTransactionMutation.data?.data &&
      getDryRunTransactionError(form.dryRunTransactionMutation.data.data));

  const signTransaction = useSignTransactionModal({
    form,
    isValidationError: Object.keys(form.formState.errors).length > 0,
    amount: summary.amount,
    token: summary.token,
    dryRunError: dryRunTransactionError,
    navigation,
  });

  return (
    <>
      <View style={[styles.container, styles.theme.container]}>
        <TransactionSummary {...summary} />
      </View>

      <View style={[styles.footer]}>
        <Button
          style={{ marginRight: 16, flex: 1 }}
          onClick={prevStep}
          title={i18next.t('sendToken.summary.prevStepButtonText')}
        />

        <PrimaryButton
          noTheme
          onClick={signTransaction.open}
          title={i18next.t('sendToken.summary.submitTransactionButtonText')}
          style={{ flex: 1 }}
        />
      </View>
    </>
  );
}
