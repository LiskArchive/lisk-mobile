import React, { useState } from 'react';
import { View } from 'react-native';
import { H2, P } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import i18next from 'i18next';
import getStyles from './styles';
import usePairings from '../../../../../libs/wcm/hooks/usePairings';

const BridgeApplication = ({ nextStep }) => {
  const { setUri } = usePairings();

  const { styles } = useTheme({ styles: getStyles });
  const [inputUri, setInputUri] = useState(
    'wc:14d776de76a15c3da00e336f07feebb5d1a8a00bc62b3d67d9eeb387b0010578@2?relay-protocol=iridium&symKey=d94b65bd743e2729cd62a6e5196bdaf24a67c8c92b9876ca6ab7dd99fc00ab21'
  );

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
