import React from 'react';
import connect from 'redux-connect-decorator';
import { View, TouchableWithoutFeedback } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';
import Share from '../share';
import { deviceWidth, deviceHeight, SCREEN_HEIGHTS } from '../../utilities/device';
import Input from '../toolBox/input';
import { P, B } from '../toolBox/typography';
import reg from '../../constants/regex';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes, colors } from '../../constants/styleGuide';
import { tokenMap } from '../../constants/tokens';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

@connect(state => ({
  account: state.accounts.info,
  activeToken: state.settings.token.active,
}))
class Request extends React.Component {
  state = {
    amount: { value: '', validity: -1 },
    url: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeToken !== this.props.activeToken) {
      this.setState({
        amount: { value: '', validity: -1 },
        url: '',
      });
    }
  }

  validator = str => reg.amount.test(str)

  changeHandler = (val) => {
    const { account, activeToken } = this.props;
    const { address } = account[activeToken];

    let amountValidity = -1;
    let amount = val;

    if (val !== '') {
      amountValidity = this.validator(val) ? 0 : 1;
      amount = {
        value: val,
        validity: amountValidity,
      };
    }

    this.setState({
      amount,
      url: amountValidity === 0 ? `lisk://wallet?recipient=${address}&amount=${val}` : address,
    });
  }

  render() {
    const {
      styles, theme, account, t, activeToken,
    } = this.props;
    const { amount, url } = this.state;
    const { address } = account[activeToken];

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          contentContainerStyle={styles.container}
        >
          <View style={[styles.innerContainer, styles.theme.innerContainer]}>
            {!isSmallScreen ? (
              <P style={[styles.subHeader, styles.theme.subHeader]}>
                {t(`Request ${activeToken} tokens from other accounts.`)}
              </P>
            ) : null}

            <View style={styles.main}>
              <B style={[styles.addressLabel, styles.theme.addressLabel]}>
                {t(`Your ${tokenMap[activeToken].label} address`)}
              </B>

              <B style={[styles.address, styles.theme.address]}>
                {address}
              </B>

              <Share
                type={TouchableWithoutFeedback}
                value={url || address}
              >
                <View style={styles.shareContent}>
                  <QRCode
                    value={url || address}
                    size={qrCodeSize}
                    color={
                      theme === themes.light ? colors.light.black : colors.dark.white
                    }
                    backgroundColor={
                      theme === themes.light ? colors.light.white : colors.dark.screenBgNavy
                    }
                  />

                  <View style={styles.shareTextContainer}>
                    <P style={[styles.shareText, styles.theme.shareText]}>
                      {t('Tap on the QR Code to share it.')}
                    </P>
                  </View>
                </View>
              </Share>
            </View>

            <View style={styles.inputContainer}>
              {activeToken === tokenMap.LSK.key ? (
                <Input
                  innerStyles={{ input: styles.input }}
                  label={t('Amount in LSK (Optional)')}
                  autoCorrect={false}
                  onChange={this.changeHandler}
                  value={amount.value}
                  keyboardType='numeric'
                  error={amount.validity === 1 ? t('Invalid amount') : ''}
                />
              ) : null}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(Request), getStyles());
