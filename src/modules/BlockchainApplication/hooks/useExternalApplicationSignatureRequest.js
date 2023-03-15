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
    const rejectRequest = () => {
      reject();
      modal.close();
    };

    if (session.request) {
      modal.open(
        <ExternalApplicationSignatureRequest
          session={session.request}
          onCancel={rejectRequest}
          navigation={navigation}
        />,
        false
      );
    }
  }, [session.request]);
}
