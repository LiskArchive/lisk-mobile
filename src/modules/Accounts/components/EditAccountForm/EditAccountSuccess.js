import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { P } from 'components/shared/toolBox/typography';
import DownloadFile from 'components/shared/DownloadFile';
import CompletedIllustrationSvg from 'assets/svgs/CompletedIllustrationSvg';
import { getAccountDownloadableFilename } from 'modules/Auth/utils/downloadAccount';

import getEditAccountFormStyles from './styles';

export default function EditAccountSuccess({ account, onCompleted }) {
  const { styles } = useTheme({ styles: getEditAccountFormStyles() });

  function handleSubmit() {
    if (onCompleted) {
      onCompleted();
    }
  }

  const accountFilename = getAccountDownloadableFilename(account.metadata.address);

  return (
    <>
      <View style={[styles.body]}>
        <CompletedIllustrationSvg style={[styles.illustration]} />

        <P style={[styles.description, styles.theme.title]}>
          {i18next.t('accounts.editAccount.editAccountSuccess')}
        </P>

        <DownloadFile data={account} fileName={accountFilename} />
      </View>

      <PrimaryButton
        onClick={handleSubmit}
        style={[styles.submitButton]}
        testID="edit-account-button"
      >
        {i18next.t('accounts.editAccount.continue')}
      </PrimaryButton>
    </>
  );
}
