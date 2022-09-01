import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { H2, P } from 'components/shared/toolBox/typography';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { Button, PrimaryButton } from 'components/shared/toolBox/button';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';

import getAccountsManagerStyles from './styles';
import AccountItem from '../AccountItem';

export function AccountsList({
  mode,
  accounts,
  onAccountPress,
  onDeleteAccountPress,
  style
}) {
  const navigation = useNavigation();

  const [currentAccount, setAccount] = useCurrentAccount();

  const { styles } = useTheme({ styles: getAccountsManagerStyles() });

  function handleSelectAccountClick(account) {
    setAccount(account);
    navigation.navigate('Main');
    if (onAccountPress) onAccountPress(account);
  }

  return (
    <>
      <H2 style={[styles.title, styles.theme.title, style?.title]}>
        {i18next.t('auth.setup.manageAccounts')}
      </H2>

      {mode === 'modal' && (
        <P
          style={[
            styles.description,
            styles.theme.description,
            style?.description
          ]}
        >
          You can switch your account and also remove any account
          you&apos;re not using at the moment
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
            active={
              item.metadata.address === currentAccount.metadata?.address
            }
            mode={mode}
          />
        )}
        renderSpinner
        // TODO: Integrate pagination props when useAccounts
        // is refactored to use react-query.
      />

      <View style={[style?.footer]}>
        <PrimaryButton
          onPress={() => navigation.navigate('AuthMethod')}
          title={i18next.t('auth.setup.buttons.addAccount')}
          // style={[styles.button, styles.outline, styles.theme.outline]}
        />

        {mode === 'screen' && (
          <Button
            onPress={() => navigation.navigate('DeleteAccount')}
            title={i18next.t('auth.setup.buttons.removeAccount')}
            style={[styles.button, styles.outline, styles.theme.outline]}
          />
        )}
      </View>
    </>
  );
}

export function DeleteAccountConfirmation({ account, style, onCancel }) {
  const { styles } = useTheme({ styles: getAccountsManagerStyles() });

  console.log({ account });

  return (
    <>
      <H2 style={[styles.title, styles.theme.title, style?.title]}>
        Delete account?
      </H2>

      <View style={[style?.footer, { flex: 1 }]}>
        <PrimaryButton
          onPress={() => console.log('on delete...')}
          title={'Confirm delete'}
          style={[styles.button, styles.outline, styles.theme.outline]}
        />

        <Button
          onPress={onCancel}
          title={'Go back'}
          style={[styles.button, styles.outline, styles.theme.outline]}
        />
      </View>
    </>
  );
}
