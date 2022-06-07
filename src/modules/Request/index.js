/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';
import Share from 'components/shared/share';
import {
  deviceWidth,
  deviceHeight,
  deviceType,
  SCREEN_HEIGHTS,
} from 'utilities/device';
import Input from 'components/shared/toolBox/input';
import { P, B } from 'components/shared/toolBox/typography';
import reg from 'constants/regex';
import withTheme from 'components/shared/withTheme';
import { themes, colors } from 'constants/styleGuide';
import Avatar from 'components/shared/avatar';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { languageMap } from 'constants/languages';
import getStyles from './styles';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.72);

const Request = ({
  styles, theme, account, t, language
}) => {
  const { address } = account.LSK;
  const [amount, setAmount] = useState({ value: '', validity: -1 });
  const [url, setUrl] = useState('');
  const extraHeight = deviceType() === 'android' ? 170 : 0;

  const validator = str => reg.amount.test(str);

  const changeHandler = val => {
    if (language === languageMap.en.code) {
      val = val.replace(/,/g, '.');
    } else {
      val = val.replace(/\./g, ',');
    }

    let amountValidity = -1;
    let amount = val;

    if (val !== '') {
      amountValidity = validator(val) ? 0 : 1;
      amount = {
        value: val,
        validity: amountValidity,
      };
    }
    setUrl(amountValidity === 0
      ? `lisk://wallet?recipient=${address}&amount=${val}`
      : address);
    setAmount(amount);
  };

  return <View style={[styles.wrapper, styles.theme.wrapper]}>
    <KeyboardAwareScrollView
      viewIsInsideTab
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      extraHeight={extraHeight}
    >
      <View style={[styles.innerContainer, styles.theme.innerContainer]}>
        <View style={styles.subHeader}>
          <P style={[styles.addressLabel, styles.theme.addressLabel]}>
            {t('Your Lisk address')}
          </P>
          <View style={styles.addressContainer}>
            <Avatar style={styles.avatar} address={address} size={24} />
            <CopyToClipboard
              style={styles.copyContainer}
              labelStyle={[styles.address, styles.theme.address]}
              showIcon={true}
              iconSize={18}
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

          <View style={styles.inputContainer}>
            <Input
              label={t('Amount in LSK (optional)')}
              autoCorrect={false}
              onChange={changeHandler}
              value={amount.value}
              keyboardType="numeric"
              error={amount.validity === 1 ? t('Invalid amount') : ''}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  </View>;
};

const mapStateToProps = state => ({
  account: state.accounts.info,
  language: state.settings.language,
});

export default withTheme(translate()(connect(mapStateToProps)(Request)), getStyles());
