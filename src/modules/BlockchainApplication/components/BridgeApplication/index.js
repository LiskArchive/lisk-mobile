/* eslint-disable max-statements */
import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import { useTimeoutMonitor } from 'hooks/useTimeoutMonitor';
import { usePairings } from '../../../../../libs/wcm/hooks/usePairings';
import { STATUS } from '../../../../../libs/wcm/constants/lifeCycle';
import {
  validateConnectionNameSpace,
  validateConnectionURI,
} from '../../../../../libs/wcm/utils/eventValidators';
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

  const handleConnectionTimeout = () => {
    setIsLoading(false);
    setError(new Error(i18next.t('application.bridgeExternalApplication.errors.timeout')));
    setIsSuccess(undefined);
  };

  const connectionTimeoutMonitor = useTimeoutMonitor(5000, handleConnectionTimeout);

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

    const isUriValid = validateConnectionURI(uri ? uri : inputUri);

    if (!isUriValid) {
      setError(
        new Error(i18next.t('application.bridgeExternalApplication.errors.invalidUriFormat'))
      );
      return;
    }

    connectionTimeoutMonitor.initialize();

    setIsLoading(true);

    const response = await setUri(uri ? uri : inputUri);

    if (response.status === STATUS.FAILURE) {
      setError(new Error(i18next.t('application.bridgeExternalApplication.errors.invalidUri')));
      setIsLoading(false);
    } else if (response.status === STATUS.SUCCESS) {
      connectionTimeoutMonitor.destroy();
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
            new Error(i18next.t('application.bridgeExternalApplication.errors.unsupportedApp'))
          );
          setIsLoading(false);
        }
      } catch {
        setError(
          new Error(i18next.t('application.bridgeExternalApplication.errors.nameSpaceInvalid'))
        );
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
        {i18next.t('application.bridgeExternalApplication.title')}
      </H2>

      <P style={[styles.description, styles.theme.description]}>
        {i18next.t('application.bridgeExternalApplication.description')}
      </P>

      <View style={styles.inputContainer}>
        <Input
          placeholder={i18next.t('application.bridgeExternalApplication.inputPlaceholder')}
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
