/* eslint-disable max-lines */
/* eslint-disable no-undef */
import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { TextEncoder } from 'text-encoding';
import { transactions } from '@liskhq/lisk-client';
import KeyboardAwareScrollView from '../../../../shared/toolBox/keyboardAwareScrollView';
import { fromRawLsk, toRawLsk } from '../../../../../utilities/conversions';
import { merge, validateAmount } from '../../../../../utilities/helpers';
import * as apiClient from '../../../../../utilities/api';
import Balance from './balance';
import Input from './input';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import { deviceType } from '../../../../../utilities/device';
import DropDownHolder from '../../../../../utilities/alert';
import { languageMap } from '../../../../../constants/languages';
import * as transactionConstants from '../../../../../constants/transactions';
import Priority from './priority';
import Message from './message';

const isAndroid = deviceType() === 'android';
const DEFAULT_MIN_REMAINING_BALANCE = '5000000';
const minFeePerByte = 1000;

const createTransactionObject = (nonce, amount = 0, message = '') => ({
  moduleID: 2,
  assetID: 0,
  nonce: BigInt(nonce),
  senderPublicKey: Buffer.alloc(32),
  asset: {
    amount: BigInt(toRawLsk(Number(amount))),
    recipientAddress: Buffer.alloc(20),
    data: message
  },
  signatures: []
});

const calculateDynamicFee = (priority, feePerByte, size, minFee, maxAssetFee) => {
  // tie breaker is only meant for medium and high processing speeds
  const tieBreaker = priority === 'Low' ? 0 : minFeePerByte * feePerByte * Math.random();
  const calculatedFee = Number(minFee) + size * feePerByte + tieBreaker;
  const cappedFee = Math.min(calculatedFee, maxAssetFee);
  return Number(cappedFee).toFixed(7).toString();
};

@connect((state) => ({
  language: state.settings.language,
  priceTicker: state.service.priceTicker
}))
class AmountLSK extends React.Component {
  state = {
    fee: 0,
    amount: '',
    errorMessage: '',
    reference: {
      value: '',
      validity: -1,
      wrapperStyle: {}
    },
    priority: null,
    selectedPriority: 0,
    isPriorityFetched: false
  };

  componentDidMount() {
    const { sharedData, pricesRetrieved, dynamicFeesRetrieved } = this.props;
    pricesRetrieved();
    dynamicFeesRetrieved();
    if (sharedData.amount) {
      this.onChange(sharedData.amount);
    }
    if (sharedData.reference) {
      this.onChangeMessage(sharedData.reference)
      this.setState()
    }
    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
    this.getDynamicFees();
  }

  getRawTransaction = (amount, message = '') => {
    const { accounts, settings } = this.props;
    return createTransactionObject(accounts.info[settings.token.active].nonce, amount, message);
  };

  getFee = (amount) => {
    if (amount && !validateAmount(amount)) return 0;
    const rawTrx = this.getRawTransaction(amount, this.state.reference.value);
    const minFee = transactions.computeMinFee(transactionConstants.transferAssetSchema, rawTrx);
    return minFee;
  };

  getPriorityFee = (amount, priority, priorityFeePerByte) => {
    if (this.state.errorMessage !== '') return;
    const rawTrx = this.getRawTransaction(amount);
    const minFee = this.getFee(amount);
    const size = transactions.getBytes(transactionConstants.transferAssetSchema, rawTrx).length;
    const moduleAssetId = `${rawTrx.moduleID}:${rawTrx.assetID}`;
    const maxAssetFee = transactionConstants.transactions[moduleAssetId].fee;
    return calculateDynamicFee(priority, priorityFeePerByte, size, minFee, maxAssetFee);
  };

  getDynamicFees = async () => {
    const result = await apiClient.service.getDynamicFees('LSK');
    if (result && result.Low) {
      const priorityFees = [
        { title: 'Low', amount: result.Low },
        { title: 'Medium', amount: result.Medium },
        { title: 'High', amount: result.High }
      ];
      this.setState({
        priority: priorityFees,
        isPriorityFetched: true
      });
    } else {
      this.setState({ priority: null, isPriorityFetched: true });
    }
  };

  getFeePriority = () => {
    const { priority, amount } = this.state;
    if (priority) {
      return priority.map((p) => ({
        ...p,
        amount: this.getPriorityFee(amount, p.title, p.amount)
      }));
    }
    return null;
  };

  onChangeMessage = (value) =>
    this.setState({
      reference: {
        value,
        validity: this.messageValidator(value)
      }
    });

  validator = (str, fee) => {
    const {
      t,
      accounts,
      settings: { token }
    } = this.props;
    if (str === '' || parseFloat(str) === 0) {
      return {
        code: -1,
        message: t('Please enter an amount.')
      };
    }
    let message = '';
    if (!validateAmount(str)) {
      message = t('The amount value is invalid.');
    } else if (
      accounts.info[token.active].balance < fee
      || parseFloat(str) > fromRawLsk(BigInt(accounts.info[token.active].balance) - fee)
    ) {
      message = t('Your balance is not sufficient.');
    }
    return {
      code: message ? 1 : 0,
      message
    };
  };

