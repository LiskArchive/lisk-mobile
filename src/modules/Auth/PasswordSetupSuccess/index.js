import React from 'react';
import i18next from 'i18next';

import { useDownloadFile } from 'hooks/useDownloadFile';
import DownloadFile from 'components/shared/DownloadFile';
import ResultScreen from 'components/screens/ResultScreen';
import CompletedIllustrationSvg from 'assets/svgs/CompletedIllustrationSvg';
import { getAccountDownloadableFilename } from '../utils/downloadAccount';

export default function PasswordSetupSuccess({ encryptedJson, onContinue }) {
  const accountFilename = getAccountDownloadableFilename(encryptedJson.metadata.address);

  const [downloadFile, { isLoading: isLoadingDownloadFile, isSuccess: isSuccessDownloadFile }] =
    useDownloadFile({
      data: encryptedJson,
      fileName: accountFilename,
    });

  return (
    <ResultScreen
      illustration={<CompletedIllustrationSvg />}
      title={i18next.t('auth.setup.passwordSetupSuccessTitle')}
      description={i18next.t('auth.setup.passwordSetupSuccessDescription')}
      buttonText={i18next.t('auth.setup.buttons.passwordSetupContinue')}
      disabled={!isSuccessDownloadFile}
      onContinue={onContinue}
    >
      <DownloadFile
        fileName={accountFilename}
        downloadFile={downloadFile}
        isLoading={isLoadingDownloadFile}
      />
    </ResultScreen>
  );
}
