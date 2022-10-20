/* eslint-disable max-statements */
import React, { useContext, useMemo, useState } from 'react';

import { extractAddressFromPublicKey } from 'modules/Wallet/utils/account';
import DataRenderer from 'components/shared/DataRenderer';
import ConnectionContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../../libs/wcm/constants/lifeCycle';

import { useCreateTransaction } from '../../../Transactions/hooks/useCreateTransaction';
import ExternalAppSignatureRequestSummary from './ExternalAppSignatureRequestSummary';
import ExternalAppSignatureRequestNotification from './ExternalAppSignatureRequestNotification';
import ExternalAppSignatureRequestSign from './ExternalAppSignatureRequestSign';

export default function ExternalApplicationSignatureRequest({ session, onCancel }) {
  const [activeStep, setActiveStep] = useState('notification');

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

  function renderStep(_transaction) {
    switch (activeStep) {
      case 'notification':
        return (
          <ExternalAppSignatureRequestNotification
            session={session}
            chainID={event.meta.params.chainId}
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
          <ExternalAppSignatureRequestSign
            onCancel={() => setActiveStep('summary')}
            onSubmit={() => console.log('trigger signature')}
          />
        );

      default:
        return null;
    }
  }

  if (!session) return null;

  return (
    <DataRenderer
      data={transaction.data?.transaction}
      isLoading={transaction.isLoading}
      error={transaction.isError}
      renderData={(data) => renderStep(data)}
    />
  );
}
