import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import withTheme from 'components/shared/withTheme';
import FlowerSuccessSvg from 'assets/svgs/FlowerSuccessSvg';
import FileSvg from 'assets/svgs/FileSvg';
import { SafeAreaView } from 'react-native-safe-area-context';
import DownloadSvg from 'assets/svgs/DownloadSvg';
import { translate } from 'react-i18next';
import { IconButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import { useNavigation } from '@react-navigation/native';
import SuccessScreen from '../components/success';
import getStyles from './styles';
import { downloadJSON } from '../utils';

const RemoveAccountConfirmation = ({
  styles,
  t,
  sharedData: { encryptedAccount },
  onContinue,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const downloadFile = () =>
    downloadJSON(encryptedAccount, (e) => {
      if (!e) {
        setDownloaded(true);
      }
    });
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]} >
      <IconButton
        icon="cross"
        size={25}
        onClick={navigation.goBack}
        style={styles.closeIcon}
        color={colors.dark.ultramarineBlue}
      />
      <SuccessScreen
        illustration={<FlowerSuccessSvg />}
        title={t('auth.setup.remove_account')}
        description={t('auth.setup.remove_account_description')}
        buttonText={t('auth.setup.buttons.remove_now')}
        disabled={!downloaded}
        onContinue={() => onContinue(encryptedAccount)}
        address={encryptedAccount?.metadata?.address}
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
          <TouchableOpacity
            style={[styles.downloadFile]}
            onPress={downloadFile}
          >
            <Text style={[styles.download]}>
              {t('auth.setup.buttons.download')}
            </Text>
            <View style={[styles.file]}>
              <DownloadSvg style={[styles.file]} />
            </View>
          </TouchableOpacity>
        </View>
      </SuccessScreen>
    </SafeAreaView>
  );
};

export default withTheme(translate()(RemoveAccountConfirmation), getStyles());
