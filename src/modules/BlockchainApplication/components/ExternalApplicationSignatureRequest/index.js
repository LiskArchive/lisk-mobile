/* eslint-disable max-statements */
import React, { useContext, useMemo, useState } from 'react';
import i18next from 'i18next';

import { extractAddressFromPublicKey } from 'modules/Auth/utils/accountKeys';
import DataRenderer from 'components/shared/DataRenderer';
import { useCreateTransaction } from 'modules/Transactions/hooks/useCreateTransaction';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import { usePasswordForm } from 'modules/Auth/hooks/usePasswordForm';
import DropDownHolder from 'utilities/alert';
import WalletConnectContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS, STATUS } from '../../../../../libs/wcm/constants/lifeCycle';
import useWalletConnectSession from '../../../../../libs/wcm/hooks/useSession';

import ExternalAppSignatureRequestSummary from './ExternalAppSignatureRequestSummary';
import ExternalAppSignatureRequestNotification from './ExternalAppSignatureRequestNotification';
import ExternalAppSignatureRequestSignTransaction from './ExternalAppSignatureRequestSignTransaction';
import ExternalAppSignatureRequestValidator from './ExternalAppSignatureRequestValidator';

export default function ExternalApplicationSignatureRequest({ session, onClose, onCancel }) {
  const [status, setStatus] = useState({});
  const [activeStep, setActiveStep] = useState('notification');

  const [passwordForm, passwordFormController] = usePasswordForm();
  const [currentAccount] = useCurrentAccount();
  const { respond, validate } = useWalletConnectSession();
  const { events } = useContext(WalletConnectContext);

  const event = useMemo(() => events.find((e) => e.name === EVENTS.SESSION_REQUEST), []);

  const createTransactionOptions = useMemo(
    () => ({
      encodedTransaction: event.meta.params.request.params.payload,
    }),
    [event.meta.params.request.params.payload]
  );

  const transaction = useCreateTransaction(createTransactionOptions);

  const senderAccountAddress = extractAddressFromPublicKey(session.peer.publicKey);

  const sessionValidation = validate();

  const handleRespond = async (payload) => {
    if (!sessionValidation.isValid) {
      return;
    }

    setStatus({ ...session, isLoading: true });

    const response = await respond({ payload });

    if (response.status === STATUS.FAILURE) {
      setStatus({ ...response, error: new Error(response.message) });
    } else if (response.status === STATUS.SUCCESS) {
      setStatus({ ...response, isSuccess: true });
    }
  };

  const handleSubmit = passwordForm.handleSubmit(async (values) => {
    if (!sessionValidation.isValid) {
      return;
    }

    let privateKey;

    try {
      const decryptedAccount = await decryptAccount(currentAccount.crypto, values.password);

      privateKey = decryptedAccount.privateKey;
    } catch (error) {
      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.decryptRecoveryPhraseError'));
    }

    if (privateKey) {
      try {
        const signedTransaction = await transaction.data.sign(privateKey);

        const encodedTransaction = transaction.data.encode(signedTransaction).toString('hex');

        if (!encodedTransaction)
          throw new Error(
            i18next.t(
              'application.externalApplicationSignatureRequest.noEncodedTransactionErrorText'
            )
          );

        handleRespond(encodedTransaction);
      } catch (error) {
        DropDownHolder.error(
          i18next.t('Error'),
          i18next.t('application.externalApplicationSignatureRequest.errorOnSignTransactionText')
        );
      }
    }
  });

  const renderStep = (_transaction) => {
    let children;

    switch (activeStep) {
      case 'notification':
        children = (
          <ExternalAppSignatureRequestNotification
            session={session}
            recipientApplicationChainID={event.meta.params.request.params.recipientChainID}
            senderAccountAddress={senderAccountAddress}
            onCancel={onCancel}
            onSubmit={() => setActiveStep('summary')}
          />
        );
        break;

      case 'summary':
        children = (
          <ExternalAppSignatureRequestSummary
            session={session}
            transaction={_transaction.transaction}
            recipientApplicationChainID={event.meta.params.request.params.recipientChainID}
            onCancel={() => setActiveStep('notification')}
            onSubmit={() => setActiveStep('sign')}
          />
        );
        break;

      case 'sign':
        children = (
          <ExternalAppSignatureRequestSignTransaction
            session={session}
            transaction={_transaction}
            onSubmit={handleSubmit}
            onClose={onClose}
            userPassword={passwordFormController.field.value}
            onUserPasswordChange={passwordFormController.field.onChange}
            isValidationError={Object.keys(passwordForm.formState.errors).length > 0}
            isSuccess={status.isSuccess}
            isLoading={status.isLoading}
            error={status.error}
          />
        );
        break;

      default:
        children = null;
    }

    return (
      <ExternalAppSignatureRequestValidator
        session={session}
        recipientApplicationChainID={event.meta.params.request.params.recipientChainID}
        onSubmit={onCancel}
        sessionValidation={sessionValidation}
      >
        {children}
      </ExternalAppSignatureRequestValidator>
    );
  };

  return (
    <DataRenderer
      data={transaction.data}
      isLoading={transaction.isLoading}
      error={transaction.error}
      renderData={renderStep}
    />
  );
}
