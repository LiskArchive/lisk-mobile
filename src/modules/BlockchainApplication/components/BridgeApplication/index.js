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
    'wc:3a8c0404ffbc210e0e96ed798d423adde96ea53df4eb94bb40543224db771d57@2?relay-protocol=iridium&symKey=93b5b7f2a878ae3071c9b12c218ba01e1c71c4781f275ef213b6faa631271177'
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
