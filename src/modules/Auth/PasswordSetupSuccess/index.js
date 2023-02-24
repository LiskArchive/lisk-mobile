import React from 'react';
import i18next from 'i18next';
import { useRoute } from '@react-navigation/native';

import { useDownloadFile } from 'hooks/useDownloadFile';
import { useTheme } from 'contexts/ThemeContext';
import DownloadFile from 'components/shared/DownloadFile';
import ResultScreen from 'components/screens/ResultScreen';
import CompletedIllustrationSvg from 'assets/svgs/CompletedIllustrationSvg';
import { getAccountDownloadableFilename } from '../utils/downloadAccount';

import getPasswordSetupSuccessStyles from './styles';

export default function PasswordSetupSuccess() {
  const route = useRoute();

  const encryptedAccount = route.params?.encryptedAccount;
  const onContinue = route.params?.onContinue;

  if (!encryptedAccount) {
    throw new Error('An encrypted account is needed to download its backup file.');
  }

  const accountFilename = getAccountDownloadableFilename(encryptedAccount.metadata.address);

  const [downloadFile, { isLoading: isLoadingDownloadFile, isSuccess: isSuccessDownloadFile }] =
    useDownloadFile({
      data: encryptedAccount,
      fileName: accountFilename,
    });

  const { styles } = useTheme({ styles: getPasswordSetupSuccessStyles() });

  return (
    <ResultScreen
      illustration={<CompletedIllustrationSvg />}
      title={i18next.t('auth.setup.passwordSetupSuccessTitle')}
      description={i18next.t('auth.setup.passwordSetupSuccessDescription')}
      buttonText={i18next.t('auth.setup.buttons.passwordSetupContinueButton')}
      disabled={!isSuccessDownloadFile}
      onContinue={onContinue}
    >
      <DownloadFile
        fileName={accountFilename}
        downloadFile={downloadFile}
        isLoading={isLoadingDownloadFile}
        style={{ container: styles.downloadFileContainer }}
      />
    </ResultScreen>
  );
}
