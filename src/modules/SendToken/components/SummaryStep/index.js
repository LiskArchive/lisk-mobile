/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useController } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useModal } from 'hooks/useModal';
import { useTheme } from 'contexts/ThemeContext';
import { useTransactionSummary } from 'modules/Transactions/components/TransactionSummary/hooks';
import { selectBookmarkList } from 'modules/Bookmark/store/selectors';
import TransactionSummary from 'modules/Transactions/components/TransactionSummary';
import SignTransaction from 'modules/Transactions/components/SignTransaction/SignTransaction';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getSendTokenSummaryStepStyles from './styles';

export default function SendTokenSummaryStep({ form, prevStep, transaction, reset: resetSteps }) {
  const navigation = useNavigation();
  const bookmarks = useSelector(selectBookmarkList);

  const senderApplicationChainID = form.watch('senderApplicationChainID');
  const recipientApplicationChainID = form.watch('recipientApplicationChainID');
  const recipientAccountAddress = form.watch('recipientAccountAddress');
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
    tokenID: transaction.data.feeTokenID,
    amount,
    message,
    priority,
    fee: transaction.data.transaction.fee,
    messageFee: transaction.data.transaction.params.messageFee,
  });

  const { styles } = useTheme({ styles: getSendTokenSummaryStepStyles() });

  const handleSignTransactionModalReset = (modal) => {
    form.handleReset();
    resetSteps();
    modal.close();
  };

  const handleAddAddressToBookmarkPress = () =>
    navigation.navigate({ name: 'AddBookmark', params: { address: recipientAccountAddress } });

  const isRecipientAccountBookmarked = !!bookmarks.find(
    (bookmark) => bookmark.address === recipientAccountAddress
  );

  const signTransactionModal = useModal(
    (modal) => (
      <SignTransaction
        onSubmit={form.handleSubmit}
        onUserPasswordChange={userPasswordField.onChange}
        onReset={() => handleSignTransactionModalReset(modal)}
        isSuccess={form.isSuccess}
        isLoading={form.isLoading}
        isValidationError={Object.keys(form.formState.errors).length > 0}
        error={form.error}
        navigation={navigation}
        successSecondaryButton={
          !isRecipientAccountBookmarked && (
            <Button onPress={handleAddAddressToBookmarkPress} style={styles.buttonMarginVertical}>
              {i18next.t('sendToken.summary.addAddressToBookmarkButtonText')}
            </Button>
          )
        }
      />
    ),
    [summary.amount, summary.token, form.isSuccess, form.isLoading, form.isError]
  );

  return (
    <>
      <View style={[styles.container, styles.theme.container]} testID="transaction-summary-screen">
        <TransactionSummary {...summary} />
      </View>

      <View style={[styles.footer]}>
        <Button onPress={prevStep} style={{ marginRight: 16, flex: 1 }}>
          {i18next.t('sendToken.summary.prevStepButtonText')}
        </Button>

        <PrimaryButton
          onPress={() => signTransactionModal.open()}
          noTheme
          style={{ flex: 1 }}
          testID="send-transaction-button"
        >
          {i18next.t('sendToken.summary.submitTransactionButtonText')}
        </PrimaryButton>
      </View>
    </>
  );
}
