/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import Toast from 'react-native-toast-message';

import { useModal } from 'hooks/useModal';
import { useTheme } from 'contexts/ThemeContext';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { settingsUpdated } from 'modules/Settings/store/actions';
import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Checkbox from 'components/shared/Checkbox';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import AccountItem from '../AccountItem';

import getAccountsListStyles from './styles';

export default function AccountList({
  mode,
  onAccountClick,
  onDeleteAccountClick,
  onEditAccountClick,
  style,
  navigation,
}) {
  const { accounts } = useAccounts();
  const modal = useModal();

  const [currentAccount, setAccount] = useCurrentAccount();

  const [currentApplication] = useCurrentApplication();

  const discrete = useSelector((state) => state.settings.discrete);

  const dispatch = useDispatch();

  const { styles } = useTheme({ styles: getAccountsListStyles() });

  const handleSelectAccountClick = (account) => {
    if (!currentApplication.data) {
      Toast.show({
        type: 'error',
        text2: i18next.t('accounts.accountsManager.walletUnavailableErrorText'),
      });
    } else {
      setAccount(account);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });

      if (onAccountClick) onAccountClick(account);
    }
  };

  const addAccount = () => {
    if (mode === 'modal') {
      modal.close();
    }
    navigation.navigate('AuthMethod', { authRequired: true });
  };

  const toggleDiscreteMode = () =>
    dispatch(
      settingsUpdated({
        discrete: !discrete,
      })
    );

  if (!accounts.length && mode === 'modal') {
    return (
      <View style={[styles.container, style?.container]}>
        <P style={[styles.description, styles.theme.description, style?.description]}>
          No accounts saved on this device.
        </P>
      </View>
    );
  }

  if (!accounts.length && mode === 'screen') {
    return null;
  }

  return (
    <View style={[styles.container, style?.container]}>
      {mode === 'modal' && (
        <>
          <H2 style={[styles.title, styles.theme.title, style?.title]}>
            {i18next.t('accounts.accountsManager.title')}
          </H2>
          <P style={[styles.description, styles.theme.description, style?.description]}>
            {i18next.t('accounts.accountsManager.modalDescription')}
          </P>
        </>
      )}

      <InfiniteScrollList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <AccountItem
            key={item.metadata.address}
            account={item}
            onPress={() => handleSelectAccountClick(item)}
            onDeletePress={() => onDeleteAccountClick(item)}
            onEditPress={() => onEditAccountClick(item)}
            active={item.metadata.address === currentAccount.metadata?.address}
            testID={`account-list-item`}
            navigation={navigation}
          />
        )}
        withDefaultSpinner
      />
      <View style={[styles.footer, style?.footer]}>
        {mode === 'screen' && (
          <Checkbox
            onPress={toggleDiscreteMode}
            selected={discrete}
            style={{ container: styles.checkBox }}
          >
            <P style={styles.checkBoxText}>{i18next.t('auth.setup.enableDiscreteMode')}</P>
          </Checkbox>
        )}

        <PrimaryButton onClick={addAccount} testID="add-account">
          {i18next.t('accounts.accountsManager.addAccountButtonText')}
        </PrimaryButton>
      </View>
    </View>
  );
}
