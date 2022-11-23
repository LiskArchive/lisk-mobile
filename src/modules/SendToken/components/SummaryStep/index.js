/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';
import { useController } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import TransactionSummary from 'modules/Transactions/components/TransactionSummary';
import { SignTransaction } from 'modules/Transactions/components/SignTransaction';
import { useTransactionSummary } from 'modules/Transactions/components/TransactionSummary/hooks';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import BottomModal from 'components/shared/BottomModal';

import getSendTokenSummaryStepStyles from './styles';

export default function SendTokenSummaryStep({ form, prevStep, reset, transaction }) {
  const [showSendTokenSummaryModal, setShowSendTokenSummaryModal] = useState(false);

  const { field } = useController({
    name: 'userPassword',
    control: form.control,
  });

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
  });

  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
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
          onClick={() => setShowSendTokenSummaryModal(true)}
          title={i18next.t('sendToken.summary.submitTransactionButtonText')}
          style={{ flex: 1 }}
        />
      </View>

      <BottomModal
        show={showSendTokenSummaryModal}
        toggleShow={() => setShowSendTokenSummaryModal(false)}
      >
        <SignTransaction
          onSubmit={form.handleSubmit}
          onSuccess={() => {
            form.handleReset();
            reset();
          }}
          onError={reset}
          password={field.value}
          onPasswordChange={field.onChange}
          isValidationError={Object.keys(form.formState.errors).length > 0}
          amount={summary.amount}
          token={summary.token}
          isSuccess={form.broadcastTransactionMutation.isSuccess}
          isLoading={form.broadcastTransactionMutation.isLoading}
          error={form.broadcastTransactionMutation.error}
          onReset={form.broadcastTransactionMutation.reset}
        />
      </BottomModal>
    </>
  );
}
