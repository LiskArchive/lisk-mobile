/* eslint-disable max-statements */
import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import useWalletConnectPairings from '../../../../../libs/wcm/hooks/usePairings';
import { STATUS } from '../../../../../libs/wcm/constants/lifeCycle';
import { validateConnectionNameSpace } from '../../../../../libs/wcm/utils/eventValidators';
import ConnectionContext from '../../../../../libs/wcm/context/connectionContext';

import getStyles from './styles';

export default function BridgeApplication({ nextStep }) {
  const [eventTopic, setEventTopic] = useState('');

  const [status, setStatus] = useState({ isLoading: false });

  const [inputUri, setInputUri] = useState('');

  const { events } = useContext(ConnectionContext);
  const { setUri } = useWalletConnectPairings();

  const { styles } = useTheme({ styles: getStyles });

  const proposalEvent = events.find((event) => event?.meta.params.pairingTopic === eventTopic);

  const handleInputChange = (value) => {
    setStatus({ isLoading: false });
    setEventTopic('');

    setInputUri(value);
  };

  const handleSubmit = async () => {
    setStatus({ isLoading: true });

    const response = await setUri(inputUri);

    if (response.status === STATUS.FAILURE) {
      return setStatus({
        ...response,
        isLoading: false,
        isError: true,
        errorMessage: 'Error connecting application. Please try again.',
      });
    }

    if (response.status === STATUS.SUCCESS) {
      setEventTopic(response.data.topic);
    }
  };

  useEffect(() => {
    if (proposalEvent && status.isLoading) {
      const isEventNameSpaceValid = validateConnectionNameSpace(proposalEvent);

      if (isEventNameSpaceValid) {
        setStatus({ isLoading: false, isSuccess: true });
      } else {
        setStatus({
          isLoading: false,
          isError: true,
          errorMessage:
            'You’re trying to connect to an unsupported external app. Please enter a supported WalletConnect URI.',
        });
      }
    }
  }, [status.isLoading, proposalEvent]);

  useEffect(() => {
    if (status.isSuccess) {
      nextStep();
    }
  }, [status.isSuccess, nextStep]);

  return (
    <View style={styles.container}>
      <H2 style={[styles.title, styles.theme.title]}>
        {i18next.t('application.explore.externalApplicationList.bridgeApplication')}
      </H2>

      <P style={[styles.description, styles.theme.description]}>
        {i18next.t('application.explore.externalApplicationList.bridgeApplicationDescription')}
      </P>

      <View style={styles.inputContainer}>
        <Input
          placeholder={i18next.t('application.explore.externalApplicationList.enterConnectionUri')}
          autoCorrect={false}
          autoFocus
          onChange={handleInputChange}
          value={inputUri}
          returnKeyType="done"
        />

        {status.isError && (
          <P style={[styles.errorMessage, styles.theme.errorMessage]}>{status.errorMessage}</P>
        )}
      </View>

      <PrimaryButton
        disabled={!inputUri || status.isLoading || status.isError}
        onPress={handleSubmit}
        isLoading={status.isLoading}
      >
        {i18next.t('application.explore.externalApplicationList.addApplication')}
      </PrimaryButton>
    </View>
  );
}
