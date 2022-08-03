import React, { useState } from 'react';
import { View } from 'react-native';

import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';

import getSendTokenApplicationsSelectStyles from './styles';
import Picker from '../../../../components/shared/Picker';

export default function SendTokenApplicationsSelect({
  nextStep,
//   navigation,
//   route,
}) {
  const { styles } = useTheme({
    styles: getSendTokenApplicationsSelectStyles(),
  });

  const [senderApplication, setSenderApplication] = useState(undefined);

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>

        <Picker
          value={senderApplication}
          onChange={(selectedApplication) => setSenderApplication(selectedApplication)}
        >
          <Picker.Label>
            From Application
          </Picker.Label>

          <Picker.Toggle placeholder="Select an Application"/>

          <Picker.Menu>
            <Picker.Item value="lisk" />
            <Picker.Item value="coleti" />
            <Picker.Item value="doedu" />
            <Picker.Item value="kalipo" />
          </Picker.Menu>
        </Picker>

      </View>

      <PrimaryButton
        noTheme={true}
        style={styles.button}
        onClick={() => nextStep()}
        title={'Continue'}
      />
    </View>
  );
}
