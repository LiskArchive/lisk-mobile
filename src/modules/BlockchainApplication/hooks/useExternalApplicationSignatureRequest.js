import React, { useContext, useEffect } from 'react';

import { useModal } from 'hooks/useModal';
import ExternalApplicationSignatureRequest from 'modules/BlockchainApplication/components/ExternalApplicationSignatureRequest';
import WalletConnectContext from '../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../libs/wcm/constants/lifeCycle';

export function useExternalApplicationSignatureRequest() {
  const { events } = useContext(WalletConnectContext);

  const modal = useModal();

  const event = events.length && events[events.length - 1];

  useEffect(() => {
    if (event.name === EVENTS.SESSION_REQUEST) {
      modal.open(<ExternalApplicationSignatureRequest onCancel={modal.close} />, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.meta?.id]);
}
