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
    'wc:8c489cfa71675da3c97676b9ca5bac09fc887676df552f98607f0d0b0c0e9997@2?relay-protocol=iridium&symKey=c7f2e7638d31f94ffd2932724fd17be27341b1b9394a69f17d4484b0d0e5c24e'
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
