import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import withTheme from 'components/shared/withTheme';
import FlowerSuccessSvg from 'assets/svgs/FlowerSuccessSvg';
import FileSvg from 'assets/svgs/FileSvg';
import DownloadSvg from 'assets/svgs/DownloadSvg';
import { translate } from 'react-i18next';
import SuccessScreen from '../components/success';
import getStyles from './styles';
import { downloadJSON } from '../utils';

const jsonData = { dummy: 'Dummy data' };

const PasswordSetupSuccess = ({ styles, t }) => {
  const [downloaded, setDownloaded] = useState(false);
  const downloadFile = () => downloadJSON(jsonData, (e) => {
    if (!e) {
      setDownloaded(true);
    }
  });

  return <SuccessScreen
    illustration={<FlowerSuccessSvg />}
    title={t('auth.setup.password_setup_success_title')}
    description={t('auth.setup.password_setup_success_description') }
    buttonText={t('auth.setup.buttons.password_setup_continue')}
    disabled={!downloaded}
  >
    <View>
      <View style={[styles.downloadFile]} >
        <View style={[styles.file]} >
          <FileSvg />
        </View>
        <Text style={[styles.text, styles.theme.text]} >encrypted_secret_recovery_phrase.json</Text>
      </View>
      <TouchableOpacity style={[styles.downloadFile]} onPress={downloadFile} >
        <Text style={[styles.download]}>{t('auth.setup.buttons.download')}</Text>
        <View style={[styles.file]} >
          <DownloadSvg style={[styles.file]} />
        </View>
      </TouchableOpacity>
    </View>
  </SuccessScreen>;
};

export default withTheme(translate()(PasswordSetupSuccess), getStyles());
