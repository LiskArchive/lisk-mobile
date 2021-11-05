/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
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
import useTransactionFeeCalculation from '../../../../../hooks/transactionFee/useTransactionFeeCalculation';

const isAndroid = deviceType() === 'android';

const createTransactionObject = (nonce, amount = 0, message = '') => ({
  moduleID: 2,
  assetID: 0,
  // eslint-disable-next-line no-undef
  nonce: BigInt(nonce),
  senderPublicKey: Buffer.alloc(32),
  asset: {
    // eslint-disable-next-line no-undef
    amount: BigInt(toRawLsk(Number(amount))),
    recipientAddress: Buffer.alloc(20),
    data: message
  },
  signatures: []
});

const calculateDynamicFee = (priority, feePerByte, size, minFee, maxAssetFee) => {
  // tie breaker is only meant for medium and high processing speeds
  const tieBreaker = priority === 'Low' ? 0 : transactionConstants.MIN_FEE_PER_BYTE * feePerByte * Math.random();
  const calculatedFee = Number(minFee) + size * feePerByte + tieBreaker;
  const cappedFee = Math.min(calculatedFee, maxAssetFee);
  return Number(cappedFee).toFixed(7).toString();
};

const AmountLSK = (props) => {
  const inputRef = useRef();
  const [state, setState] = useState({
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
  });

  const {
    accounts, styles, t, settings, language, priceTicker
  } = props;
  const {
    amount,
    reference: { validity, value },
    selectedPriority,
    isPriorityFetched
  } = state;

  const priorityOptions = state.priority ? state.priority : transactionConstants.DEFAULT_PRIORITY;

  const { fee, maxAmount, minFee } = useTransactionFeeCalculation({
    selectedPriority: priorityOptions[state.selectedPriority],
    token: 'LSK',
    account: accounts.info[settings.token.active],
    priorityOptions,
    transaction: {
      moduleAssetId: transactionConstants.moduleAssetNameIdMap.transfer,
      amount: state.amount,
      nonce: accounts.info[settings.token.active].nonce,
      senderPublicKey: Buffer.alloc(32),
      data: state.reference.value,
    },
    selectedPriorityIndex: state.selectedPriority
  });

  console.log('fee.value', fee.value);

  const messageValidator = (str) => {
    const uint8array = new TextEncoder().encode(str);
    return uint8array.length > 64 ? 1 : 0;
  };

  const onChangeMessage = (value) =>
    setState((prevState) => ({
      ...prevState,
      reference: {
        value,
        validity: messageValidator(value)
      }
    }));

  const onChange = (value) => {
    const { language, t } = props;
    let errorMessage = '';
    if (value && !validateAmount(value)) {
      errorMessage = t('Provide a correct amount of LSK');
    }
    if (language === languageMap.en.code) {
      value = value.replace(/,/g, '.');
    } else {
      value = value.replace(/\./g, ',');
    }
    setState((prevState) => ({
      ...prevState,
      amount: value,
      errorMessage
    }));
  };

  function loadInitialData() {
    const { sharedData } = props;
    if (sharedData.amount) {
      onChange(sharedData.amount);
    }
    if (sharedData.reference) {
      onChangeMessage(sharedData.reference);
    }
  }

  const getDynamicFees = async () => {
    const result = await apiClient.service.getDynamicFees('LSK');
    if (result && result.Low) {
      const priorityFees = [
        { title: 'Low', amount: result.Low },
        { title: 'Medium', amount: result.Medium },
        { title: 'High', amount: result.High }
      ];
      setState((prevState) => ({
        ...prevState,
        priority: priorityFees,
        isPriorityFetched: true
      }));
    } else {
      setState((prevState) => ({ ...prevState, priority: null, isPriorityFetched: true }));
    }
  };

  useEffect(() => {
    const { pricesRetrieved, dynamicFeesRetrieved } = props;
    pricesRetrieved();
    dynamicFeesRetrieved();
    loadInitialData();
    if (isAndroid) {
      setTimeout(() => inputRef.current.focus(), 250);
    }
    getDynamicFees();
  }, []);

  const getRawTransaction = (amount, message) => {
    const { accounts, settings } = props;
    return createTransactionObject(accounts.info[settings.token.active].nonce, amount, message);
  };

  const getFee = (amount) => {
    if (amount && !validateAmount(amount)) return 0;
    const rawTrx = getRawTransaction(amount, state.reference.value);
    const minFee = transactions.computeMinFee(transactionConstants.transferAssetSchema, rawTrx, {
      baseFees: transactionConstants.BASE_FEES
    });
    return minFee;
  };

  const getPriorityFee = (amount, priority, priorityFeePerByte) => {
    if (amount && !validateAmount(amount)) return;
    const rawTrx = getRawTransaction(amount);
    const minFee = getFee(amount);
    const size = transactions.getBytes(transactionConstants.transferAssetSchema, rawTrx).length;
    const moduleAssetId = `${rawTrx.moduleID}:${rawTrx.assetID}`;
    const maxAssetFee = transactionConstants.transactions[moduleAssetId].fee;
    // eslint-disable-next-line consistent-return
    return calculateDynamicFee(priority, priorityFeePerByte, size, minFee, maxAssetFee);
  };

  const getFeePriority = () => {
    const { priority, amount } = state;
    if (priority) {
      return priority.map((p) => ({
        ...p,
        amount: getPriorityFee(amount, p.title, p.amount)
      }));
    }
    return null;
  };
  const validator = (str, fee) => {
    const {
      t,
      accounts,
      settings: { token }
    } = props;
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
      // eslint-disable-next-line no-undef
      || parseFloat(str) > fromRawLsk(BigInt(accounts.info[token.active].balance) - fee)
    ) {
      message = t('Your balance is not sufficient.');
    }
    return {
      code: message ? 1 : 0,
      message
    };
  };

  const onSubmit = () => {
    const { t, nextStep, sharedData } = props;
    const {
      amount, selectedPriority, priority, reference, errorMessage
    } = state;
    if (errorMessage !== '') return;
    const fee = priority ? priority[selectedPriority].amount : getFee(amount);
    const transactionPriority = priority ? priority[selectedPriority] : null;
    const validity = validator(amount, fee);
    if (validity.code === 0 && messageValidator(reference.value) === 0) {
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

  const localizeAmount = (amount) => {
    const { language } = props;
    return Number(amount).toLocaleString(`${language}-${language.toUpperCase()}`, {
      maximumFractionDigits: 20
    });
  };

  function getValueInCurrency() {
    const {
      priceTicker,
      settings: { currency, token }
    } = props;
    const { amount } = state;
    let valueInCurrency = 0;
    // eslint-disable-next-line no-undef
    if (amount && validator(amount, BigInt(0)).code === 0 && priceTicker[token.active][currency]) {
      valueInCurrency = (amount * priceTicker[token.active][currency]).toFixed(2);
      valueInCurrency = valueInCurrency === 'NaN' ? 0 : valueInCurrency;
    }
    return localizeAmount(valueInCurrency);
  }

  function getBalanceInCurrency() {
    const {
      priceTicker, settings, accounts, language
    } = props;
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

  const sendMaximum = () => {
    const { accounts, settings } = props;
    const balance = accounts.info[settings.token.active].balance;
    const maximumFee = getFee(balance);
    // eslint-disable-next-line no-undef
    const maximumBalance = BigInt(balance)
      - maximumFee
      // eslint-disable-next-line no-undef
      - BigInt(transactionConstants.DEFAULT_MIN_REMAINING_BALANCE);
    onChange(fromRawLsk(maximumBalance).toString());
  };

  const onChangePriority = (i) => {
    setState((prevState) => ({ ...prevState, selectedPriority: i }));
  };

  const byteCount = encodeURI(value).split(/%..|./).length - 1;

  return (
    <View style={[styles.theme.wrapper, styles.wrapper]}>
      <KeyboardAwareScrollView
        viewIsInsideTab
        onSubmit={onSubmit}
        styles={{ innerContainer: styles.innerContainer }}
        button={{
          title: t('Continue')
        }}
        disabled={!isPriorityFetched || state.errorMessage}
      >
        <View>
          <Balance
            value={fromRawLsk(accounts.info[settings.token.active].balance)}
            tokenType={settings.token.active}
            incognito={settings.incognito}
            language={language}
            currency={settings.currency}
            valueInCurrency={getBalanceInCurrency()}
            priceTicker={priceTicker}
          />
          <Input
            autoFocus={!isAndroid}
            label={t('Amount (LSK)', { tokenType: 'LSK' })}
            sendMaximumLabel={t('Send maximum amount')}
            sendMaximum={sendMaximum}
            value={amount}
            onChange={onChange}
            keyboardType="numeric"
            currency={settings.currency}
            valueInCurrency={getValueInCurrency()}
            errorMessage={state.errorMessage}
          />
          <Priority
            fees={getFeePriority()}
            selected={selectedPriority}
            onChange={onChangePriority}
            transactionFee={fromRawLsk(getFee(amount))}
          />
          <Message
            value={value}
            onChange={onChangeMessage}
            byteCount={byteCount}
            validity={validity}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  language: state.settings.language,
  priceTicker: state.service.priceTicker
});

export default withTheme(translate()(connect(mapStateToProps)(AmountLSK)), getStyles());
