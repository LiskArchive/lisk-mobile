/* eslint-disable no-shadow */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { TextEncoder } from 'text-encoding';
import { transactions } from '@liskhq/lisk-client';
import KeyboardAwareScrollView from 'components/shared/toolBox/keyboardAwareScrollView';
import { fromRawLsk, toRawLsk } from 'utilities/conversions';
import { isNumeric, merge, validateAmount } from 'utilities/helpers';
import * as apiClient from 'utilities/api';
import * as transactionConstants from 'modules/Transactions/constants';
import withTheme from 'components/shared/withTheme';
import DropDownHolder from 'utilities/alert';
import { languageMap } from 'constants/languages';
import { useTransactionFeeCalculation } from '../../hooks/transactionFee';
import { createTransactionObject } from '../../utils';
import Balance from './balance';
import Input from './input';
import getStyles from './styles';
import Priority from './priority';
import Message from './message';
import { useCurrentAccountDetails } from '../../../Accounts/hooks/useAccounts/useCurrentAccountDetails';

const calculateDynamicFee = (priority, feePerByte, size, minFee, maxAssetFee) => {
  // tie breaker is only meant for medium and high processing speeds
  const tieBreaker = priority === 'Low' ? 0 : transactionConstants.MIN_FEE_PER_BYTE * feePerByte * Math.random();
  const calculatedFee = Number(minFee) + size * feePerByte + tieBreaker;
  const cappedFee = Math.min(calculatedFee, maxAssetFee);
  return Number(cappedFee).toFixed(7).toString();
};

