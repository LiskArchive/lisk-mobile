import React from 'react';
import { View } from 'react-native';
import liskService from '../../../utilities/api/liskService';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import transactions from '../../../constants/transactions';
import { fromRawLsk } from '../../../utilities/conversions';
import { B, P, H1 } from '../../toolBox/typography';
import FormattedNumber from '../../formattedNumber';
import reg from '../../../constants/regex';
import { merge } from '../../../utilities/helpers';
import AmountInput from './input';
import withTheme from '../../withTheme';
import getStyles from './styles';

class Amount extends React.Component {
  maxLSKSupply = 125000000;
  maxLength = 10
  state = {
    amount: {
      value: '',
      normalizedValue: '',
      validity: -1,
    },
    priceTicker: {},
  };

  validator = (str) => {
    const { accounts } = this.props;
    if (str === '') return -1;
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

    const normalizedValue = value.replace(/[^0-9]/g, '.');

    this.setState({
      amount: {
        value,
        normalizedValue,
        validity: this.validator(normalizedValue),
      },
    });
  }

  onSubmit = () => {
    this.props.nextStep(merge(this.props.sharedData, {
      amount: this.state.amount.value,
    }));
  }

  render() {
    const { styles, accounts, currency } = this.props;
    const {
      amount: { value, normalizedValue, validity },
      priceTicker,
    } = this.state;

    let valueInCurrency = 0;

    if (value && priceTicker[currency]) {
      valueInCurrency = (normalizedValue * priceTicker[currency]).toFixed(2);
    }

    return (
      <View style={styles.theme.wrapper}>
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
                  {fromRawLsk(accounts.active.balance || 0)}
                </FormattedNumber>
              </B>
            </View>

            <View style={styles.form}>
              <AmountInput
                autoFocus={true}
                label="Amount (LSK)"
                value={value}
                onChange={this.onChange}
                keyboardType="numeric"
                currency={currency}
                valueInCurrency={valueInCurrency}
                error={validity === 1 ? 'Invalid amount value' : ''}
              />
            </View>
           </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Amount, getStyles());
