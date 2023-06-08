/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useDownloadFile } from 'hooks/useDownloadFile';
import { useTheme } from 'contexts/ThemeContext';
import DownloadFile from 'components/shared/DownloadFile';
import ResultScreen from 'components/screens/ResultScreen';
import { P } from 'components/shared/toolBox/typography';
import Checkbox from 'components/shared/Checkbox';
import { settingsUpdated } from 'modules/Settings/store/actions';
import { PrimaryButton } from 'components/shared/toolBox/button';
import NewAccountSuccessIllustrationSvg from 'assets/svgs/NewAccountSuccessIllustrationSvg';
import { getAccountDownloadableFilename } from '../../utils/downloadAccount';

import getPasswordSetupSuccessStyles from './styles';

export default function PasswordSetupSuccess({ route }) {
  const encryptedAccount = route.params?.encryptedAccount;
  const onContinue = route.params?.onContinue;
  const discrete = useSelector((state) => state.settings.discrete);
  const dispatch = useDispatch();

  const toggleDiscreteMode = () => {
    dispatch(
      settingsUpdated({
        discrete: !discrete,
      })
    );
  };

  if (!encryptedAccount) {
    throw new Error('An encrypted account is needed to download its backup file.');
  }

  const accountFilename = getAccountDownloadableFilename(encryptedAccount.metadata.address);

  const [downloadFile, { isLoading: isLoadingDownloadFile }] = useDownloadFile({
    data: encryptedAccount,
    fileName: accountFilename,
  });

  const { styles } = useTheme({ styles: getPasswordSetupSuccessStyles() });

  return (
    <ResultScreen
      illustration={
        <View style={styles.illustration}>
          <NewAccountSuccessIllustrationSvg />
        </View>
      }
      title={i18next.t('auth.setup.passwordSetupSuccessTitle')}
      description={i18next.t('auth.setup.passwordSetupSuccessDescription')}
    >
      <DownloadFile
        fileName={accountFilename}
        downloadFile={downloadFile}
        isLoading={isLoadingDownloadFile}
        style={{ container: styles.downloadFileContainer }}
      />

      <View style={[styles.footer]} testID="result-screen-continue">
        <View style={styles.checkBox}>
          <Checkbox onPress={toggleDiscreteMode} selected={discrete}>
            <P style={[styles.text]}>{i18next.t('auth.setup.enableDiscreteMode')}</P>
          </Checkbox>
        </View>

        <PrimaryButton
          noTheme
          title={i18next.t('auth.setup.buttons.passwordSetupContinueButton')}
          style={[styles.continueButton]}
          onPress={onContinue}
        />
      </View>
    </ResultScreen>
  );
}
