import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import useWalletConnectPairings from '../../../../../libs/wcm/hooks/usePairings';
import { STATUS } from '../../../../../libs/wcm/constants/lifeCycle';

import getStyles from './styles';

export default function BridgeApplication({ nextStep }) {
  const [status, setStatus] = useState({});

  const [inputUri, setInputUri] = useState(
    'wc:f49614cf14da79fd7c9ff458bdac3e7f4f1c271b09409b4372f5f35c10f62d8f@2?relay-protocol=iridium&symKey=bbee67f9fa610a6f0c8ddf78af12e360bd013d9f9870d370f8507abb187e8b91'
  );

  const { setUri } = useWalletConnectPairings();

  const { styles } = useTheme({ styles: getStyles });

  const handleSubmit = async () => {
    setStatus({ ...status, isLoading: true });

    const result = await setUri(inputUri);

    if (result.status === STATUS.FAILURE) {
      setStatus({ ...result, isError: true });
    } else if (result.status === STATUS.SUCCESS) {
      setStatus({ ...result, isSuccess: true });
    }
  };

  useEffect(() => {
    if (status.isSuccess) {
      nextStep();
    }
  }, [status, nextStep]);

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
          onChange={setInputUri}
          value={inputUri}
          returnKeyType="done"
        />

        {status.isError && (
          <P style={[styles.errorMessage, styles.theme.errorMessage]}>
            Error connecting application. Please try again.
          </P>
        )}
      </View>

      <PrimaryButton disabled={!inputUri || status.isLoading} onPress={handleSubmit}>
        {status.isLoading
          ? 'Loading...'
          : i18next.t('application.explore.externalApplicationList.addApplication')}
      </PrimaryButton>
    </View>
  );
}
