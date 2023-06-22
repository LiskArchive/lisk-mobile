import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useModal } from 'hooks/useModal';
import { useTheme } from 'contexts/ThemeContext';
import { P, H3, B } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getDisconnectExternalBlockchainApplicationStyles from './styles';
import useWalletConnectPairings from '../../../../../libs/wcm/hooks/usePairings';

export default function DisconnectExternalApplication({
  application,
  onSuccess,
  onError,
  onCancel,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const modal = useModal();

  const { disconnect } = useWalletConnectPairings();

  const { styles } = useTheme({ styles: getDisconnectExternalBlockchainApplicationStyles() });

  async function handleDisconnectClick() {
    setIsLoading(true);

    try {
      await disconnect(application.topic);
      setIsLoading(false);
      onSuccess();
      modal.close();
    } catch (e) {
      setError(e);
      setIsLoading(false);
      onError(error);
    }
  }

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.header]}>
        <H3 style={[styles.title, styles.theme.title]}>
          {i18next.t('externalApplicationSignatureRequest.disconnect.title')}
        </H3>
      </View>

      <View style={[styles.body]}>
        <P style={[styles.text, styles.theme.text]}>
          {i18next.t('externalApplicationSignatureRequest.disconnect.disconnectingFirst')}{' '}
          <B>“{application.peerMetadata.name}”</B>{' '}
          {i18next.t('externalApplicationSignatureRequest.disconnect.disconnectingSecond')}
        </P>
      </View>

      <PrimaryButton
        style={{ marginBottom: 16 }}
        onClick={handleDisconnectClick}
        disabled={isLoading}
        isLoading
      >
        {i18next.t('externalApplicationSignatureRequest.disconnect.disconnect')}
      </PrimaryButton>

      <Button style={{ marginBottom: 16 }} onClick={onCancel}>
        {i18next.t('commons.buttons.cancel')}
      </Button>
    </View>
  );
}
