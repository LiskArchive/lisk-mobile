import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { fromRawLsk } from '../../../utilities/conversions';
import reg from '../../../constants/regex';
import transactions from '../../../constants/transactions';
import { merge } from '../../../utilities/helpers';
import Balance from './balance';
import Input from './input';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { deviceType } from '../../../utilities/device';
import DropDownHolder from '../../../utilities/alert';

const isAndroid = deviceType() === 'android';

class AmountLSK extends React.Component {
  state = {
    amount: {
      value: '',
      normalizedValue: '',
    },
  };

  componentDidMount() {
    const { sharedData, pricesRetrieved } = this.props;

    pricesRetrieved();

    if (sharedData.amount) {
      this.onChange(sharedData.amount);
    }

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  validator = (str) => {
    const { t, accounts, settings: { token } } = this.props;

    if (str === '' || parseFloat(str) === 0) {
      return {
        code: -1,
        message: t('Please enter an amount.'),
      };
    }

    let message = '';

    if (!reg.amount.test(str)) {
      message = t('The amount value is invalid.');
    } else if (
      accounts.info[token.active].balance < transactions.send.fee ||
      parseFloat(str) > fromRawLsk(accounts.info[token.active].balance - transactions.send.fee)
    ) {
      message = t('Your balance is not sufficient.');
    }

    return ({
      code: message ? 1 : 0,
      message,
    });
  };

  onChange = (value) => {
    const normalizedValue = value.replace(/[^0-9]/g, '.');

    this.setState({
      amount: {
        value,
        normalizedValue,
      },
    });
  }

  onSubmit = () => {
    const { t, nextStep, sharedData } = this.props;
    const { amount } = this.state;
    const validity = this.validator(amount.normalizedValue);

    if (validity.code === 0) {
      DropDownHolder.closeAlert();

      return nextStep(merge(sharedData, {
        amount: amount.normalizedValue,
        fee: transactions.send.fee,
      }));
    }

    return DropDownHolder.error(t('Error'), validity.message);
  }

  getValueInCurrency() {
    const { priceTicker, settings: { currency, token } } = this.props;
    const { amount: { value, normalizedValue } } = this.state;

    let valueInCurrency = 0;

    if (value && this.validator(normalizedValue).code === 0 &&
      priceTicker[token.active][currency]) {
      valueInCurrency = (normalizedValue * priceTicker[token.active][currency]).toFixed(2);
      valueInCurrency = valueInCurrency === 'NaN' ? 0 : valueInCurrency;
    }

    return valueInCurrency;
  }

  render() {
    const {
      accounts, styles, t, settings,
    } = this.props;
    const { amount } = this.state;

    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: t('Continue'),
            type: 'inBox',
          }}
        >
          <View>

            <Balance
              value={fromRawLsk(accounts.info[settings.token.active].balance)}
              tokenType={settings.token.active}
              incognito={settings.incognito}
            />

            <Input
              reference={(el) => { this.input = el; }}
              autoFocus={!isAndroid}
              label={t('Amount (LSK)', { tokenType: 'LSK' })}
              value={amount.value}
              onChange={this.onChange}
              keyboardType='numeric'
              currency={settings.currency}
              valueInCurrency={this.getValueInCurrency()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(AmountLSK), getStyles());
