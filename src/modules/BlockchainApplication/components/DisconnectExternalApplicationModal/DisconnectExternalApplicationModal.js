import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { P, H3, B } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getDisconnectExternalBlockchainApplicationStyles from './DisconnectExternalApplicationModal.styles';
import { useSession } from '../../../../../libs/wcm/hooks/useSession';

export default function DisconnectExternalApplicationModal({
  application,
  onSuccess,
  onError,
  onCancel,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { disconnect } = useSession();

  const { styles } = useTheme({ styles: getDisconnectExternalBlockchainApplicationStyles() });

  const handleDisconnectPress = async () => {
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
  };

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.header]}>
        <H3 style={[styles.title, styles.theme.title]}>
          {i18next.t('application.externalApplicationSignatureRequest.disconnect.title')}
        </H3>
      </View>

      <View style={[styles.body]}>
        <P style={[styles.text, styles.theme.text]}>
          {i18next.t(
            'application.externalApplicationSignatureRequest.disconnect.disconnectingFirst'
          )}{' '}
          <B>“{application.peer.metadata.name}”</B>{' '}
          {i18next.t(
            'application.externalApplicationSignatureRequest.disconnect.disconnectingSecond'
          )}
        </P>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          onPress={handleDisconnectPress}
          disabled={isLoading}
          isLoading={isLoading}
          style={styles.primaryButton}
        >
          {i18next.t('application.externalApplicationSignatureRequest.disconnect.disconnect')}
        </PrimaryButton>

        <Button onPress={onCancel}>{i18next.t('commons.buttons.cancel')}</Button>
      </View>
    </View>
  );
}
