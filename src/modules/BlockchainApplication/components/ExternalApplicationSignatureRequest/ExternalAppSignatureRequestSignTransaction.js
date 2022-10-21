/* eslint-disable max-statements */
import React from 'react';

import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { usePasswordForm } from 'modules/Auth/hooks/usePasswordForm';
import { SignTransaction } from 'modules/Transactions/components/SignTransaction';

export default function ExternalAppSignatureRequestSignTransaction({
  transaction,
  recipientApplicationChainID,
  onSubmit,
  isLoading,
  isSuccess,
  error,
}) {
  const [passwordForm, passwordController] = usePasswordForm();

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
      onSuccess={() => console.log('broadcast signature...')}
      onError={() => console.log('on error...')}
      password={passwordController.field.value}
      onPasswordChange={passwordController.field.onChange}
      isValidationError={Object.keys(passwordForm.formState.errors).length > 0}
      amount={transaction.params.amount}
      token={token}
      isSuccess={isSuccess}
      isLoading={isLoading}
      error={error}
      onReset={() => console.log('on reset...')}
    />
  );
}
