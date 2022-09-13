import React, { useState } from 'react';
import { Platform, ToastAndroid, View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { downloadJSON } from 'modules/Auth/utils';
import { H2, P } from 'components/shared/toolBox/typography';
import { Button, PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import DownloadSvg from 'assets/svgs/DownloadSvg';
import FileSvg from 'assets/svgs/FileSvg';
import { stringShortener } from 'utilities/helpers';

import getDeleteAccountConfirmationStyles from './styles';

export default function DeleteAccountConfirmation({
  account,
  onReset,
  style,
}) {
  const [downloaded, setDownloaded] = useState(false);

  const { deleteAccountByAddress } = useAccounts();

  const { styles } = useTheme({ styles: getDeleteAccountConfirmationStyles() });

  function handleDownloadFile() {
    downloadJSON(account, `${account.metadata.address}-encrypted_secret_recovery_phrase.json`, (e) => {
      if (!e) {
        setDownloaded(true);
        if (Platform.OS === 'android') {
          ToastAndroid.show(i18next.t('auth.setup.downloaded'), ToastAndroid.BOTTOM);
        }
      }
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
          <FileSvg style={[styles.file, { marginRight: 8 }]} />

          <P style={[styles.text, styles.theme.text]}>
            {`${account.metadata.address}-encrypted_secret_recovery_phrase.json`}
          </P>
        </View>

        <LabelButton
          onPress={handleDownloadFile}
          style={[styles.row]}
          adornments={{
            right:
              <DownloadSvg style={[styles.downloadFileIcon]} />
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
