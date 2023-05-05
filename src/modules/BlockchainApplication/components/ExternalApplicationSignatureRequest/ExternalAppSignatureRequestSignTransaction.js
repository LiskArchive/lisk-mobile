/* eslint-disable max-statements */
import React from 'react';
import { Linking } from 'react-native';
import i18next from 'i18next';

import { useCopyToClipboard } from 'components/shared/copyToClipboard/hooks';
import { PrimaryButton } from 'components/shared/toolBox/button';
import SignTransaction from 'modules/Transactions/components/SignTransaction/SignTransaction';

export default function ExternalAppSignatureRequestSignTransaction({
  session,
  transaction,
  onSubmit,
  userPassword,
  onUserPasswordChange,
  isValidationError,
  onClose,
  isSuccess,
  isLoading,
  error,
  navigation,
}) {
  const signedTransactionString = JSON.stringify(transaction.toJSON());

  const [isSignedTransactionCopiedToClipboard, handleCopySignedTransactionToClipboard] =
    useCopyToClipboard(signedTransactionString);

  const handleSuccessSubmit = () => {
    handleCopySignedTransactionToClipboard();
    onClose();
    Linking.openURL(session.peer.metadata.url);
  };

  const handleErrorSubmit = () => Linking.openURL(session.peer.metadata.url);

  return (
    <SignTransaction
      onSubmit={onSubmit}
      userPassword={userPassword}
      onUserPasswordChange={onUserPasswordChange}
      isSuccess={isSuccess}
      isLoading={isLoading}
      isValidationError={isValidationError}
      error={error}
      submitButtonTitle={i18next.t(
        'application.externalApplicationSignatureRequest.sign.submitButtonTitle'
      )}
      successActionButton={
        <PrimaryButton onClick={handleSuccessSubmit}>
          {!isSignedTransactionCopiedToClipboard
            ? i18next.t(
                'application.externalApplicationSignatureRequest.sign.copyToClipboardButtonText'
              )
            : i18next.t(
                'application.externalApplicationSignatureRequest.sign.copiedToClipboardButtonText'
              )}
        </PrimaryButton>
      }
      successTitle="Transaction signing successful"
      successDescription="Your transaction has been signed, click the button below to copy your signed transaction, once copied you will be redirected to application."
      errorActionButton={
        <PrimaryButton onClick={handleErrorSubmit}>
          {i18next.t('application.externalApplicationSignatureRequest.sign.errorButtonText')}
        </PrimaryButton>
      }
      errorTitle="Transaction signing failed"
      errorDescription="Error encountered while signing your transaction."
      navigation={navigation}
    />
  );
}
