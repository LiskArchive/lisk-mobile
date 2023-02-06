/* eslint-disable max-statements */
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Stepper from 'components/shared/Stepper';
import DataRenderer from 'components/shared/DataRenderer';
import ResultScreen from 'components/screens/ResultScreen';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import { P } from 'components/shared/toolBox/typography';
import { useCreateTransaction } from '../Transactions/hooks/useCreateTransaction';

import useSendTokenForm from './hooks/useSendTokenForm';
import SendTokenApplicationsStep from './components/SelectApplicationsStep';
import SendTokenSelectTokenStep from './components/SelectTokenStep';
import SendTokenSummaryStep from './components/SummaryStep';
import SendTokenOnMultisignatureAccount from './components/SendTokenOnMultisignatureAccount';
import { getSendTokenStyles } from './SendToken.styles';

/**
 * Renders form to transfer tokens transaction.
 */
export default function SendToken() {
  const route = useRoute();

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
    initialValues: route.params,
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

      <DataRenderer
        data={transaction}
        isLoading={transaction.isLoading}
        error={transaction.isError}
        renderData={(data) => (
          <>
            {accountIsMultisignature ? (
              <SendTokenOnMultisignatureAccount />
            ) : (
              <Stepper showProgressBar styles={{ progressBar: { wrapper: styles.progressBar } }}>
                {steps.map((step) => (
                  <step.component key={step.title} route={route} form={form} transaction={data} />
                ))}
              </Stepper>
            )}
          </>
        )}
        renderLoading={() => (
          <P style={[styles.loadingText, styles.theme.loadingText]}>Loading...</P>
        )}
        renderError={() => (
          <ResultScreen
            illustration={<ErrorIllustrationSvg />}
            description={'Error loading transaction data. Please try again.'}
          />
        )}
      />
    </SafeAreaView>
  );
}
