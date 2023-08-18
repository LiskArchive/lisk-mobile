import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useModal } from 'hooks/useModal';
import ExternalApplicationSignatureRequest from 'modules/BlockchainApplication/components/ExternalApplicationSignatureRequest';
import WalletConnectContext from '../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../libs/wcm/constants/lifeCycle';
import { useSession } from '../../../../libs/wcm/hooks/useSession';

export function useExternalApplicationSignatureRequest() {
  const { events } = useContext(WalletConnectContext);
  const { reject } = useSession();
  const navigation = useNavigation();
  const modal = useModal();

  useEffect(() => {
    const event = events.length && events[events.length - 1];

    const handleRejectRequest = async () => {
      await reject();
      modal.close();
    };

    if (event.name === EVENTS.SESSION_REQUEST) {
      modal.open(
        <ExternalApplicationSignatureRequest
          navigation={navigation}
          onClose={handleRejectRequest}
          onCancel={handleRejectRequest}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);
}
