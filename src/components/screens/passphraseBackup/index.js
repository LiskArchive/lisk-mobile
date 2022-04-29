import React from 'react';
import connect from 'redux-connect-decorator';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { translate } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import { themes, colors } from 'constants/styleGuide';
import {
  deviceWidth,
  deviceHeight,
  SCREEN_HEIGHTS,
} from 'utilities/device';
import PassphraseCopy from 'components/shared/passphraseCopy';
import withTheme from 'components/shared/withTheme';
import { P, A } from 'components/shared/toolBox/typography';
import getStyles from './styles';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.MD;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

@connect(state => ({
  passphrase: state.accounts.passphrase,
}))
class PassphraseBackup extends React.Component {
  state = {
    passphraseRevealed: false,
  };

  showQRCode = () => {
    this.setState({ passphraseRevealed: !this.state.passphraseRevealed });
  };

  render() {
    const {
      styles, passphrase, theme, t
    } = this.props;
    const { passphraseRevealed } = this.state;

    return (
      <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]} >
        <ScrollView style={styles.container} >
          <PassphraseCopy passphrase={passphrase} />
          <P style={[styles.QRText, styles.theme.text]}>
            {t('Private use only')}
            <A style={styles.button} onPress={this.showQRCode}>
              &nbsp;{this.state.passphraseRevealed ? t('Hide QR code') : t('Show QR code')}
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
