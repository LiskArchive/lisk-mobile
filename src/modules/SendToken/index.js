/* eslint-disable max-statements */
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Stepper from 'components/shared/Stepper';

import { getSendTokenStyles } from './styles';
import SendTokenApplicationsStep from './components/SelectApplicationsStep';
import SendTokenSelectTokenStep from './components/SelectTokenStep';
import SendTokenSummaryStep from './components/SummaryStep';
import useSendTokenForm from './hooks/useSendTokenForm';
import SendTokenOnMultisignatureAccount from './components/SendTokenOnMultisignatureAccount';
import { useCreateTransaction } from '../Transactions/hooks/useCreateTransaction';

export default function SendToken({ route }) {
  const navigation = useNavigation();

  const account = useSelector((state) => state.account);

  const createTransactionOptions = useMemo(
    () => ({
      module: 'token',
      command: 'transfer',
    }),
    []
  );

  const transaction = useCreateTransaction(createTransactionOptions);

  const form = useSendTokenForm({
    transaction: transaction.data,
    isTransactionSuccess: transaction.isSuccess,
  });

  const { styles } = useTheme({
    styles: getSendTokenStyles(),
  });

  const steps = [
    {
      component: SendTokenApplicationsStep,
      title: 'selectApplications',
    },
    {
      component: SendTokenSelectTokenStep,
      title: 'selectToken',
    },
    {
      component: SendTokenSummaryStep,
      title: 'summary',
    },
  ];

  const accountIsMultisignature = account.summary.isMultisignature;

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title="Send token"
        onPress={navigation.goBack}
        containerStyle={[styles.header]}
      />

      {accountIsMultisignature ? (
        <SendTokenOnMultisignatureAccount />
      ) : (
        <Stepper showProgressBar styles={{ progressBar: { wrapper: styles.progressBar } }}>
          {steps.map((step) => (
            <step.component
              key={step.title}
              navigation={navigation}
              route={route}
              form={form}
              transaction={transaction}
            />
          ))}
        </Stepper>
      )}
    </SafeAreaView>
  );
}
