import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Platform, TouchableWithoutFeedback } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Share from '../share';
import { deviceWidth, deviceHeight, SCREEN_HEIGHTS } from '../../utilities/device';
import Input from '../toolBox/input';
import { P, B } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import reg from '../../constants/regex';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes, colors } from '../../constants/styleGuide';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const qrCodeSize = deviceWidth() * (isSmallScreen ? 0.64 : 0.8);

@connect(state => ({
  account: state.accounts.active,
}))
class Request extends React.Component {
  state = {
    amount: { value: '', validity: -1 },
    url: '',
  }

  validator = {
    amount: str => reg.amount.test(str),
  };

  changeHandler = (val) => {
    const { account: { address } } = this.props;
    let amountValidity = -1;
    let amount = val;
    if (val !== '') {
      amountValidity = this.validator.amount(val) ? 0 : 1;
      amount = {
        value: val,
        validity: amountValidity,
      };
    }
    const url = amountValidity === 0 ? `lisk://wallet?recipient=${address}&amount=${val}` : address;

    this.setState({
      amount,
      url,
    });
  }

  render() {
    const { styles, theme, account } = this.props;
    const { amount, url } = this.state;
    const { address } = (account || {});

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          contentContainerStyle={Platform.OS === 'ios' ? styles.container : null}
        >
          <View style={[styles.innerContainer, styles.theme.innerContainer]}>
            {!isSmallScreen ? (
              <P style={[styles.subHeader, styles.theme.subHeader]}>
                Request LSK tokens from other accounts.
              </P>
            ) : null}
            <View style={styles.main}>
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
                    color={theme === themes.light ? '#263344' : colors.dark.gray4}
                    backgroundColor={
                      theme === themes.light ? colors.light.white : colors.dark.screenBgNavy
                    }
                  />

                  <View style={styles.shareTextContainer}>
                    <P style={[styles.shareText, styles.theme.shareText]}>
                      Share
                    </P>

                    <Icon
                      name='share'
                      size={14}
                      color={colors[theme].blue}
                    />
                  </View>
                </View>
              </Share>
            </View>
            <View style={styles.fieldset}>
              <Input
                innerStyles={{ input: styles.input }}
                label='Amount in LSK (Optional)'
                autoCorrect={false}
                onChange={this.changeHandler}
                value={amount.value}
                keyboardType='numeric'
                error={amount.validity === 1 ? 'Invalid amount' : ''}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Request, getStyles());
