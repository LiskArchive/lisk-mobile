/* eslint-disable max-statements */
import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import { usePairings } from '../../../../../libs/wcm/hooks/usePairings';
import { STATUS } from '../../../../../libs/wcm/constants/lifeCycle';
import { validateConnectionNameSpace } from '../../../../../libs/wcm/utils/eventValidators';
import ConnectionContext from '../../../../../libs/wcm/context/connectionContext';

import getStyles from './styles';

export default function BridgeApplication({ nextStep, uri = '' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [error, setError] = useState();
  const [inputUri, setInputUri] = useState(uri);
  const [eventTopic, setEventTopic] = useState('');

  const { events } = useContext(ConnectionContext);
  const { setUri } = usePairings();

  const { styles } = useTheme({ styles: getStyles });

  const proposalEvent = events.find((event) => event?.meta?.params?.pairingTopic === eventTopic);

  const handleStateCleanup = () => {
    if (eventTopic) {
      setEventTopic('');
    }

    if (error) {
      setError(undefined);
    }

    if (isSuccess) {
      setIsSuccess(undefined);
    }
  };

  const handleInputChange = (value) => {
    handleStateCleanup();

    setInputUri(value);
  };

  const handleSubmit = async () => {
    handleStateCleanup();

    setIsLoading(true);

    const response = await setUri(uri ? uri : inputUri);

    if (response.status === STATUS.FAILURE) {
      setError(new Error('Error connecting application. Please try again.'));
      setIsLoading(false);
    } else if (response.status === STATUS.SUCCESS) {
      setEventTopic(response.data.topic);
    }
  };

  useEffect(() => {
    if (uri) {
      handleSubmit();
    }
  }, [uri]);

  useEffect(() => {
    if (proposalEvent && isLoading) {
      try {
        const isEventNameSpaceValid = validateConnectionNameSpace(proposalEvent);

        if (isEventNameSpaceValid) {
          setIsLoading(false);
          setIsSuccess(true);
        } else {
          setError(
            new Error(
              'You’re trying to connect to an unsupported external app. Please enter a supported WalletConnect URI.'
            )
          );
          setIsLoading(false);
        }
      } catch {
        setError(new Error('Error validating connection. Please try again.'));
        setIsLoading(false);
      }
    }
  }, [proposalEvent, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      nextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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

        {!!error && <P style={[styles.errorMessage, styles.theme.errorMessage]}>{error.message}</P>}
      </View>

      <PrimaryButton
        disabled={!inputUri || isLoading || !!error}
        onPress={handleSubmit}
        isLoading={isLoading}
      >
        {i18next.t('application.explore.externalApplicationList.addApplication')}
      </PrimaryButton>
    </View>
  );
}
