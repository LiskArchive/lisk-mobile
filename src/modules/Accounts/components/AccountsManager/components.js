import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { useAccounts, useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { downloadJSON } from 'modules/Auth/utils';
import { H2, P } from 'components/shared/toolBox/typography';
import { Button, PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import Avatar from 'components/shared/avatar';
import DownloadSvg from 'assets/svgs/DownloadSvg';
import FileSvg from 'assets/svgs/FileSvg';
import { stringShortener } from 'utilities/helpers';

import AccountItem from '../AccountItem';
import getAccountsManagerStyles from './styles';

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
        {i18next.t('accounts.accountsManager.title')}
      </H2>

      {mode === 'modal' && (
        <P
          style={[
            styles.description,
            styles.theme.description,
            style?.description
          ]}
        >
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
          title={i18next.t('accounts.accountsManager.addAccountButtonText')}
        />
      </View>
    </>
  );
}

export function DeleteAccountConfirmation({
  account,
  onReset,
  style,
}) {
  const [downloaded, setDownloaded] = useState(false);

  const { deleteAccountByAddress } = useAccounts();

  const { styles } = useTheme({ styles: getAccountsManagerStyles() });

  function handleDownloadFile() {
    downloadJSON(account, (e) => {
      if (!e) setDownloaded(true);
    });
  }

  function handleDelete() {
    deleteAccountByAddress(account.metadata.address);
    onReset();
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <H2 style={[styles.title, styles.theme.title, style?.title]}>
          {i18next.t('accounts.accountsManager.deleteAccountTitle')}
        </H2>

        <P
          style={[
            styles.description,
            styles.theme.description,
            style?.description
          ]}
        >
          {i18next.t('accounts.accountsManager.deleteAccountDescription')}
        </P>

        <View style={[styles.row, styles.addressContainer]}>
          <Avatar
            address={account.metadata.address}
            size={45}
          />

          <P style={[styles.addressText, styles.theme.addressText]}>
            {stringShortener(account.metadata.address, 5, 5)}
          </P >
        </View>

        <View style={[styles.row, styles.filenameContainer]}>
          <FileSvg style={[styles.file, { marginRight: 8 }]}/>

          <P style={[styles.text, styles.theme.text]}>
            encrypted_secret_recovery_phrase.json
          </P>
        </View>

        <LabelButton
          onPress={handleDownloadFile}
          style={[styles.row]}
          adornments={{
            right:
              <DownloadSvg style={[styles.downloadFileIcon]}/>
          }}
        >
          {i18next.t('accounts.accountsManager.downloadFileButtonText')}
        </LabelButton>
      </View>

      <View style={[style?.footer]}>
        <PrimaryButton
          onPress={handleDelete}
          title={i18next.t('accounts.accountsManager.deleteAccountButtonText')}
          disabled={!downloaded}
          style={[styles.button, styles.outline, styles.theme.outline]}
        />

        <Button
          onPress={onReset}
          title={i18next.t('accounts.accountsManager.backButtonText')}
          style={[styles.button, styles.outline, styles.theme.outline]}
        />
      </View>
    </>
  );
}
