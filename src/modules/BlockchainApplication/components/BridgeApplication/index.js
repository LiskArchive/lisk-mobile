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
    'wc:c119132390b8030ab5ce603210898f710b12e166bf2d1bd6299f51e319b720b9@2?relay-protocol=iridium&symKey=3d59775dda022b3f5e2f7e4be0688dace4c16e978ae887b88bfb37eab4cfe358'
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
