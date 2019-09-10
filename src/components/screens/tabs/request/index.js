import React from 'react';
import connect from 'redux-connect-decorator';
import { View, TouchableWithoutFeedback } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';
import Share from '../../../shared/share';
import {
  deviceWidth,
  deviceHeight,
  deviceType,
  SCREEN_HEIGHTS,
} from '../../../../utilities/device';
import Input from '../../../shared/toolBox/input';
import { P, B } from '../../../shared/toolBox/typography';
import reg from '../../../../constants/regex';
import withTheme from '../../../shared/withTheme';
import getStyles from './styles';
import { themes, colors } from '../../../../constants/styleGuide';
import { tokenMap } from '../../../../constants/tokens';
import Avatar from '../../../shared/avatar';
import CopyToClipboard from '../../../shared/copyToClipboard';
import { languageMap } from '../../../../constants/languages';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

@connect(state => ({
  account: state.accounts.info,
  activeToken: state.settings.token.active,
  language: state.settings.language,
}))
class Request extends React.Component {
  state = {
    amount: { value: '', validity: -1 },
    url: '',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.activeToken !== this.props.activeToken) {
      this.setState({
        amount: { value: '', validity: -1 },
        url: '',
      });
    }
  }

  validator = str => reg.amount.test(str);

  changeHandler = val => {
    const { account, activeToken, language } = this.props;
    const { address } = account[activeToken];

    if (language === languageMap.en.code) {
      val = val.replace(/,/g, '.');
    } else {
      val = val.replace(/\./g, ',');
    }

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
      url:
        amountValidity === 0
          ? `lisk://wallet?recipient=${address}&amount=${val}`
          : address,
    });
  };

  render() {
    const { styles, theme, account, t, activeToken } = this.props;
    const { amount, url } = this.state;
    const { address } = account[activeToken];
    const extraHeight = deviceType() === 'android' ? 170 : 0;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <KeyboardAwareScrollView
          viewIsInsideTab
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          extraHeight={extraHeight}
        >
          <View style={[styles.innerContainer, styles.theme.innerContainer]}>
            <View style={styles.subHeader}>
              <P style={[styles.addressLabel, styles.theme.addressLabel]}>
                {t(`Your ${tokenMap[activeToken].label} address`)}
              </P>

              <View style={styles.addressContainer}>
                {activeToken === tokenMap.LSK.key && (
                  <Avatar style={styles.avatar} address={address} size={24} />
                )}
                <CopyToClipboard
                  style={styles.copyContainer}
                  labelStyle={[styles.address, styles.theme.address]}
                  showIcon={true}
                  iconSize={18}
                  iconStyle={styles.copyIcon}
                  value={address}
                  type={B}
                />
              </View>
            </View>

            <View style={styles.body}>
              <View style={styles.shareContainer}>
                <Share
                  type={TouchableWithoutFeedback}
                  value={url || address}
                  title={url || address}
                >
                  <View style={styles.shareContent}>
                    <QRCode
                      value={url || address}
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

                    <View style={styles.shareTextContainer}>
                      <P style={[styles.shareText, styles.theme.shareText]}>
                        {t('Tap on the QR Code to share it.')}
                      </P>
                    </View>
                  </View>
                </Share>
              </View>

              {activeToken === tokenMap.LSK.key ? (
                <View style={styles.inputContainer}>
                  <Input
                    label={t('Amount in LSK (optional)')}
                    autoCorrect={false}
                    onChange={this.changeHandler}
                    value={amount.value}
                    keyboardType="numeric"
                    error={amount.validity === 1 ? t('Invalid amount') : ''}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(Request), getStyles());
