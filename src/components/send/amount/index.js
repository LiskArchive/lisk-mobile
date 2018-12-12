import React from 'react';
import { Image, View } from 'react-native';
import connect from 'redux-connect-decorator';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import transactions from '../../../constants/transactions';
import { fromRawLsk } from '../../../utilities/conversions';
import { B, P } from '../../toolBox/typography';
import FormattedNumber from '../../formattedNumber';
import reg from '../../../constants/regex';
import { merge } from '../../../utilities/helpers';
import AmountInput from './input';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { deviceType } from '../../../utilities/device';
import darkBlur from '../../../assets/images/amountFormBalanceBlur/dark.png';
import lightBlur from '../../../assets/images/amountFormBalanceBlur/light.png';

const blurs = { dark: darkBlur, light: lightBlur };
const isAndroid = deviceType() === 'android';

@connect(state => ({
  priceTicker: state.liskService.priceTicker,
}))
class Amount extends React.Component {
  maxLSKSupply = 125000000;
  maxLength = 10
  state = {
    amount: {
      value: '',
      normalizedValue: '',
      validity: -1,
    },
  };

  validator = (str) => {
    if (str === '' || str === '0') {
      return 1;
    }

    const { accounts } = this.props;

    return (
      reg.amount.test(str) && accounts.active &&
      accounts.active.balance > transactions.send.fee &&
      parseFloat(str) <= fromRawLsk(accounts.active.balance - transactions.send.fee)
    ) ? 0 : 1;
  };

  componentDidMount() {
    const { sharedData, accounts, navigation } = this.props;
    const status = accounts.followed
      .filter(item => item.address === (sharedData.address)).length > 0;

    if (sharedData.amount) {
      this.onChange(sharedData.amount);
    }

    navigation.setParams({
      showButtonLeft: true,
      action: () => this.props.move({
        to: status ? 0 : 1,
      }),
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  onChange = (value) => {
    if (value && (
      value > this.maxLSKSupply ||
      value.length > this.maxLength ||
      Number.isNaN(parseFloat(value))
    )) {
      return;
    }

    const normalizedValue = value.replace(/[^0-9]/g, '.');

    this.setState({
      amount: {
        value,
        normalizedValue,
        validity: -1,
      },
    });
  }

  onSubmit = () => {
    const { amount } = this.state;
    const validity = this.validator(amount.normalizedValue);

    if (validity === 0) {
      this.props.nextStep(merge(this.props.sharedData, {
        amount: amount.normalizedValue,
      }));
    } else {
      this.setState({
        amount: merge(amount, { validity }),
      });
    }
  }

  render() {
    const {
      theme, styles,
      settings: { currency, incognito },
      accounts, priceTicker,
    } = this.props;
    const { amount: { value, normalizedValue, validity } } = this.state;

    let valueInCurrency = 0;

    if (value && priceTicker[currency]) {
      valueInCurrency = (normalizedValue * priceTicker[currency]).toFixed(2);
    }

    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: 'Continue',
            type: 'inBox',
          }}
        >
          <View>
            <View style={styles.headerContainer}>
              <P style={styles.theme.subHeader}>
                Enter the amount you want to send.
              </P>
            </View>

            <View
              style={[
                styles.balanceContainer,
                styles.theme.balanceContainer,
                (incognito ? styles.balanceContainerIncognito : {}),
              ]}
            >
              <B style={[styles.balanceText, styles.theme.balanceText]}>
                {'You have '}
              </B>

              {incognito ?
                <Image
                  source={blurs[theme]}
                  style={styles.balanceIncognito}
                /> :
                <FormattedNumber
                  type={B}
                  style={[styles.balanceNumber, styles.theme.balanceNumber]}
                >
                  {fromRawLsk(accounts.active.balance || 0)}
                </FormattedNumber>
              }
            </View>

            <AmountInput
              reference={(el) => { this.input = el; }}
              autoFocus={!isAndroid}
              label="Amount (LSK)"
              value={value}
              onChange={this.onChange}
              keyboardType="numeric"
              currency={currency}
              valueInCurrency={valueInCurrency}
              error={validity === 1 ? 'Invalid amount value' : ''}
            />
           </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Amount, getStyles());
