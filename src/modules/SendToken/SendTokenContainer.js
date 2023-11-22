/* eslint-disable max-statements */
import React, { useEffect, useMemo, useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18next from 'i18next';
import { H3, P } from 'components/shared/toolBox/typography';
import Icon from 'components/shared/toolBox/icon';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { colors } from 'constants/styleGuide';

import { getSendTokenStyles } from './SendToken.styles';
import SendTokenSkeleton from './components/SendTokenSkeleton/SendTokenSkeleton';
import { useCurrentAccount } from '../Accounts/hooks/useCurrentAccount';
import { useModal } from '../../hooks/useModal';
import AccountItem from '../Accounts/components/AccountItem';
import { useCurrentApplication } from '../BlockchainApplication/hooks/useCurrentApplication';
import { useApplicationsManagement } from '../BlockchainApplication/hooks/useApplicationsManagement';
import { useApplicationsExplorer } from '../BlockchainApplication/hooks/useApplicationsExplorer';
import SendToken from './SendToken';

export default function SendTokenContainer() {
  const route = useRoute();
  const navigation = useNavigation();
  const isMounted = useRef(false);

  const navigationStateIndex = useNavigationState((state) => state.index);

  const { accounts } = useAccounts();

  const [currentAccount, setCurrentAccount] = useCurrentAccount();
  const [currentApplication, setCurrentApplication] = useCurrentApplication();
  const { applications: myApplications, addApplication } = useApplicationsManagement();
  const applications = useApplicationsExplorer();

  const { styles } = useTheme({
    styles: getSendTokenStyles(),
  });

  const handleSelectAccountClick = (account, modal) => {
    setCurrentAccount(account);
    modal.close();
  };

  const toApplication = route.params?.recipientChain
    ? applications?.data?.find(
        (application) => application.chainID === route.params?.recipientChain
      )
    : currentApplication;

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

  const renderApplicationModal = () => (
    <View>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity
          style={[styles.closeButtonContainer, styles.theme.closeButtonContainer]}
          onPress={() => {
            modal.close();
            navigation.navigate('AuthMethod');
          }}
        >
          <Icon name="cross" color={colors.light.ultramarineBlue} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.modalTitleContainer}>
        <H3 style={styles.theme.text}>{i18next.t('sendToken.applicationsSelect.addAndSwitch')}</H3>
        <P style={[styles.description, styles.theme.text]}>
          {i18next.t('sendToken.applicationsSelect.description', {
            displayName: toApplication?.displayName,
          })}
        </P>
      </View>
      <View style={[styles.container, styles.theme.container]}>
        <View style={styles.nameContainer}>
          <Image source={{ uri: toApplication?.logo?.png }} style={{ ...styles.logoImage }} />

          <P style={[styles.text, styles.theme.text]}>{toApplication?.displayName}</P>
        </View>
      </View>
      <PrimaryButton
        onClick={() => {
          const app = { ...toApplication, serviceURL: toApplication?.serviceURLs?.[0] };
          addApplication(app);
          setCurrentApplication(app);
          modal.close();
        }}
        title={i18next.t('sendToken.applicationsSelect.addAndSwitchButton')}
        style={[styles.tryAgainButton]}
      />
    </View>
  );

  const accountListModal = useModal(renderAccountList);
  const modal = useModal();

  const openSelectAccountModal = () => accountListModal.open(undefined, false);

  const handleGoBackPress = () => {
    if (navigationStateIndex === 0) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } else {
      navigation.goBack();
    }
  };

  const currentApplicationChainID = currentApplication?.data?.chainID;

  const isSameApplication = useMemo(() => {
    if (route.params?.recipientChain) {
      return currentApplicationChainID === route.params?.recipientChain;
    }
    return true;
  }, [currentApplicationChainID]);

  const isApplicationInMyApps = myApplications?.data?.find?.(
    (app) => app?.chainID === route.params?.recipientChain
  );

  useFocusEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (isMounted && !applications.isLoading) {
      if (!isSameApplication && !isApplicationInMyApps) {
        modal.open(renderApplicationModal, false);
      } else if (!isSameApplication && isApplicationInMyApps) {
        const app = { ...toApplication, serviceURL: toApplication?.serviceURLs?.[0] };
        addApplication(app);
        setCurrentApplication(app);
      }
    }
  }, [isSameApplication, isApplicationInMyApps, applications.isLoading]);

  useEffect(() => {
    if (isMounted) {
      if (!accounts.length) {
        navigation.navigate('AuthMethod');
      }
      if (isSameApplication) {
        if (!currentAccount?.metadata && accounts.length === 1) {
          handleSelectAccountClick(accounts[0], accountListModal);
        } else if (!currentAccount?.metadata) {
          openSelectAccountModal();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [accounts, currentAccount, isSameApplication]);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]} testID="send-token-screen">
      <HeaderBackButton
        title="Send token"
        onPress={handleGoBackPress}
        containerStyle={[styles.header]}
      />

      {!isSameApplication || !currentAccount ? <SendTokenSkeleton /> : <SendToken />}
    </SafeAreaView>
  );
}
