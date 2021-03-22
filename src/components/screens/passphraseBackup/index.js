import React from 'react';
import connect from 'redux-connect-decorator';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { translate } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import PassphraseCopy from '../../shared/passphraseCopy';
import { themes, colors } from '../../../constants/styleGuide';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import {
  deviceWidth,
  deviceHeight,
  SCREEN_HEIGHTS,
} from '../../../utilities/device';
import { P, A } from '../../shared/toolBox/typography';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

@connect(state => ({
  passphrase: state.accounts.passphrase,
}))
class PassphraseBackup extends React.Component {
  state = {
    passphraseRevealed: false,
  };

  showQRCode = () => {
    this.setState({ passphraseRevealed: true });
  };

  render() {
    const {
      styles, passphrase, theme, t
    } = this.props;
    const { passphraseRevealed } = this.state;

    return (
      <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
        <ScrollView contentContainerStyle={styles.container}>
          <PassphraseCopy passphrase={passphrase} />
          <P style={[styles.QRText, styles.theme.text]}>
            {t('Private use only')}
            <A style={styles.button} onPress={this.showQRCode}>
              &nbsp;{t('Reveal QR code')}
            </A>
          </P>
          {passphraseRevealed && (
            <View style={styles.qrCodeContainer}>
              <QRCode
                value={passphrase}
                size={qrCodeSize}
                color={
                  theme === themes.light
                    ? colors.light.black
                    : colors.dark.white
                }
                backgroundColor={
                  theme === themes.light
                    ? colors.light.white
                    : colors.dark.maastrichtBlue
                }
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(translate()(PassphraseBackup), getStyles());
