import React, { useState } from 'react';
import { Platform, ToastAndroid, View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { downloadJSON } from 'modules/Auth/utils';
import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import DownloadSvg from 'assets/svgs/DownloadSvg';
import FileSvg from 'assets/svgs/FileSvg';

import getDeleteAccountFormStyles from './styles';

export default function DeleteAccountForm({ mode, account, onReset, style }) {
  const [downloaded, setDownloaded] = useState(false);

  const { deleteAccount } = useAccounts();

  const { styles } = useTheme({ styles: getDeleteAccountFormStyles() });

  function handleDownloadFile() {
    downloadJSON(
      account,
      `${account.metadata.address}-encrypted_secret_recovery_phrase.json`,
      (e) => {
        if (!e) {
          setDownloaded(true);
          if (Platform.OS === 'android') {
            ToastAndroid.show(i18next.t('auth.setup.downloaded'), ToastAndroid.BOTTOM);
          }
        }
      }
    );
  }

  function handleDelete() {
    deleteAccount(account.metadata.address);

    if (onReset) {
      onReset();
    }
  }

  return (
    <View style={[styles.container, style?.container]}>
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

        <View style={[styles.row, styles.filenameContainer]}>
          <FileSvg style={[styles.file, { marginRight: 8 }]} />

          <P style={[styles.text, styles.theme.text]}>
            {`${account.metadata.address}-encrypted_secret_recovery_phrase.json`}
          </P>
        </View>

        <LabelButton
          onPress={handleDownloadFile}
          style={[styles.row]}
          adornments={{
            right: <DownloadSvg style={[styles.downloadFileIcon]} />,
          }}
        >
          {i18next.t('accounts.accountsManager.downloadFileButtonText')}
        </LabelButton>
      </View>

      <PrimaryButton
        onPress={handleDelete}
        title={i18next.t('accounts.accountsManager.deleteAccountButtonText')}
        disabled={!downloaded}
        style={[styles.submitButton, style?.submitButton]}
      />
    </View>
  );
}
