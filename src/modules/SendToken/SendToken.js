/* eslint-disable max-statements */
import React, { useEffect, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { H3, P } from 'components/shared/toolBox/typography';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Stepper from 'components/shared/Stepper';
import DataRenderer from 'components/shared/DataRenderer';
import ResultScreen from 'components/screens/ResultScreen';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useCreateTransaction } from '../Transactions/hooks/useCreateTransaction';

import useSendTokenForm from './hooks/useSendTokenForm';
import SendTokenApplicationsStep from './components/SelectApplicationsStep';
import SendTokenSelectTokenStep from './components/SelectTokenStep';
import SendTokenSummaryStep from './components/SummaryStep';
import SendTokenOnMultisignatureAccount from './components/SendTokenOnMultisignatureAccount';
import { getSendTokenStyles } from './SendToken.styles';
import SendTokenSkeleton from './components/SendTokenSkeleton/SendTokenSkeleton';
import { useCurrentAccount } from '../Accounts/hooks/useCurrentAccount';
import { selectAccountSummary } from '../Accounts/store/selectors';
import { useModal } from '../../hooks/useModal';
import AccountItem from '../Accounts/components/AccountItem';

/**
 * UI form to perform a token:transfer transaction (within and across apps).
 */
export default function SendToken() {
  const route = useRoute();
  const modal = useModal();
  const { accounts } = useAccounts();

  const navigation = useNavigation();

  const accountSummary = useSelector(selectAccountSummary);
  const [currentAccount, setCurrentAccount] = useCurrentAccount();

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

  const handleSelectAccountClick = (account) => {
    setCurrentAccount(account);
    modal.close();
  };

  const renderAccountList = () => {
    return (
      <View>
        <View style={styles.modalTitleContainer}>
          <H3 style={styles.theme.text}>{i18next.t('sendToken.account.selectAccount')}</H3>
          <P style={[styles.description, styles.theme.text]}>
            {i18next.t('sendToken.account.description')}
          </P>
        </View>
        <FlatList
          data={accounts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AccountItem
              key={item.metadata.address}
              account={item}
              onPress={() => handleSelectAccountClick(item)}
              active={item.metadata.address === currentAccount.metadata?.address}
              testID={`account-list-item`}
              navigation={navigation}
            />
          )}
        />
      </View>
    );
  };

  const openSelectAccountModal = () => modal.open(renderAccountList(), false);

  useEffect(() => {
    if (!accounts.length) {
      navigation.navigate('AuthMethod');
    } else if (!currentAccount?.metadata && accounts?.length === 1) {
      handleSelectAccountClick(accounts[0]);
    } else if (!currentAccount?.metadata) {
      openSelectAccountModal();
    }
  }, [accounts, currentAccount]);

  const accountIsMultisignature = accountSummary.isMultisignature;

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
        renderLoading={() => <SendTokenSkeleton />}
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
