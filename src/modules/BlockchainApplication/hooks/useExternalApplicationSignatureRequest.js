import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useModal } from 'hooks/useModal';
import ExternalApplicationSignatureRequest from 'modules/BlockchainApplication/components/ExternalApplicationSignatureRequest';
import useWalletConnectSession from '../../../../libs/wcm/hooks/useSession';
import WalletConnectContext from '../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../libs/wcm/constants/lifeCycle';
import ExternalAppSignatureRequestValidator from '../components/ExternalApplicationSignatureRequest/ExternalAppSignatureRequestValidator';
import { validateConnectionSchema } from '../../../../libs/wcm/utils/eventValidators';

export function useExternalApplicationSignatureRequest() {
  const { session, reject } = useWalletConnectSession();
  const { events } = useContext(WalletConnectContext);
  const navigation = useNavigation();
  const modal = useModal();

  const event = events.find((e) => e.name === EVENTS.SESSION_REQUEST);

  useEffect(() => {
    const handleRejectRequest = () => {
      reject();
      modal.close();
    };

    const handleClose = () => modal.close();

    if (session.request && event?.meta.id) {
      const isEventSchemaValid = validateConnectionSchema(event);

      modal.open(
        <ExternalAppSignatureRequestValidator
          session={session}
          recipientApplicationChainID={event.meta.params.request.params.recipientChainID}
          onSubmit={handleRejectRequest}
          isEventValidSchema={isEventSchemaValid}
        >
          <ExternalApplicationSignatureRequest
            session={session.request}
            onClose={handleClose}
            onCancel={handleRejectRequest}
            navigation={navigation}
          />
        </ExternalAppSignatureRequestValidator>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.request, event?.meta.id, event?.meta?.params?.request?.params.recipientChainID]);
}
