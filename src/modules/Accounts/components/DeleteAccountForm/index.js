import React from 'react';
import { Platform, ToastAndroid, View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useDownloadFile } from 'hooks/useDownloadFile';
import DownloadFile from 'components/shared/DownloadFile';
import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import { getAccountDownloadableFilename } from 'modules/Auth/utils/downloadAccount';

import getDeleteAccountFormStyles from './styles';

export default function DeleteAccountForm({ mode, account, onCompleted, style }) {
  const { deleteAccount } = useAccounts();

  const accountFilename = getAccountDownloadableFilename(account.metadata.address);

  const [downloadFile, { isLoading: isLoadingDownloadFile, isSuccess: isSuccessDownloadFile }] =
    useDownloadFile({
      data: account,
      fileName: accountFilename,
      onCompleted: () => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(i18next.t('auth.setup.downloaded'), ToastAndroid.BOTTOM);
        }
      },
    });

  const { styles } = useTheme({ styles: getDeleteAccountFormStyles() });

  function handleDelete() {
    deleteAccount(account.metadata.address);

    if (onCompleted) {
      onCompleted();
    }
  }

  return (
    <View style={[styles.container, style?.container]} testID="delete-account-container">
      <View style={[styles.body, style?.body]}>
        {mode === 'modal' && (
          <H2 style={[styles.title, styles.theme.title, style?.title]}>
            {i18next.t('accounts.accountsManager.deleteAccountTitle')}
          </H2>
        )}

        <P
          style={[
            mode === 'modal' ? styles.modalDescription : styles.screenDescription,
            styles.theme.description,
            style?.description,
          ]}
        >
          {i18next.t('accounts.accountsManager.deleteAccountDescription')}
        </P>

        <View style={[styles.addressContainer]}>
          <Avatar address={account.metadata.address} size={45} />

          <P style={[styles.accountNameText, styles.theme.accountNameText]}>
            {account.metadata.name}
          </P>

          <P style={[styles.addressText, styles.theme.addressText]}>{account.metadata.address}</P>
        </View>

        <DownloadFile
          fileName={accountFilename}
          downloadFile={downloadFile}
          isLoading={isLoadingDownloadFile}
        />
      </View>

      <PrimaryButton
        onPress={handleDelete}
        title={i18next.t('accounts.accountsManager.deleteAccountButtonText')}
        disabled={!isSuccessDownloadFile}
        style={[styles.submitButton, style?.submitButton]}
        testID="delete-account-button"
      />
    </View>
  );
}
