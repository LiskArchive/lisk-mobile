import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import useWalletConnectPairings from '../../../../../libs/wcm/hooks/usePairings';
import { STATUS } from '../../../../../libs/wcm/constants/lifeCycle';

import getStyles from './styles';

export default function BridgeApplicationByQr({ nextStep, uri }) {
  const [status, setStatus] = useState({ isLoading: false });

  const { setUri } = useWalletConnectPairings();

  const { styles } = useTheme({ styles: getStyles });

  const handleSubmit = async () => {
    setStatus({ ...status, isLoading: true });

    const response = await setUri(uri);

    if (response.status === STATUS.FAILURE) {
      setStatus({ ...response, isError: true });
    } else if (response.status === STATUS.SUCCESS) {
      setStatus({ ...response, isSuccess: true });
    }
  };

  useEffect(() => {
    if (uri) {
      handleSubmit();
    }
  }, [uri]);

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

      <View style={styles.inputContainer}>
        {status.isError && (
          <P style={[styles.errorMessage, styles.theme.errorMessage]}>
            Error connecting application. Please try again.
          </P>
        )}
      </View>

      <PrimaryButton disabled={!uri || status.isLoading} onPress={handleSubmit}>
        {status.isLoading
          ? 'Loading...'
          : i18next.t('application.explore.externalApplicationList.addApplication')}
      </PrimaryButton>
    </View>
  );
}
