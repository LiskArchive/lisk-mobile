import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useModal } from 'hooks/useModal';
import ExternalApplicationSignatureRequest from 'modules/BlockchainApplication/components/ExternalApplicationSignatureRequest';
import useWalletConnectSession from '../../../../libs/wcm/hooks/useSession';

export function useExternalApplicationSignatureRequest() {
  const { session, reject } = useWalletConnectSession();

  const navigation = useNavigation();

  const modal = useModal();

  useEffect(() => {
    const handleRejectRequest = () => {
      reject();
      modal.close();
    };

    const handleClose = () => modal.close();

    if (session.request) {
      modal.open(
        <ExternalApplicationSignatureRequest
          session={session.request}
          onClose={handleClose}
          onCancel={handleRejectRequest}
          navigation={navigation}
        />,
        true
      );
    }
  }, [session.request]);
}
