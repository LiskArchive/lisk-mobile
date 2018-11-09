import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Share from '../share';
import { viewportHeight, deviceWidth } from '../../utilities/device';
import Input from '../toolBox/input';
import { H1, P, B } from '../toolBox/typography';
import reg from '../../constants/regex';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes, colors } from '../../constants/styleGuide';

const pageHeight = viewportHeight();
const qrCodeSize = Math.min(pageHeight - 355, Math.floor(deviceWidth() * 0.8));

@connect(state => ({
  account: state.accounts.active,
}))
class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: { value: '', validity: -1 },
      url: props.account.address,
    };
  }

  validator = {
    amount: str => reg.amount.test(str),
  };

  /**
   * @param {Number} value - A valid amount in LSK
   */
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
    const { styles, theme, account: { address } } = this.props;
    const { amount, url } = this.state;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          contentContainerStyle={Platform.OS === 'ios' ? styles.container : null}
        >
          <View style={[styles.innerContainer, styles.theme.innerContainer]}>
            <View style={styles.headerContainer}>
              <H1 style={[styles.header, styles.theme.header]}>
                Request
              </H1>
              <P style={[styles.subHeader, styles.theme.subHeader]}>
                Request LSK tokens from other accounts.
              </P>
            </View>
            <View style={styles.main}>
              <B style={[styles.address, styles.theme.address]}>
                {address}
              </B>
              <QRCode
                value={url}
                size={qrCodeSize}
                color={theme === themes.light ? '#263344' : colors.dark.gray4}
                backgroundColor={
                  theme === themes.light ? colors.light.white : colors.dark.screenBgNavy
                }
              />
              <View style={styles.shareContainer}>
                <Share
                  type={P}
                  value={url}
                  style={styles.theme.share}
                  icon={true}
                  iconColor={colors[theme].blue}
                >
                  Share
                </Share>
              </View>
            </View>
            <View style={styles.fieldset}>
              <Input
                label='Amount in Ⱡ (Optional)'
                autoCorrect={false}
                reference={(input) => { this.amountInput = input; }}
                styles={{ errorMessage: styles.errorMessage, input: styles.input }}
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
