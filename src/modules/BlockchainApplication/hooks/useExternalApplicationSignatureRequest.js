import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useModal } from 'hooks/useModal';
import ExternalApplicationSignatureRequest from 'modules/BlockchainApplication/components/ExternalApplicationSignatureRequest';
import useWalletConnectSession from '../../../../libs/wcm/hooks/useSession';
import WalletConnectContext from '../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../libs/wcm/constants/lifeCycle';

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
      modal.open(
        <ExternalApplicationSignatureRequest
          session={session.request}
          onClose={handleClose}
          onCancel={handleRejectRequest}
          navigation={navigation}
        />
      );
    }
  }, [session.request, event?.meta.id]);
}
