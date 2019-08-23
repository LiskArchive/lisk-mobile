import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { BigNumber } from 'bignumber.js';
import KeyboardAwareScrollView from '../../../../shared/toolBox/keyboardAwareScrollView';
import { includeFee, fromRawLsk } from '../../../../../utilities/conversions';
import { merge } from '../../../../../utilities/helpers';
import Balance from './balance';
import Input from './input';
import DynamicFeeSelector from './dynamicFeeSelector';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import { deviceType } from '../../../../../utilities/device';
import * as btcTransactionsAPI from '../../../../../utilities/api/btc/transactions';
import reg from '../../../../../constants/regex';
import DropDownHolder from '../../../../../utilities/alert';

const isAndroid = deviceType() === 'android';

class AmountBTC extends React.Component {
  state = {
    fee: 0,
    unspentTransactionOutputs: [],
    dynamicFeeType: 'Low', // ['Low', 'Medium', 'High']
    amount: {
      value: '',
      normalizedValue: '',
    },
  };

  componentDidMount() {
    const { sharedData, pricesRetrieved, dynamicFeesRetrieved } = this.props;

    pricesRetrieved();
    dynamicFeesRetrieved();
    this.retrieveUnspentTransactionOutputs();

    if (sharedData.amount) {
      this.onAmountChange(sharedData.amount);
    }

    if (sharedData.dynamicFeeType) {
      this.onDynamicFeeChange(sharedData.dynamicFeeType);
    }

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  retrieveUnspentTransactionOutputs() {
    const { accounts, settings: { token } } = this.props;

    btcTransactionsAPI
      .getUnspentTransactionOutputs(accounts.info[token.active].address)
      .then(data => this.setState({ unspentTransactionOutputs: data }))
      .catch(() => this.setState({ unspentTransactionOutputs: [] }));
  }

  validateAmount = (amount) => {
    const { t } = this.props;
    const { normalizedValue } = amount;

    if (normalizedValue === '' || parseFloat(normalizedValue) === 0) {
      return {
        code: -1,
        message: t('Please enter an amount.'),
      };
    }

    if (!reg.amount.test(normalizedValue)) {
      return {
        code: 1,
        message: t('The amount value is invalid.'),
      };
    }

    return { code: 0 };
  }

  validateBalance = (amount, fee) => {
    const amountValidation = this.validateAmount(amount);

    if (amountValidation.code !== 0) {
      return amountValidation;
    }

    const { t, accounts, settings: { token } } = this.props;
    const balance = new BigNumber(accounts.info[token.active].balance);
    const total = includeFee(amount.value, fee, true);

    if (balance.isLessThan(total)) {
      return {
        code: 1,
        message: t('Your balance is not sufficient.'),
      };
    }

    return { code: 0 };
  }

  onAmountChange = (value) => {
    const normalizedValue = value.replace(/[^0-9]/g, '.');
    value = value.replace(/,/g, '.');

    this.setState({
      amount: {
        value,
        normalizedValue,
      },
    });
  }

  onDynamicFeeChange = (type) => {
    this.setState({ dynamicFeeType: type });
  }

  onSubmit = () => {
    const {
      t, nextStep, sharedData, dynamicFees,
    } = this.props;
    const { amount, dynamicFeeType } = this.state;

    const dynamicFeePerByte = dynamicFees[dynamicFeeType];
    const fee = this.getCalculatedDynamicFee(dynamicFeePerByte);
    const balanceValidity = this.validateBalance(amount, fee);

    if (balanceValidity.code === 0) {
      DropDownHolder.closeAlert();

      return nextStep(merge(sharedData, {
        amount: amount.normalizedValue,
        fee,
        dynamicFeeType,
        dynamicFeePerByte,
      }));
    }

    return DropDownHolder.error(t('Error'), balanceValidity.message);
  }

  getValueInCurrency() {
    const { priceTicker, settings: { currency, token } } = this.props;
    const { amount } = this.state;
    const amountValidity = this.validateAmount(amount);

    let valueInCurrency = 0;

    if (amountValidity.code === 0 && priceTicker[token.active][currency]) {
      valueInCurrency = (amount.normalizedValue * priceTicker[token.active][currency]).toFixed(2);
      valueInCurrency = valueInCurrency === 'NaN' ? 0 : valueInCurrency;
    }

    return valueInCurrency;
  }

  getUnspentTransactionOutputCountToConsume() {
    const { unspentTransactionOutputs, amount: { normalizedValue } } = this.state;

    const amount = new BigNumber(normalizedValue);
    const [count] = unspentTransactionOutputs.reduce((result, output) => {
      if (amount.isGreaterThan(result[1])) {
        result[0] += 1;
        result[1] = result[1].plus(fromRawLsk(output.value));
      }

      return result;
    }, [0, new BigNumber(0)]);

    return count;
  }

  getCalculatedDynamicFee = (dynamicFeePerByte) => {
    if (this.validateAmount(this.state.amount).code !== 0) {
      return 0;
    }

    const feeInSatoshis = btcTransactionsAPI.calculateTransactionFee({
      inputCount: this.getUnspentTransactionOutputCountToConsume(),
      outputCount: 2,
      dynamicFeePerByte,
    });

    return feeInSatoshis;
  }

  render() {
    const {
      accounts, styles, t, settings, dynamicFees,
    } = this.props;
    const { amount, dynamicFeeType } = this.state;
    const balance = fromRawLsk(accounts.info[settings.token.active].balance);

    return (
      <View style={[styles.theme.wrapper, styles.wrapper]}>
        <KeyboardAwareScrollView
          viewIsInsideTab
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          button={{
            title: t('Continue'),
          }}
        >
          <View>

            <Balance
              value={balance}
              tokenType={settings.token.active}
              incognito={settings.incognito}
            />

            <Input
              reference={(el) => { this.input = el; }}
              autoFocus={!isAndroid}
              label={t('Amount (LSK)', { tokenType: 'BTC' })}
              value={amount.value}
              onChange={this.onAmountChange}
              keyboardType='numeric'
              currency={settings.currency}
              valueInCurrency={this.getValueInCurrency()}
            />

            <DynamicFeeSelector
              value={this.getCalculatedDynamicFee(dynamicFees[dynamicFeeType])}
              data={dynamicFees}
              selected={dynamicFeeType}
              onChange={this.onDynamicFeeChange}
              tokenType={settings.token.active}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(AmountBTC), getStyles());
