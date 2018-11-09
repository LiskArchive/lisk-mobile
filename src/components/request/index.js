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
import colors from '../../constants/styleGuide/colors';
import withTheme from '../withTheme';
import getStyles from './styles';

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
      url: props.account ? props.account.address : '',
    };
  }

  validator = {
    amount: str => reg.amount.test(str),
  };

  /**
   * @param {Number} value - A valid amount in LSK
   */
  changeHandler = (val) => {
    const { address } = this.state;
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
    const { styles } = this.props;
    const { amount, address, url } = this.state;

    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          contentContainerStyle={Platform.OS === 'ios' ? styles.container : null}
        >
          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.headings}>
                <H1>Request</H1>
                <P style={styles.subtitle}>
                  Request LSK tokens from other accounts.
                </P>
              </View>
            </View>
            <View style={styles.main}>
              <B style={styles.address}>
                {address}
              </B>
              <QRCode
                value={this.state.url}
                size={qrCodeSize}
                color='#263344'
                backgroundColor={colors.light.white}
              />
              <View style={styles.share}>
                <Share
                  type={P}
                  value={url}
                  style={styles.blue}
                  color={colors.light.blue}
                  icon={true}
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
