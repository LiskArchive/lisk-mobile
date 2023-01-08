import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import DropDownHolder from 'utilities/alert';
import AccountItem from '../AccountItem';

import getAccountsListStyles from './styles';

export default function AccountList({
  mode,
  onAccountClick,
  onDeleteAccountClick,
  onEditAccountClick,
  style,
}) {
  const navigation = useNavigation();

  const { accounts } = useAccounts();

  const [currentAccount, setAccount] = useCurrentAccount();

  const [currentApplication] = useCurrentApplication();

  const { styles } = useTheme({ styles: getAccountsListStyles() });

  function handleSelectAccountClick(account) {
    if (!currentApplication) {
      DropDownHolder.error(
        i18next.t('Error'),
        'Wallet is not available right now. Please try again later.'
      );
    } else {
      setAccount(account);

      navigation.navigate('Main');

      if (onAccountClick) onAccountClick(account);
    }
  }

  return (
    <View style={[styles.container, style?.container]}>
      <H2 style={[styles.title, styles.theme.title, style?.title]}>
        {i18next.t('accounts.accountsManager.title')}
      </H2>

      <P style={[styles.description, styles.theme.description, style?.description]}>
        {mode === 'modal'
          ? i18next.t('accounts.accountsManager.modalDescription')
          : i18next.t('accounts.accountsManager.screenDescription')}
      </P>

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
          />
        )}
        withDefaultSpinner
        // TODO: Integrate pagination props when useAccounts
        // is refactored to use react-query.
      />

      <View style={[styles.footer, style?.footer]}>
        <PrimaryButton onClick={() => navigation.navigate('AuthMethod')}>
          {i18next.t('accounts.accountsManager.addAccountButtonText')}
        </PrimaryButton>
      </View>
    </View>
  );
}
