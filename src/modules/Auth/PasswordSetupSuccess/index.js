import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import withTheme from 'components/shared/withTheme';
import FlowerSuccessSvg from 'assets/svgs/FlowerSuccessSvg';
import FileSvg from 'assets/svgs/FileSvg';
import DownloadSvg from 'assets/svgs/DownloadSvg';
import { themes } from 'constants/styleGuide';
import { translate } from 'react-i18next';
import SuccessScreen from '../components/success';
import getStyles from './styles';
import { downloadJSON } from '../utils';

const PasswordSetupSuccess = ({ styles, t, encryptedJson, onContinue, theme }) => {
  const [downloaded, setDownloaded] = useState(false);

  const downloadFile = () =>
    downloadJSON(
      encryptedJson,
      `${encryptedJson.metadata.address}-encrypted_secret_recovery_phrase.json`,
      (e) => {
        if (!e) {
          setDownloaded(true);
        }
      }
    );

  return (
    <SuccessScreen
      illustration={<FlowerSuccessSvg fill={theme === themes.dark ? '#9999A0' : '#0C152E'} />}
      title={t('auth.setup.passwordSetupSuccessTitle')}
      description={t('auth.setup.passwordSetupSuccessDescription')}
      buttonText={t('auth.setup.buttons.passwordSetupContinue')}
      disabled={!downloaded}
      onContinue={onContinue}
    >
      <View>
        <View style={[styles.downloadFile]}>
          <View style={[styles.file]}>
            <FileSvg />
          </View>
          <Text style={[styles.text, styles.theme.text]}>
            encrypted_secret_recovery_phrase.json
          </Text>
        </View>
        <Text
          style={[styles.text, styles.theme.text]}
        >{`${encryptedJson.metadata.address}-encrypted_secret_recovery_phrase.json`}</Text>
      </View>
    </SuccessScreen>
  );
};

export default withTheme(translate()(PasswordSetupSuccess), getStyles());
