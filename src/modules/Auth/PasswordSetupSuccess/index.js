import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import withTheme from 'components/shared/withTheme';
import FlowerSuccessSvg from 'assets/svgs/FlowerSuccessSvg';
import FileSvg from 'assets/svgs/FileSvg';
import DownloadSvg from 'assets/svgs/DownloadSvg';
import SuccessScreen from '../components/success';
import getStyles from './styles';
import { downloadJSON } from '../utils';

const jsonData = { dummy: 'Dummy data' };

const PasswordSetupSuccess = ({ styles }) => {
  const [downloaded, setDownloaded] = useState(false);
  const downloadFile = () => downloadJSON(jsonData, (e) => {
    if (!e) {
      setDownloaded(true);
    }
  });

  return <SuccessScreen
    illustration={<FlowerSuccessSvg />}
    title="Perfect! You're all set"
    description="You can now download encrypted secret recovery phrase."
    buttonText="Continue to Dashboard"
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
        <Text style={[styles.download]}>Download</Text>
        <View style={[styles.file]} >
          <DownloadSvg style={[styles.file]} />
        </View>
      </TouchableOpacity>
    </View>
  </SuccessScreen>;
};

export default withTheme(PasswordSetupSuccess, getStyles());
