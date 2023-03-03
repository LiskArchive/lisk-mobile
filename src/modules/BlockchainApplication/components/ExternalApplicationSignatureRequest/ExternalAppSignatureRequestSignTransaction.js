/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import i18next from 'i18next';

import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { useApplicationsExplorer } from 'modules/BlockchainApplication/hooks/useApplicationsExplorer';
import { usePasswordForm } from 'modules/Auth/hooks/usePasswordForm';
import { useSignTransactionModal } from 'modules/Transactions/hooks/useSignTransactionModal';
import { useCopyToClipboard } from 'components/shared/copyToClipboard/hooks';
import { PrimaryButton } from 'components/shared/toolBox/button';

export default function ExternalAppSignatureRequestSignTransaction({
  session,
  transaction,
  recipientApplicationChainID,
  onSubmit,
}) {
  const [passwordForm, passwordController] = usePasswordForm();

  const signedTransactionString = JSON.stringify(transaction.toJSON());

  const [isSignedTransactionCopiedToClipboard, handleCopySignedTransactionToClipboard] =
    useCopyToClipboard(signedTransactionString);

  const applications = useApplicationsExplorer();

  const recipientApplication = applications.data?.find(
    (application) => application.chainID === recipientApplicationChainID
  );

  const { data: supportedTokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const token = supportedTokensData?.find(
    (_token) => _token.tokenID === transaction.transaction.params.tokenID
  );

  const handleSuccessSubmit = () => {
    handleCopySignedTransactionToClipboard();
    Linking.openURL(session.peer.metadata.url);
  };
  const handleErrorSubmit = () => Linking.openURL(session.peer.metadata.url);

  const signTransaction = useSignTransactionModal({
    onSubmit: onSubmit(passwordController.field.value),
    password: passwordController.field.value,
    onPasswordChange: passwordController.field.onChange,
    isValidationError: Object.keys(passwordForm.formState.errors).length > 0,
    amount: transaction.transaction.params.amount,
    token,
    successActionButton: (
      <PrimaryButton onClick={handleSuccessSubmit}>
        {!isSignedTransactionCopiedToClipboard
          ? i18next.t(
              'application.externalApplicationSignatureRequest.sign.copyToClipboardButtonText'
            )
          : i18next.t(
              'application.externalApplicationSignatureRequest.sign.copiedToClipboardButtonText'
            )}
      </PrimaryButton>
    ),
    successTitle: 'Transaction signing successful',
    successDescription:
      'Your transaction has been signed, click the button below to copy your signed transaction, once copied you will be redirected to application.',
    errorActionButton: (
      <PrimaryButton onClick={handleErrorSubmit}>
        {i18next.t('application.externalApplicationSignatureRequest.sign.errorButtonText')}
      </PrimaryButton>
    ),
    errorTitle: 'Transaction signing failed',
    errorDescription: 'Error encountered while signing your transaction.',
  });

  useEffect(() => {
    signTransaction.open();
  }, []);

  return null;
}
