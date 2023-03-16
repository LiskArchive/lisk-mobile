/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useModal } from 'hooks/useModal';
import { useTheme } from 'contexts/ThemeContext';
import { useTransactionSummary } from 'modules/Transactions/components/TransactionSummary/hooks';
import TransactionSummary from 'modules/Transactions/components/TransactionSummary';
import SignTransaction from 'modules/Transactions/components/SignTransaction/SignTransaction';
import { getDryRunTransactionError } from 'modules/Transactions/utils/helpers';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getSendTokenSummaryStepStyles from './styles';

export default function SendTokenSummaryStep({ form, prevStep, transaction, reset: resetSteps }) {
  const navigation = useNavigation();

  const senderApplicationChainID = form.watch('senderApplicationChainID');
  const recipientApplicationChainID = form.watch('recipientApplicationChainID');
  const recipientAccountAddress = form.watch('recipientAccountAddress');
  const tokenID = form.watch('tokenID');
  const amount = parseFloat(form.watch('amount'));
  const message = form.watch('message');
  const priority = form.watch('priority');

  const { field: userPasswordField } = useController({
    name: 'userPassword',
    control: form.control,
  });

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

  const handleSignTransactionModalReset = (modal) => {
    form.handleReset();
    resetSteps();
    modal.close();
  };

  const signTransactionModal = useModal(
    (modal) => (
      <SignTransaction
        onSubmit={form.handleSubmit}
        userPassword={userPasswordField.value}
        onUserPasswordChange={userPasswordField.onChange}
        onReset={() => handleSignTransactionModalReset(modal)}
        amount={summary.amount}
        token={summary.token}
        isSuccess={form.broadcastTransactionMutation.isSuccess}
        isLoading={
          form.dryRunTransactionMutation.isLoading || form.broadcastTransactionMutation.isLoading
        }
        isValidationError={Object.keys(form.formState.errors).length > 0}
        error={dryRunTransactionError || form.broadcastTransactionMutation.error}
        navigation={navigation}
      />
    ),
    [
      userPasswordField.value,
      summary.amount,
      summary.token,
      form.broadcastTransactionMutation.isSuccess,
      form.dryRunTransactionMutation.isLoading,
      form.broadcastTransactionMutation.isLoading,
      dryRunTransactionError,
      form.broadcastTransactionMutation.error,
    ]
  );

  return (
    <>
      <View style={[styles.container, styles.theme.container]}>
        <TransactionSummary {...summary} />
      </View>

      <View style={[styles.footer]}>
        <Button onPress={prevStep} style={{ marginRight: 16, flex: 1 }}>
          {i18next.t('sendToken.summary.prevStepButtonText')}
        </Button>

        <PrimaryButton onPress={() => signTransactionModal.open()} noTheme style={{ flex: 1 }}>
          {i18next.t('sendToken.summary.submitTransactionButtonText')}
        </PrimaryButton>
      </View>
    </>
  );
}