const AmountLSK = (props) => {
  const [state, setState] = useState({
    fee: 0,
    amount: '',
    errorMessage: ''
  });
  const [priority, setPriority] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(0);
  const [isPriorityFetched, setIsPriorityFetched] = useState(false);
  const [isMaximum, setIsMaximum] = useState(false);
  const [reference, setReference] = useState({
    value: '',
    validity: -1
  });

  const {
    styles, t, settings, language, priceTicker
  } = props;
  const { amount } = state;
  const account = useCurrentAccountDetails();

  const { validity, value } = reference;

  const priorityOptions = priority || transactionConstants.DEFAULT_PRIORITY;

  const { fee, maxAmount } = useTransactionFeeCalculation({
    selectedPriority: priorityOptions[selectedPriority],
    token: settings.token.active,
    account,
    priorityOptions,
    transaction: {
      moduleAssetId: transactionConstants.moduleAssetNameIdMap.transfer,
      amount: state.amount,
      nonce: account.nonce,
      senderPublicKey: Buffer.alloc(32),
      data: reference.value
    },
    selectedPriorityIndex: selectedPriority
  });

  const messageValidator = (str) => {
    const uint8array = new TextEncoder().encode(str);
    return uint8array.length > 64 ? 1 : 0;
  };

  const onChangeMessage = (text) =>
    setReference({
      value: text,
      validity: messageValidator(text)
    });

  const onChange = (text, isMaximum) => {
    const { language, t } = props;
    try {
      setIsMaximum(!!isMaximum);
      if (language === languageMap.en.code) {
        text = text.replace(/,/g, '.');
      } else {
        text = text.replace(/\./g, ',');
      }
      transactions.convertLSKToBeddows(text);
      if (!isNumeric(text)) {
        throw Error(`Invalid amount ${text}`);
      }
      setState((prevState) => ({
        ...prevState,
        amount: text,
        errorMessage: '',
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        amount: text,
        errorMessage: t('Provide a correct amount of LSK')
      }));
    }
  };

  const setMaximumValue = () => {
    setIsMaximum(true);
    onChange(fromRawLsk(maxAmount.value), true);
  };

  useEffect(() => {
    if (isMaximum) {
      onChange(fromRawLsk(maxAmount.value), true);
    }
  }, [isMaximum, fee.value, maxAmount.value, reference.value]);

  const loadInitialData = () => {
    const { sharedData } = props;
    if (sharedData.amount) {
      onChange(sharedData.amount);
    }
    if (sharedData.reference) {
      onChangeMessage(sharedData.reference);
    }
  };

  const getDynamicFees = async () => {
    const result = await apiClient.service.getDynamicFees('LSK');
    if (result && (result.Low || result.Medium || result.High)) {
      const priorityFees = [
        { title: 'Low', amount: result.Low },
        { title: 'Medium', amount: result.Medium },
        { title: 'High', amount: result.High }
      ];
      setPriority(priorityFees);
    } else {
      setPriority(null);
    }
    setIsPriorityFetched(true);
  };

  useEffect(() => {
    const { pricesRetrieved, dynamicFeesRetrieved } = props;
    pricesRetrieved();
    dynamicFeesRetrieved();
    loadInitialData();
    getDynamicFees();
  }, []);

  const getRawTransaction = (amount, message) => {
    return createTransactionObject(account.nonce, amount, message);
  };

  const getFee = (amount) => {
    if (amount && !validateAmount(amount)) return 0;
    const rawTrx = getRawTransaction(amount, reference.value);
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
    const { amount } = state;
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
      account.balance
      && (account.balance < fee
        // eslint-disable-next-line no-undef
        || parseFloat(str) > fromRawLsk(BigInt(account.balance) - fee))
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
    const { amount, errorMessage } = state;
    if (errorMessage !== '') return;
    const transactionPriority = priority ? priority[selectedPriority] : null;
    if (!amount) {
      setState(prevState => ({
        ...prevState,
        errorMessage: t('Provide a correct amount of LSK')
      }));
      return;
    }
    if (account.balance - toRawLsk(amount) - toRawLsk(fee.value)
      < transactionConstants.DEFAULT_MIN_REMAINING_BALANCE) {
      DropDownHolder.error(t('Error'), t('Your balance is not sufficient.'));
      return;
    }
    if (messageValidator(reference.value) === 0) {
      DropDownHolder.closeAlert();
      nextStep(
        merge(sharedData, {
          reference: reference.value,
          amount,
          fee: toRawLsk(fee.value),
          priority: transactionPriority && transactionPriority.title
        })
      );
      return;
    }
    DropDownHolder.error(t('Error'), validity.message);
  };

  const localizeAmount = (amount) => {
    const { language } = props;
    return Number(amount).toLocaleString(`${language}-${language?.toUpperCase()}`, {
      maximumFractionDigits: 20
    });
  };

  const getValueInCurrency = () => {
    const {
      priceTicker,
      settings: { currency }
    } = props;
    const { amount } = state;
    let valueInCurrency = 0;
    // eslint-disable-next-line no-undef
    if (amount && validator(amount, BigInt(0)).code === 0 && priceTicker.LSK[currency]) {
      valueInCurrency = (amount * priceTicker.LSK[currency]).toFixed(2);
      valueInCurrency = valueInCurrency === 'NaN' ? 0 : valueInCurrency;
    }
    return localizeAmount(valueInCurrency);
  };

  const getBalanceInCurrency = () => {
    const {
      priceTicker, settings, language
    } = props;
    const token = settings?.token?.active;
    const ratio = priceTicker[token][settings?.currency];
    if (ratio) {
      return (fromRawLsk(account?.balance) * ratio).toLocaleString(
        `${language}-${language?.toUpperCase()}`,
        { maximumFractionDigits: 2 }
      );
    }
    return 0;
  };

  const onChangePriority = (i) => {
    setSelectedPriority(i);
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
        buttonTestID="submit-button"
      >
        <View>
          <Balance
            value={fromRawLsk(account.balance)}
            tokenType={settings.token.active}
            discrete={settings.discrete}
            language={language}
            currency={settings.currency}
            valueInCurrency={getBalanceInCurrency()}
            priceTicker={priceTicker}
          />
          <Input
            autoFocus={true}
            label={t('Amount (LSK)', { tokenType: 'LSK' })}
            sendMaximumLabel={t('Send maximum amount')}
            sendMaximum={setMaximumValue}
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
            transactionFee={fee.value}
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

export default withTheme(connect(mapStateToProps)(translate()(AmountLSK)), getStyles());
