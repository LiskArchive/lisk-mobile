/* eslint-disable max-statements */
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useDownloadFile } from 'hooks/useDownloadFile';
import { useTheme } from 'contexts/ThemeContext';
import DownloadFile from 'components/shared/DownloadFile';
import { H3, P } from 'components/shared/toolBox/typography';
import Checkbox from 'components/shared/Checkbox';
import { settingsUpdated } from 'modules/Settings/store/actions';
import { PrimaryButton } from 'components/shared/toolBox/button';
import AllSetIllustrationSvg from 'assets/svgs/AllSetIllustrationSvg';
import { getAccountDownloadableFilename } from '../../utils/downloadAccount';

import getPasswordSetupSuccessStyles from './styles';

export default function PasswordSetupSuccess({ route }) {
  const encryptedAccount = route.params?.encryptedAccount;
  const onContinue = route.params?.onContinue;
  const discrete = useSelector((state) => state.settings.discrete);
  const dispatch = useDispatch();

  const toggleDiscreteMode = () =>
    dispatch(
      settingsUpdated({
        discrete: !discrete,
      })
    );

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
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <View style={[styles.body]}>
        <AllSetIllustrationSvg style={[styles.illustration]} />

        <H3 style={[styles.title, styles.theme.title]}>
          {i18next.t('auth.setup.passwordSetupSuccessTitle')}
        </H3>

        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.setup.passwordSetupSuccessDescription')}
        </P>

        <DownloadFile
          fileName={accountFilename}
          downloadFile={downloadFile}
          isLoading={isLoadingDownloadFile}
        />
      </View>

      <View style={[styles.footer]} testID="result-screen-continue">
        <Checkbox
          onPress={toggleDiscreteMode}
          selected={discrete}
          style={{ container: styles.checkBox }}
        >
          <P style={[styles.text]}>{i18next.t('auth.setup.enableDiscreteMode')}</P>
        </Checkbox>

        <PrimaryButton onPress={onContinue} style={[styles.continueButton]}>
          {i18next.t('auth.setup.buttons.passwordSetupContinueButton')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
