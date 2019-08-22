import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import PassphraseCopy from '../../shared/passphraseCopy';
import { themes, colors } from '../../../constants/styleGuide';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import { deviceWidth, deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

@connect(state => ({
  account: state.accounts.info,
  activeToken: state.settings.token.active,
  passphrase: state.accounts.passphrase,
}))
class PassphraseBackup extends React.Component {
  render() {
    const {
      styles, passphrase, account, activeToken, theme,
    } = this.props;
    const { address } = account[activeToken];

    return (
      <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.container}>
          <PassphraseCopy passphrase={passphrase} />
          <QRCode
            value={address}
            size={qrCodeSize}
            color={
              theme === themes.light ? colors.light.black : colors.dark.white
            }
            backgroundColor={
              theme === themes.light ? colors.light.white : colors.dark.maastrichtBlue
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(PassphraseBackup, getStyles());
