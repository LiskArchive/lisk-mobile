import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import usePairings from '../../../../../libs/wcm/hooks/usePairings';

import getStyles from './styles';

const BridgeApplication = ({ nextStep }) => {
  const { setUri } = usePairings();

  const [inputUri, setInputUri] = useState(
    'wc:64eb3d2363749853abbe7a931e05efb0b58768e5ae5ad7c6e0d7a525be219a5f@2?relay-protocol=iridium&symKey=b24435b0cbbd2d351b26f879f2b26a0143f69e3cfbf47dec2f526b27e07a0fd1'
  );

  const { styles } = useTheme({ styles: getStyles });

  const onSubmit = () => {
    setUri(inputUri);
    nextStep();
  };

  return (
    <View style={styles.container}>
      <H2 style={[styles.title]}>
        {i18next.t('application.explore.externalApplicationList.bridgeApplication')}
      </H2>
      <P style={[styles.description]}>
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
      </View>
      <PrimaryButton
        title={i18next.t('application.explore.externalApplicationList.addApplication')}
        disabled={!inputUri}
        onPress={onSubmit}
      />
    </View>
  );
};

export default BridgeApplication;
