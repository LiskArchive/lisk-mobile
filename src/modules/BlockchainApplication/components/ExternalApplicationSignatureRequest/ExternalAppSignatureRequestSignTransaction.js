/* eslint-disable max-statements */
import React, { useMemo } from 'react';
import { Linking } from 'react-native';
import i18next from 'i18next';

import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { usePasswordForm } from 'modules/Auth/hooks/usePasswordForm';
import { SignTransaction } from 'modules/Transactions/components/SignTransaction';
import { useCopyToClipboard } from 'components/shared/copyToClipboard/hooks';
import { PrimaryButton } from 'components/shared/toolBox/button';

export default function ExternalAppSignatureRequestSignTransaction({
  session,
  transaction,
  recipientApplicationChainID,
  onSubmit,
  isLoading,
  isSuccess,
  error,
}) {
  const [passwordForm, passwordController] = usePasswordForm();

  const signedTransactionString = useMemo(
    () => JSON.stringify(transaction.toJSON()),
    [transaction]
  );

  const [isSignedTransactionCopiedToClipboard, handleCopySignedTransactionToClipboard] =
    useCopyToClipboard(signedTransactionString);

  const { applicationsMetadata } = useBlockchainApplicationExplorer();

  const recipientApplication = applicationsMetadata.data?.find(
    (application) => application.chainID === recipientApplicationChainID
  );

  const { data: supportedTokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const token = supportedTokensData?.find(
    (_token) => _token.tokenID === transaction.params.tokenID
  );

  return (
    <SignTransaction
      onSubmit={() => onSubmit(passwordController.field.value)}
      password={passwordController.field.value}
      onPasswordChange={passwordController.field.onChange}
      isValidationError={Object.keys(passwordForm.formState.errors).length > 0}
      amount={transaction.params.amount}
      token={token}
      isSuccess={isSuccess}
      isLoading={isLoading}
      error={error}
      successActionButton={
        <PrimaryButton onClick={handleCopySignedTransactionToClipboard}>
          {!isSignedTransactionCopiedToClipboard
            ? i18next.t(
                'application.externalApplicationSignatureRequest.sign.copyToClipboardButtonText'
              )
            : i18next.t(
                'application.externalApplicationSignatureRequest.sign.copiedToClipboardButtonText'
              )}
        </PrimaryButton>
      }
      errorActionButton={
        <PrimaryButton onClick={() => Linking.openURL(session.peer.metadata.url)}>
          {i18next.t('application.externalApplicationSignatureRequest.sign.errorButtonText')}
        </PrimaryButton>
      }
    />
  );
}
