import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Stepper from 'components/shared/Stepper';

import { useNavigation } from '@react-navigation/native';
import { getSendTokenStyles } from './styles';
import SendTokenApplicationsStep from './components/SelectApplicationsStep';
import SendTokenSelectTokenStep from './components/SelectTokenStep';
import SendTokenSummaryStep from './components/SummaryStep';
import useSendTokenForm from './hooks/useSendTokenForm';
import SendTokenOnMultisignatureAccount from './components/SendTokenOnMultisignatureAccount';

export default function SendToken({ route }) {
  const navigation = useNavigation();

  const account = useSelector(state => state.account);

  const { styles } = useTheme({
    styles: getSendTokenStyles(),
  });

  const form = useSendTokenForm();

  const steps = [
    {
      component: SendTokenApplicationsStep,
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

  const accountIsMultisignature = account.summary.isMultisignature;

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title="Send token"
        onPress={navigation.goBack}
        containerStyle={{ marginBottom: 24 }}
      />

      {accountIsMultisignature ? (
        <SendTokenOnMultisignatureAccount />
      ) : (
      <Stepper>
        {steps.map(step => (
          <step.component
            key={step.title}
            navigation={navigation}
            route={route}
            form={form}
          />
        ))}
      </Stepper>
      )}

    </SafeAreaView>
  );
}
