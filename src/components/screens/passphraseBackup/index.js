import React from 'react';
import connect from 'redux-connect-decorator';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { translate } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import PassphraseCopy from '../../shared/passphraseCopy';
import { themes, colors } from '../../../constants/styleGuide';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import { deviceWidth, deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';
import { P } from '../../shared/toolBox/typography';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

@connect(state => ({
  passphrase: state.accounts.passphrase,
}))
class PassphraseBackup extends React.Component {
  render() {
    const {
      styles, passphrase, theme, t,
    } = this.props;

    return (
      <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
        <ScrollView contentContainerStyle={styles.container}>
          <PassphraseCopy passphrase={passphrase} />
          <View style={styles.qrCodeContainer}>
            <P style={[styles.theme.text, styles.text]}>{t('Easy access? Show your QR code')}</P>
            <QRCode
              value={passphrase}
              size={qrCodeSize}
              color={
                theme === themes.light ? colors.light.black : colors.dark.white
              }
              backgroundColor={
                theme === themes.light ? colors.light.white : colors.dark.maastrichtBlue
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(translate()(PassphraseBackup), getStyles());