  onChange = (value) => {
    const { language, t } = this.props;
    let errorMessage = '';
    if (value && !validateAmount(value)) {
      errorMessage = t('Provide a correct amount of LSK');
    }
    if (language === languageMap.en.code) {
      value = value.replace(/,/g, '.');
    } else {
      value = value.replace(/\./g, ',');
    }
    this.setState({
      amount: value,
      errorMessage
    });
  };

  onSubmit = () => {
    const { t, nextStep, sharedData } = this.props;
    const {
      amount, selectedPriority, priority, reference, errorMessage
    } = this.state;
    if (errorMessage !== '') return;
    const fee = priority ? priority[selectedPriority].amount : this.getFee(amount);
    const transactionPriority = priority ? priority[selectedPriority] : null;
    const validity = this.validator(amount, fee);
    if (validity.code === 0 && this.messageValidator(reference.value) === 0) {
      DropDownHolder.closeAlert();
      // eslint-disable-next-line consistent-return
      return nextStep(
        merge(sharedData, {
          reference: reference.value,
          amount,
          fee,
          priority: transactionPriority && transactionPriority.title
        })
      );
    }
    // eslint-disable-next-line consistent-return
    return DropDownHolder.error(t('Error'), validity.message);
  };

  messageValidator = (str) => {
    const uint8array = new TextEncoder().encode(str);
    return uint8array.length > 64 ? 1 : 0;
  };

  localizeAmount = (amount) => {
    const { language } = this.props;
    return Number(amount).toLocaleString(`${language}-${language.toUpperCase()}`, {
      maximumFractionDigits: 20
    });
  };

  getValueInCurrency() {
    const {
      priceTicker,
      settings: { currency, token }
    } = this.props;
    const { amount } = this.state;
    let valueInCurrency = 0;
    if (
      amount
      && this.validator(amount, BigInt(0)).code === 0
      && priceTicker[token.active][currency]
    ) {
      valueInCurrency = (amount * priceTicker[token.active][currency]).toFixed(2);
      valueInCurrency = valueInCurrency === 'NaN' ? 0 : valueInCurrency;
    }
    return this.localizeAmount(valueInCurrency);
  }

  getBalanceInCurrency() {
    const {
      priceTicker, settings, accounts, language
    } = this.props;
    const token = settings?.token?.active;
    const ratio = priceTicker[token][settings?.currency];
    if (ratio) {
      return (fromRawLsk(accounts.info[settings?.token?.active]?.balance) * ratio).toLocaleString(
        `${language}-${language.toUpperCase()}`,
        { maximumFractionDigits: 2 }
      );
    }
    return 0;
  }

  sendMaximum = () => {
    const { accounts, settings } = this.props;
    const balance = accounts.info[settings.token.active].balance;
    const maximumFee = this.getFee(balance);
    const maximumBalance = BigInt(balance) - maximumFee - BigInt(DEFAULT_MIN_REMAINING_BALANCE);
    this.onChange(fromRawLsk(maximumBalance).toString());
  };

  onChangePriority = (i) => {
    this.setState({ selectedPriority: i });
  };

  render() {
    const {
      accounts, styles, t, settings, language, priceTicker
    } = this.props;
    const {
      amount,
      reference: { validity, value },
      selectedPriority,
      isPriorityFetched
    } = this.state;

    const byteCount = encodeURI(value).split(/%..|./).length - 1;

    return (
      <View style={[styles.theme.wrapper, styles.wrapper]}>
        <KeyboardAwareScrollView
          viewIsInsideTab
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          button={{
            title: t('Continue')
          }}
          disabled={!isPriorityFetched || this.state.errorMessage}
        >
          <View>
            <Balance
              value={fromRawLsk(accounts.info[settings.token.active].balance)}
              tokenType={settings.token.active}
              incognito={settings.incognito}
              language={language}
              currency={settings.currency}
              valueInCurrency={this.getBalanceInCurrency()}
              priceTicker={priceTicker}
            />
            <Input
              reference={(el) => {
                this.input = el;
              }}
              autoFocus={!isAndroid}
              label={t('Amount (LSK)', { tokenType: 'LSK' })}
              sendMaximumLabel={t('Send maximum amount')}
              sendMaximum={this.sendMaximum}
              value={amount}
              onChange={this.onChange}
              keyboardType="numeric"
              currency={settings.currency}
              valueInCurrency={this.getValueInCurrency()}
              errorMessage={this.state.errorMessage}
            />
            <Priority
              fees={this.getFeePriority()}
              selected={selectedPriority}
              onChange={this.onChangePriority}
              transactionFee={fromRawLsk(this.getFee(amount))}
            />
            <Message
              value={value}
              onChange={this.onChangeMessage}
              byteCount={byteCount}
              validity={validity}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(AmountLSK), getStyles());
