/* eslint-disable max-statements */
import React, { useContext, useMemo, useState } from 'react';
import i18next from 'i18next';

import { extractAddressFromPublicKey } from 'modules/Wallet/utils/account';
import DataRenderer from 'components/shared/DataRenderer';
import { useCreateTransaction } from 'modules/Transactions/hooks/useCreateTransaction';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import DropDownHolder from 'utilities/alert';
import ConnectionContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../../libs/wcm/constants/lifeCycle';
import useSession from '../../../../../libs/wcm/hooks/useSession';

import ExternalAppSignatureRequestSummary from './ExternalAppSignatureRequestSummary';
import ExternalAppSignatureRequestNotification from './ExternalAppSignatureRequestNotification';
import ExternalAppSignatureRequestSignTransaction from './ExternalAppSignatureRequestSignTransaction';

export default function ExternalApplicationSignatureRequest({ session, onCancel }) {
  const [activeStep, setActiveStep] = useState('notification');

  const [currentAccount] = useCurrentAccount();

  const {
    respond,
    isLoading: isRespondLoading,
    error: errorOnRespond,
    isSuccess: isRespondSuccess,
  } = useSession();

  const { events } = useContext(ConnectionContext);

  const event = events.find((e) => e.name === EVENTS.SESSION_REQUEST);

  const createTransactionOptions = useMemo(
    () => ({
      encodedTransaction: event.meta.params.request.params.payload,
    }),
    [event.meta.params.request.params.payload]
  );

  const transaction = useCreateTransaction(createTransactionOptions);

  const senderAccountAddress = extractAddressFromPublicKey(session.peer.publicKey);

  const handleSubmit = async (password) => {
    let privateKey;

    try {
      const decryptedAccount = await decryptAccount(currentAccount.encryptedPassphrase, password);

      privateKey = decryptedAccount.privateKey;
    } catch (error) {
      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.decryptPassphraseError'));
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

        respond({ payload: encodedTransaction });
      } catch (error) {
        DropDownHolder.error(
          i18next.t('Error'),
          i18next.t('application.externalApplicationSignatureRequest.errorOnSignTransactionText')
        );
      }
    }
  };

  function renderStep(_transaction) {
    switch (activeStep) {
      case 'notification':
        return (
          <ExternalAppSignatureRequestNotification
            session={session}
            recipientApplicationChainID={event.meta.params.request.params.recipientChainID}
            senderAccountAddress={senderAccountAddress}
            onCancel={onCancel}
            onSubmit={() => setActiveStep('summary')}
          />
        );

      case 'summary':
        return (
          <ExternalAppSignatureRequestSummary
            session={session}
            transaction={_transaction}
            recipientApplicationChainID={event.meta.params.request.params.recipientChainID}
            onCancel={() => setActiveStep('notification')}
            onSubmit={() => setActiveStep('sign')}
          />
        );

      case 'sign':
        return (
          <ExternalAppSignatureRequestSignTransaction
            session={session}
            transaction={_transaction}
            recipientApplicationChainID={event.meta.params.request.params.recipientChainID}
            onSubmit={handleSubmit}
            isLoading={isRespondLoading}
            isSuccess={isRespondSuccess}
            error={errorOnRespond}
          />
        );

      default:
        return null;
    }
  }

  return (
    <DataRenderer
      data={transaction.data?.transaction}
      isLoading={transaction.isLoading}
      error={transaction.isError}
      renderData={(data) => renderStep(data)}
    />
  );
}
