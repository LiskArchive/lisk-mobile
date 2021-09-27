import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { transactions } from '@liskhq/lisk-client';
import KeyboardAwareScrollView from '../../../../shared/toolBox/keyboardAwareScrollView';
import { fromRawLsk } from '../../../../../utilities/conversions';
import reg from '../../../../../constants/regex';
import { merge } from '../../../../../utilities/helpers';
import Balance from './balance';
import Input from './input';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import { deviceType } from '../../../../../utilities/device';
import DropDownHolder from '../../../../../utilities/alert';
import { languageMap } from '../../../../../constants/languages';
import { transferAssetSchema } from '../../../../../constants/transactions';

const isAndroid = deviceType() === 'android';

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
      amount: BigInt(amount),
      recipientAddress: Buffer.alloc(20),
      data: 'l'.repeat(64),
    },
    signatures: [Buffer.alloc(64)],
  }).length;

@connect(state => ({
  language: state.settings.language,
}))
class AmountLSK extends React.Component {
  state = {
    fee: 0,
    amount: {
      value: '',
      normalizedValue: '',
    },
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
  }

  validator = (str, fee) => {
    const {
      t,
      accounts,
      settings: { token },
    } = this.props;

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
      accounts.info[token.active].balance < fee
      || parseFloat(str)
        > fromRawLsk(accounts.info[token.active].balance - fee)
    ) {
      message = t('Your balance is not sufficient.');
    }

    return {
      code: message ? 1 : 0,
      message,
    };
  };

  onChange = value => {
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
        normalizedValue,
      },
    });
  };

  // eslint-disable-next-line max-statements
  onSubmit = () => {
    const {
      t,
      nextStep,
      sharedData,
      dynamicFees,
      accounts,
      settings,
    } = this.props;
    const { amount } = this.state;
    const nonce = accounts.info[settings.token.active].nonce;
    const size = getTransferBytesSize(nonce, amount.value);
    const fee = size * 1000 + dynamicFees.Low * size;
    this.setState({ fee });
    const validity = this.validator(amount.normalizedValue, fee);

    if (validity.code === 0) {
      DropDownHolder.closeAlert();

      return nextStep(
        merge(sharedData, {
          amount: amount.normalizedValue,
          fee,
        })
      );
    }

    return DropDownHolder.error(t('Error'), validity.message);
  };

  localizeAmount = amount => {
    const { language } = this.props;
    return Number(amount).toLocaleString(
      `${language}-${language.toUpperCase()}`,
      {
        maximumFractionDigits: 20,
      }
    );
  };

  getValueInCurrency() {
    const {
      priceTicker,
      settings: { currency, token },
    } = this.props;
    const {
      amount: { value, normalizedValue },
    } = this.state;

    let valueInCurrency = 0;

    if (
      value
      && this.validator(normalizedValue, 0).code === 0
      && priceTicker[token.active][currency]
    ) {
      valueInCurrency = (
        normalizedValue * priceTicker[token.active][currency]
      ).toFixed(2);
      valueInCurrency = valueInCurrency === 'NaN' ? 0 : valueInCurrency;
    }

    return this.localizeAmount(valueInCurrency);
  }

  render() {
    const {
      accounts, styles, t, settings, language
    } = this.props;
    const { amount } = this.state;

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
              value={fromRawLsk(accounts.info[settings.token.active].balance)}
              tokenType={settings.token.active}
              incognito={settings.incognito}
              language={language}
            />

            <Input
              reference={el => {
                this.input = el;
              }}
              autoFocus={!isAndroid}
              label={t('Amount (LSK)', { tokenType: 'LSK' })}
              value={amount.value}
              onChange={this.onChange}
              keyboardType="numeric"
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
