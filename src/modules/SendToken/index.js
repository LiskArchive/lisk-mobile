import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Stepper from 'components/shared/Stepper';
import ProgressBar from 'components/shared/ProgressBar';

import { getSendTokenStyles } from './styles';
import SendTokenSelectApplicationsStep from './components/SendTokenSelectApplicationsStep';
import SendTokenSelectTokenStep from './components/SendTokenSelectTokenStep';
import SendTokenSummaryStep from './components/SendTokenSummaryStep';
import { useSendTokenForm } from './hooks';

export default function SendToken({ navigation, route }) {
  const { styles } = useTheme({
    styles: getSendTokenStyles(),
  });

  const form = useSendTokenForm();

  const steps = [
    {
      component: SendTokenSelectApplicationsStep,
      title: 'selectApplications'
    },
    {
      component: SendTokenSelectTokenStep,
      title: 'selectToken'
    },
    {
      component: SendTokenSummaryStep,
      title: 'summary'
    },
  ];

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title="Send token"
        noIcon
      />

      <Stepper
        currentIndex={0}
        progressBar={ProgressBar}
        styles={{ progressBar: { wrapper: { marginBottom: 20, marginTop: 20 } } }}
      >
        {steps.map(step => (
          <step.component
            key={step.title}
            navigation={navigation}
            route={route}
            form={form}
          />
        ))}
      </Stepper>

    </SafeAreaView>
  );
}
