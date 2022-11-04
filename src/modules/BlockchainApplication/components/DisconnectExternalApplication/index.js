import React, { useState } from 'react';
import { View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { P, H3, B } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getDisconnectExternalBlockchainApplicationStyles from './styles';
import usePairings from '../../../../../libs/wcm/hooks/usePairings';

export default function DisconnectExternalBlockchainApplication({
  application,
  onSuccess,
  onError,
  onCancel,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { disconnect } = usePairings();

  const { styles } = useTheme({ styles: getDisconnectExternalBlockchainApplicationStyles() });

  async function handleDisconnectClick() {
    setIsLoading(true);

    try {
      await disconnect(application.topic);
      setIsLoading(false);
      onSuccess();
    } catch (e) {
      setError(e);
      setIsLoading(false);
      onError(error);
    }
  }

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.header]}>
        <H3 style={[styles.title, styles.theme.title]}>Disconnect application?</H3>
      </View>

      <View style={[styles.body]}>
        <P style={[styles.text, styles.theme.text]}>
          Disconnecting the <B>“{application.peerMetadata.name}”</B> application removes your wallet
          details from the site.
        </P>
      </View>

      <PrimaryButton
        style={{ marginBottom: 16 }}
        onClick={handleDisconnectClick}
        disabled={isLoading}
      >
        {!isLoading ? 'Disconnect' : 'Loading...'}
      </PrimaryButton>

      <Button style={{ marginBottom: 16 }} onClick={onCancel}>
        Cancel
      </Button>
    </View>
  );
}
