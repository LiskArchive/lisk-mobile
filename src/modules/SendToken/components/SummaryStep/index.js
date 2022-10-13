/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import TransactionSummary from 'modules/Transactions/components/TransactionSummary';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getSendTokenSummaryStepStyles from './styles';
import { useSendTokenSummary } from './hooks';
import { SendTokenSummaryModal } from './components';

export default function SendTokenSummaryStep({ form, prevStep, reset, transaction }) {
  const [showSendTokenSummaryModal, setShowSendTokenSummaryModal] = useState(false);

  const senderApplicationChainID = form.watch('senderApplicationChainID');
  const recipientApplicationChainID = form.watch('recipientApplicationChainID');
  const recipientAccountAddress = form.watch('recipientAccountAddress');
  const tokenID = form.watch('tokenID');
  const amount = parseFloat(form.watch('amount'));
  const message = form.watch('message');
  const priority = form.watch('priority');

  const summary = useSendTokenSummary({ form, transaction });

  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
  });

  return (
    <>
      <View style={[styles.container, styles.theme.container]}>
        <TransactionSummary
          senderApplicationChainID={senderApplicationChainID}
          recipientApplicationChainID={recipientApplicationChainID}
          recipientAccountAddress={recipientAccountAddress}
          tokenID={tokenID}
          amount={amount}
          message={message}
          priority={priority}
          fee={transaction.data.transaction.fee}
        />

        <View style={[styles.buttonsContainer]}>
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
      </View>

      <SendTokenSummaryModal
        show={showSendTokenSummaryModal}
        setShow={setShowSendTokenSummaryModal}
        summary={summary}
        form={form}
        handleResetForm={() => {
          form.handleReset();
          reset();
        }}
        handleResetStepper={reset}
      />
    </>
  );
}
