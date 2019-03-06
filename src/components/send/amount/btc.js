import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { fromRawLsk } from '../../../utilities/conversions';
import { merge } from '../../../utilities/helpers';
import Header from './header';
import Balance from './balance';
import Input from './input';
import DynamicFeeSelector from './dynamicFeeSelector';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { deviceType } from '../../../utilities/device';
import * as btcTransactionsAPI from '../../../utilities/api/btc/transactions';

const isAndroid = deviceType() === 'android';

class AmountBTC extends React.Component {
  state = {
    fee: 0,
    unspentTransactionOutputs: [],
    unspentTransactionOutputCountToConsume: 0,
    dynamicFeeType: 'Low', // ['Low', 'Medium', 'High']
    amount: {
      value: '',
      normalizedValue: '',
      validity: {
        code: 0,
        message: '',
      },
    },
  };

  componentDidMount() {
    const { sharedData, pricesRetrieved, dynamicFeesRetrieved } = this.props;

    pricesRetrieved();
    dynamicFeesRetrieved();
    this.retrieveUnspentTransactionOutputs();

    if (sharedData.amount) {
      this.onChange(sharedData.amount);
    }

    if (sharedData.dynamicFeeType) {
      this.onChangeDynamicFee(sharedData.dynamicFeeType);
    }

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  retrieveUnspentTransactionOutputs() {
    const { accounts, settings: { token } } = this.props;

    btcTransactionsAPI.getUnspentTransactionOutputs(accounts.info[token.active].address)
      .then(res => this.setState({ unspentTransactionOutputs: res }))
      .catch(() => this.setState({ unspentTransactionOutputs: [] }));
  }

  validator = () => ({
    code: 0,
    message: '',
  })

  onChange = (value) => {
    const normalizedValue = value.replace(/[^0-9]/g, '.');
    const validity = this.validator(normalizedValue);
    let unspentTransactionOutputCountToConsume = 0;

    if (validity.code === 0) {
      const [count] = this.state.unspentTransactionOutputs.reduce((result, output) => {
        if (value > result[1]) {
          result[0] += 1;
          result[1] += output.value / (10 ** 8);
        }

        return result;
      }, [0, 0]);

      unspentTransactionOutputCountToConsume = count;
    }

    this.setState({
      amount: {
        value,
        normalizedValue,
        validity: -1,
      },
      unspentTransactionOutputCountToConsume,
    });
  }

  onChangeDynamicFee = (type) => {
    this.setState({
      dynamicFeeType: type,
    });
  }

  onSubmit = () => {
    const { nextStep, sharedData, dynamicFees } = this.props;
    const { amount, dynamicFeeType } = this.state;
    const validity = this.validator(amount.normalizedValue);

    if (validity.code === 0) {
      const dynamicFeePerByte = dynamicFees[dynamicFeeType];

      return nextStep(merge(sharedData, {
        amount: amount.normalizedValue,
        fee: this.calculateDynamicFee(dynamicFeePerByte),
        dynamicFeeType,
        dynamicFeePerByte,
      }));
    }

    return this.setState({
      amount: merge(amount, { validity }),
    });
  }

  getValueInCurrency() {
    const { priceTicker, settings: { currency } } = this.props;
    const { amount: { value, normalizedValue } } = this.state;

    let valueInCurrency = 0;

    if (value && this.validator(normalizedValue).code === 0 && priceTicker[currency]) {
      valueInCurrency = (normalizedValue * priceTicker[currency]).toFixed(2);
      valueInCurrency = valueInCurrency === 'NaN' ? 0 : valueInCurrency;
    }

    return valueInCurrency;
  }

  calculateDynamicFee = (dynamicFeePerByte) => {
    const { unspentTransactionOutputCountToConsume } = this.state;

    const feeInSatoshis = btcTransactionsAPI.calculateTransactionFee({
      inputCount: unspentTransactionOutputCountToConsume,
      outputCount: 2,
      dynamicFeePerByte,
    });

    return feeInSatoshis;
  }

  render() {
    const {
      accounts, styles, t,
      settings, dynamicFees,
    } = this.props;

    const {
      amount: { value, validity },
      dynamicFeeType,
    } = this.state;

    const valueInCurrency = this.getValueInCurrency();
    const dynamicFeesResolved = Object.keys(dynamicFees).length > 0;

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
            <Header />

            <Balance
              value={fromRawLsk(accounts.info[settings.token.active].balance)}
              tokenType={settings.token.active}
              incognito={settings.incognito}
            />

            <Input
              reference={(el) => { this.input = el; }}
              autoFocus={!isAndroid}
              label={t('Amount (BTC)')}
              value={value}
              onChange={this.onChange}
              keyboardType='numeric'
              currency={settings.currency}
              valueInCurrency={valueInCurrency}
              error={validity.message}
            />

            {dynamicFeesResolved ?
              <DynamicFeeSelector
                value={dynamicFeeType}
                amount={value}
                data={dynamicFees}
                onChange={this.onChangeDynamicFee}
                tokenType={settings.token.active}
                feeCalculator={this.calculateDynamicFee}
              /> : null
            }
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(AmountBTC), getStyles());
