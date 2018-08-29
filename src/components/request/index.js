import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Platform } from 'react-native';
import QRCode from 'react-native-qrcode';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Share from '../share';
import styles from './styles';
import { viewportHeight, deviceWidth } from '../../utilities/device';
import Input from '../toolBox/input';
import { H1, P, B } from '../toolBox/typography';
import reg from '../../constants/regex';
import colors from '../../constants/styleGuide/colors';

const pageHeight = viewportHeight();
const qrCodeSize = Math.min(pageHeight - 335, Math.floor(deviceWidth() * 0.8));

/**
 * The container component containing login and create account functionality
 */
@connect(state => ({
  account: state.accounts.active,
}), {})
class Request extends React.Component {
  state = {
    amount: { value: '', validity: -1 },
  };

  validator = {
    amount: str => reg.amount.test(str),
  };

  /**
   * @param {Number} value - A valid amount in LSK
   */
  changeHandler = (val) => {
    const { address } = this.props.account;
    let url = this.props.account.address;
    let amountValidity = -1;
    let amount = val;
    if (val !== '') {
      amountValidity = this.validator.amount(val) ? 0 : 1;
      amount = {
        value: val,
        validity: amountValidity,
      };
    }
    url = amountValidity === 0 ? `lisk://wallet?recipient=${address}&amount=${val}` : address;

    this.setState({
      amount,
      url,
    });
  }

  render() {
    return (<View style={styles.wrapper}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        contentContainerStyle={Platform.OS === 'ios' ? styles.container : null}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.headings}>
              <H1>Request</H1>
              <P style={styles.subtitle}>Request LSK tokens from other accounts.</P>
            </View>
          </View>
          <View style={styles.main}>
            <B style={styles.address}>{ this.props.account.address }</B>
            <QRCode
              value={this.state.url}
              size={qrCodeSize}
              style={styles.qrCode}
              bgColor='#263344'
              fgColor={colors.white}/>
            <View style={styles.share}>
              <Share type={P} value={this.state.url}
                style={styles.blue} color={colors.primary5} icon={true}>Share</Share>
            </View>
          </View>
          <View style={styles.fieldset}>
            <Input
              label='Amount in Ⱡ (Optional)'
              autoCorrect={false}
              reference={(input) => { this.amountInput = input; }}
              styles={{ errorMessage: styles.errorMessage, input: styles.input }}
              onChange={value => this.changeHandler(value)}
              value={this.state.amount.value}
              keyboardType='numeric'
              error={
                this.state.amount.validity === 1 ?
                  'Invalid amount' : ''
              }/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>);
  }
}

export default Request;
