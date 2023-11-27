/* eslint-disable max-statements */
import React, { useEffect, useMemo } from 'react';
import i18next from 'i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import Stepper from 'components/shared/Stepper';
import DataRenderer from 'components/shared/DataRenderer';
import ResultScreen from 'components/screens/ResultScreen';
import { LabelButton, PrimaryButton } from 'components/shared/toolBox/button';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import { useCreateTransaction } from '../Transactions/hooks/useCreateTransaction';

import TransactionError from '../Transactions/components/SignTransaction/SignTransactionError';
import useSendTokenForm from './hooks/useSendTokenForm';
import SendTokenApplicationsStep from './components/SelectApplicationsStep';
import SendTokenSummaryStep from './components/SummaryStep';
import SendTokenOnMultisignatureAccount from './components/SendTokenOnMultisignatureAccount';
import { getSendTokenStyles } from './SendToken.styles';
import SendTokenSkeleton from './components/SendTokenSkeleton/SendTokenSkeleton';
import { useCurrentAccount } from '../Accounts/hooks/useCurrentAccount';
import { useModal } from '../../hooks/useModal';
import { useAuth } from '../Auth/hooks/useAuth';

/**
 * UI form to perform a token:transfer transaction (within and across apps).
 */
export default function SendToken() {
  const route = useRoute();
  const navigation = useNavigation();

  const [currentAccount] = useCurrentAccount();
  const { data: accountSummary, isLoading: isAuthLoading } = useAuth(
    currentAccount?.metadata?.address
  );

  const accountIsMultisignature = accountSummary?.numberOfSignatures > 0;

  const { styles } = useTheme({
    styles: getSendTokenStyles(),
  });

  const modal = useModal();

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

  const { isLoading, accountCanSendTokens, feeTokenName } = form;

  const requestToken = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'Main',
        },
        {
          name: 'Request',
        },
      ],
    });
    modal.close();
  };

  const openCannotSendTokenModal = () =>
    modal.open(
      () => (
        <TransactionError
          actionButton={
            <PrimaryButton
              onClick={requestToken}
              title={`${i18next.t('Request')} ${feeTokenName.toUpperCase()}`}
              style={[styles.tryAgainButton]}
            />
          }
          description={i18next.t('transactions.errors.insufficientFeeDescription', {
            message: feeTokenName.toUpperCase(),
          })}
          title={i18next.t('transactions.errors.insufficientFee', {
            message: feeTokenName.toUpperCase(),
          })}
          hideReport
          hideIcon
        />
      ),
      false
    );

  const handleReloadPress = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'Send' }],
    });

  const steps = [
    {
      component: SendTokenApplicationsStep,
      title: 'selectApplications',
    },
    {
      component: SendTokenSummaryStep,
      title: 'summary',
    },
  ];

  useEffect(() => {
    if (!isLoading && !accountCanSendTokens) {
      openCannotSendTokenModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, accountCanSendTokens]);

  useEffect(() => form.reset, []);

  return (
    <DataRenderer
      data={transaction}
      isLoading={transaction.isLoading || isAuthLoading}
      error={transaction.error}
      renderData={(data) => (
        <>
          {accountIsMultisignature ? (
            <SendTokenOnMultisignatureAccount />
          ) : (
            <Stepper>
              {steps.map((step) => (
                <step.component key={step.title} route={route} form={form} transaction={data} />
              ))}
            </Stepper>
          )}
        </>
      )}
      renderLoading={() => <SendTokenSkeleton />}
      renderError={(error) => (
        <ResultScreen illustration={<ErrorIllustrationSvg />} description={error.message} fluid>
          <LabelButton onPress={handleReloadPress}>
            {i18next.t('commons.buttons.reload')}
          </LabelButton>
        </ResultScreen>
      )}
    />
  );
}
