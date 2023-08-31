/* eslint-disable max-statements */
import React from 'react';
import { Linking, View } from 'react-native';
import i18next from 'i18next';

import { useCopyToClipboard } from 'hooks/useCopyToClipboard';
import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import SignTransaction from 'modules/Transactions/components/SignTransaction/SignTransaction';

import getStyles from './styles';

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
  const { styles } = useTheme({ styles: getStyles });

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
    <View style={styles.container}>
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
        errorSecondaryButton={
          <Button onPress={onClose} style={styles.buttonMarginVertical}>
            {i18next.t('commons.buttons.close')}
          </Button>
        }
        successTitle="Transaction signing successful"
        successDescription="Your transaction has been signed, click the button below to copy your signed transaction, once copied you will be redirected to application."
        errorActionButton={
          <PrimaryButton onPress={handleErrorSubmit} style={styles.buttonMarginVertical}>
            {i18next.t('application.externalApplicationSignatureRequest.sign.errorButtonText')}
          </PrimaryButton>
        }
        successSecondaryButton={
          <Button onPress={onClose} style={styles.buttonMarginVertical}>
            {i18next.t('commons.buttons.close')}
          </Button>
        }
        errorTitle="Transaction signing failed"
        errorDescription="Error encountered while signing your transaction."
        navigation={navigation}
      />
    </View>
  );
}
