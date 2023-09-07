/* eslint-disable max-statements */
import React, { useEffect, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
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
import SendTokenSummaryStep from './components/SummaryStep';
import SendTokenOnMultisignatureAccount from './components/SendTokenOnMultisignatureAccount';
import { getSendTokenStyles } from './SendToken.styles';
import SendTokenSkeleton from './components/SendTokenSkeleton/SendTokenSkeleton';
import { useCurrentAccount } from '../Accounts/hooks/useCurrentAccount';
import { useModal } from '../../hooks/useModal';
import AccountItem from '../Accounts/components/AccountItem';
import { useAuth } from '../Auth/hooks/useAuth';

/**
 * UI form to perform a token:transfer transaction (within and across apps).
 */
export default function SendToken() {
  const route = useRoute();
  const navigation = useNavigation();

  const navigationStateIndex = useNavigationState((state) => state.index);

  const { accounts } = useAccounts();

  const [currentAccount, setCurrentAccount] = useCurrentAccount();
  const { data: accountSummary, isLoading } = useAuth(currentAccount?.metadata?.address);

  const accountIsMultisignature = accountSummary?.numberOfSignatures > 0;

  const { styles } = useTheme({
    styles: getSendTokenStyles(),
  });

  const handleSelectAccountClick = (account, modal) => {
    setCurrentAccount(account);
    modal.close();
  };

  const renderAccountList = (modal) => (
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
            onPress={() => handleSelectAccountClick(item, modal)}
            active={item.metadata.address === currentAccount?.metadata?.address}
            testID={`account-list-item`}
            navigation={navigation}
          />
        )}
      />
    </View>
  );

  const accountListModal = useModal(renderAccountList);

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

  const openSelectAccountModal = () => accountListModal.open(undefined, false);

  const handleGoBackPress = () => {
    if (navigationStateIndex === 0) {
      navigation.navigate('Main');
    } else {
      navigation.goBack();
    }
  };

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
    if (!accounts.length) {
      navigation.navigate('AuthMethod');
    } else if (!currentAccount?.metadata && accounts.length === 1) {
      handleSelectAccountClick(accounts[0], accountListModal);
    } else if (!currentAccount?.metadata) {
      openSelectAccountModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, currentAccount]);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]} testID="send-token-screen">
      <HeaderBackButton
        title="Send token"
        onPress={handleGoBackPress}
        containerStyle={[styles.header]}
      />

      <DataRenderer
        data={transaction}
        isLoading={transaction.isLoading || isLoading}
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
          <ResultScreen illustration={<ErrorIllustrationSvg />} description={error.message} />
        )}
      />
    </SafeAreaView>
  );
}
