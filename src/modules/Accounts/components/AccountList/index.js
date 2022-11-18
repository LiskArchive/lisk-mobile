import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import DropDownHolder from 'utilities/alert';
import AccountItem from '../AccountItem';

import getAccountsListStyles from './styles';

export default function AccountList({
  mode,
  accounts,
  onAccountPress,
  onDeleteAccountPress,
  style,
}) {
  const navigation = useNavigation();

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

      if (onAccountPress) onAccountPress(account);
    }
  }

  return (
    <>
      <H2 style={[styles.title, styles.theme.title, style?.title]}>
        {i18next.t('accounts.accountsManager.title')}
      </H2>

      {mode === 'modal' && (
        <P style={[styles.description, styles.theme.description, style?.description]}>
          {i18next.t('accounts.accountsManager.description')}
        </P>
      )}

      <InfiniteScrollList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <AccountItem
            key={item.metadata.address}
            account={item}
            onPress={() => handleSelectAccountClick(item)}
            onDeletePress={() => onDeleteAccountPress(item)}
            active={item.metadata.address === currentAccount.metadata?.address}
          />
        )}
        withDefaultSpinner
        // TODO: Integrate pagination props when useAccounts
        // is refactored to use react-query.
      />

      <View style={[style?.footer]}>
        <PrimaryButton onClick={() => navigation.navigate('AuthMethod')}>
          {i18next.t('accounts.accountsManager.addAccountButtonText')}
        </PrimaryButton>
      </View>
    </>
  );
}
