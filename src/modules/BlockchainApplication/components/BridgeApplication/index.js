import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import useWalletConnectPairings from '../../../../../libs/wcm/hooks/usePairings';
import { STATUS } from '../../../../../libs/wcm/constants/lifeCycle';

import getStyles from './styles';

export default function BridgeApplication({ nextStep }) {
  const [status, setStatus] = useState({ isLoading: false });

  const [inputUri, setInputUri] = useState('');

  const { setUri } = useWalletConnectPairings();

  const { styles } = useTheme({ styles: getStyles });

  const handleSubmit = async () => {
    setStatus({ ...status, isLoading: true });

    const response = await setUri(inputUri);

    if (response.status === STATUS.FAILURE) {
      setStatus({ ...response, isError: true });
    } else if (response.status === STATUS.SUCCESS) {
      setStatus({ ...response, isSuccess: true });
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
