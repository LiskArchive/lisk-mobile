import React from 'react';
import { View } from 'react-native';
import liskService from '../../../utilities/api/liskService';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import transactions from '../../../constants/transactions';
import { fromRawLsk } from '../../../utilities/conversions';
import { B, P, H1 } from '../../toolBox/typography';
import FormattedNumber from '../../formattedNumber';
import reg from '../../../constants/regex';
import Input from './input';
import withTheme from '../../withTheme';
import getStyles from './styles';

class Amount extends React.Component {
  maxLSKSupply = 125000000;
  maxLength = 10
  state = {
    amount: {
      value: '',
      validity: -1,
      valueInCurrency: 0,
    },
    priceTicker: {},
  };

  validate = (str) => {
    const { account } = this.props;
    if (str === '') return -1;
    return (
      reg.amount.test(str) && account &&
      account.balance > transactions.send.fee &&
      parseFloat(str) <= fromRawLsk(account.balance - transactions.send.fee)
    ) ? 0 : 1;
  };

  componentDidMount() {
    this.getPriceTicker();
  }

  getPriceTicker = () => {
    liskService.getPriceTicker()
      .then(res => this.setState({ priceTicker: res.tickers.LSK }))
      .catch(console.log); //eslint-disable-line
  }

  onChange = (value) => {
    if (value && (
      value > this.maxLSKSupply ||
      value.length > this.maxLength ||
      Number.isNaN(parseFloat(value))
    )) {
      return;
    }

    const { currency } = this.props;
    const { priceTicker } = this.state;
    let valueInCurrency = 0;

    if (priceTicker[currency]) {
      valueInCurrency = (value * priceTicker[currency]).toFixed(2);
    }

    this.setState({
      amount: {
        value,
        validity: this.validate(value),
        valueInCurrency,
      },
    });
  }

  onSubmit = () => {
    /*
    const stepData = {
      amount: this.state.amount.value,
    };
    */

    // @TODO: Call this.props.move with stepData and to
  }

  render() {
    const { styles, account, currency } = this.props;
    const { amount: { value, validity, valueInCurrency } } = this.state;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <KeyboardAwareScrollView
          disabled={validity !== 0}
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
              <H1 style={[styles.header, styles.theme.header]}>
                Send Lisk
              </H1>
              <P style={[styles.subHeader, styles.theme.subHeader]}>
                Enter the amount you want to send.
              </P>
            </View>

            <View style={[styles.balanceContainer, styles.theme.balanceContainer]}>
              <B style={[styles.balanceText, styles.theme.balanceText]}>
                {'You have '}
              </B>
              <B style={[styles.balanceNumber, styles.theme.balanceNumber]}>
                <FormattedNumber>
                  {fromRawLsk(account ? account.balance : 0)}
                </FormattedNumber>
              </B>
            </View>

            <Input
              label="AMOUNT (LSK)"
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
