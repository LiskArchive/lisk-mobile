import React from 'react';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Stepper from 'components/shared/Stepper';
import ProgressBar from 'components/shared/ProgressBar';

import { SafeAreaView } from 'react-native-safe-area-context';
import { getSendTokenStyles } from './styles';
import SendTokenApplicationsSelect from './components/SendTokenApplicationsSelect';

export default function SendToken({ navigation, route }) {
  const { styles } = useTheme({
    styles: getSendTokenStyles(),
  });

  const steps = [
    {
      component: SendTokenApplicationsSelect,
      title: 'sendTokenApplicationsSelect'
    },
    {
      component: SendTokenApplicationsSelect,
      title: 'component2'
    },
    {
      component: SendTokenApplicationsSelect,
      title: 'component3'
    },
  ];

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title="Send Token"
        noIcon
      />

      <Stepper
        currentIndex={0}
        progressBar={ProgressBar}
        styles={{ progressBar: { wrapper: { marginBottom: 40 } } }}
       // navStyles={sendTokenNavStyles}
      >
        {steps.map(step => (
          <step.component
            key={step.title}
            navigation={navigation}
            route={route}
          />
        ))}
      </Stepper>

    </SafeAreaView>
  );
}
