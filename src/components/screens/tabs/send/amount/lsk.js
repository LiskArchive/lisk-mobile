import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { transactions } from '@liskhq/lisk-client';
import KeyboardAwareScrollView from '../../../../shared/toolBox/keyboardAwareScrollView';
import { fromRawLsk, toRawLsk } from '../../../../../utilities/conversions';
import reg from '../../../../../constants/regex';
import { merge } from '../../../../../utilities/helpers';
import * as apiClient from '../../../../../utilities/api';
import Balance from './balance';
import Input from './input';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import { deviceType } from '../../../../../utilities/device';
import DropDownHolder from '../../../../../utilities/alert';
import { languageMap } from '../../../../../constants/languages';
import { transferAssetSchema } from '../../../../../constants/transactions';
import Priority from './priority';
import Message from './message';

const isAndroid = deviceType() === 'android';
const DEFAULT_MIN_REMAINING_BALANCE = '5000000';

const getTransferBytesSize = (nonce, amount) =>
  transactions.getBytes(transferAssetSchema, {
    moduleID: 2,
    assetID: 0,
    // eslint-disable-next-line no-undef
    fee: BigInt(0),
    // eslint-disable-next-line no-undef
    nonce: BigInt(nonce),
    senderPublicKey: Buffer.alloc(64),
    asset: {
      // eslint-disable-next-line no-undef
      amount: BigInt(toRawLsk(Number(amount))),
      recipientAddress: Buffer.alloc(20),
      data: 'l'.repeat(64)
    },
    signatures: [Buffer.alloc(64)]
  }).length;

@connect((state) => ({
  language: state.settings.language,
  priceTicker: state.service.priceTicker
}))
class AmountLSK extends React.Component {
  state = {
    fee: 0,
    amount: {
      value: '',
      normalizedValue: ''
    },
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
    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
    this.getDynamicFees();
  }

  getDynamicFees = async () => {
    const result = await apiClient.service.getDynamicFees('LSK');
    if (result && result.Low) {
      this.setState({
        priority: [
          { title: 'Low', amount: result.Low },
          { title: 'Medium', amount: result.Medium },
          { title: 'High', amount: result.High }
        ],
        isPriorityFetched: true
      });
    } else {
      this.setState({ priority: null, isPriorityFetched: true });
    }
  };

  onChangeMessage = (value) =>
    this.setState({
      reference: {
        value,
        validity: this.validator(value)
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
    if (!reg.amount.test(str)) {
      message = t('The amount value is invalid.');
    } else if (
      accounts.info[token.active].balance < fee
      || parseFloat(str) > fromRawLsk(accounts.info[token.active].balance - fee)
    ) {
      message = t('Your balance is not sufficient.');
    }
    return {
      code: message ? 1 : 0,
      message
    };
  };

  onChange = (value) => {
    const { language } = this.props;
    const normalizedValue = value.replace(/[^0-9]/g, '.');
    if (language === languageMap.en.code) {
      value = value.replace(/,/g, '.');
    } else {
      value = value.replace(/\./g, ',');
    }
    this.setState({
      amount: {
        value,
        normalizedValue
      }
    });
  };

  getFee = (amount) => {
    const { dynamicFees, accounts, settings } = this.props;
    const size = getTransferBytesSize(accounts.info[settings.token.active].nonce, amount.value);
    const fee = size * 1000 + dynamicFees.Low * size;
    return fee;
  };

  onSubmit = () => {
    const { t, nextStep, sharedData } = this.props;
    const {
      amount, selectedPriority, priority, reference
    } = this.state;
    const fee = priority ? priority[selectedPriority].amount : this.getFee(amount);
    const transactionPriority = priority ? priority[selectedPriority] : null;
    const validity = this.validator(amount.normalizedValue, fee);
    const messageValidity = this.messageValidator(reference.value);
    if (validity.code === 0 && messageValidity === 0) {
      DropDownHolder.closeAlert();
      return nextStep(
        merge(sharedData, {
          reference: reference.value,
          amount: amount.normalizedValue,
          fee,
          priority: transactionPriority && transactionPriority.title
        })
      );
    }
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
    const {
      amount: { value, normalizedValue }
    } = this.state;
    let valueInCurrency = 0;
    if (
      value
      && this.validator(normalizedValue, 0).code === 0
      && priceTicker[token.active][currency]
    ) {
      valueInCurrency = (normalizedValue * priceTicker[token.active][currency]).toFixed(2);
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
    const maximumFee = this.getFee({
      value: balance,
      normalizedValue: balance.replace(/[^0-9]/g, '.')
    });
    const maximumBalance = balance - maximumFee - DEFAULT_MIN_REMAINING_BALANCE;
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
      priority,
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
          disabled={!isPriorityFetched}
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
              value={amount.value}
              onChange={this.onChange}
              keyboardType="numeric"
              currency={settings.currency}
              valueInCurrency={this.getValueInCurrency()}
            />
            <Priority
              fees={priority}
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
