/* eslint-disable max-lines, max-statements */
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useController } from 'react-hook-form';

import Input from 'components/shared/toolBox/input';
import Picker from 'components/shared/Picker';
import { LabelButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import { fromRawLsk } from 'utilities/conversions';
import TokenSvg from 'assets/svgs/TokenSvg';
import { useAccountInfo } from 'modules/Accounts/hooks/useAccounts/useAccountInfo';

import getSendTokenSelectTokenStepStyles from './styles';
import { useTokenAmountInCurrency } from './hooks';
import { PRIORITY_NAMES_MAP } from '../../constants';
import useTransactionPriorities from '../../hooks/useTransactionPriorities';
import useTransactionFeeCalculator from '../../hooks/useTransactionFeeCalculator';
import useInitializationFeeCalculator from '../../hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from '../../hooks/useCCMFeeCalculator';

export function TokenSelectField({
  form,
  tokens,
  t
}) {
  const currentAccountInfo = useAccountInfo();

  const { field } = useController({
    name: 'tokenID',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const normalizedBalance = fromRawLsk(currentAccountInfo.summary.balance);

  const selectedToken = tokens.data?.find(token => token.tokenID === field.value);

  return (
    <Picker
      value={field.value}
      onChange={field.onChange}
      error={form.formState.errors.tokenID?.message}
    >
      <View style={{ ...styles.row, justifyContent: 'space-between' }}>
        <Picker.Label>
          {t('sendToken.tokenSelect.tokenIDFieldLabel')}
        </Picker.Label>

        {selectedToken && (
          <Picker.Label>
            {t('sendToken.tokenSelect.tokenIDBalanceLabel')}: {' '}
            {/* TODO: Read token symbol from account info when backend send the data */}
            <Text style={[styles.balanceText]}>
              {normalizedBalance} {selectedToken.symbol}
            </Text>
          </Picker.Label>
        )}
      </View>

      <Picker.Toggle
        disabled={tokens.isLoading || tokens.error}
      >
        {tokens.isLoading ? (
          <Text>{t('sendToken.tokenSelect.loadingTokensText')}</Text>
        ) : selectedToken && (
          <View style={[styles.row]}>
            <Text style={[styles.text, styles.theme.text]}>
              {selectedToken.symbol}
            </Text>

            <TokenSvg symbol={selectedToken.symbol} style={styles.tokenSvg} />
          </View>
        )}
      </Picker.Toggle>

      <Picker.Menu>
        {tokens.data?.map(token => (
          <Picker.Item
            key={token.tokenID}
            value={token.tokenID}
          >
            <Text style={[styles.text, styles.theme.text]}>
              {token.symbol}
            </Text>

            <TokenSvg symbol={token.symbol} style={styles.tokenSvg} />
          </Picker.Item>
        ))}
      </Picker.Menu>
    </Picker>
  );
}

export function TokenAmountField({
  form,
  tokens,
  t
}) {
  const { field } = useController({
    name: 'amount',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const { tokenAmountInCurrency, currency } = useTokenAmountInCurrency(field.value);

  const selectedToken = tokens.data?.find(
    token => token.tokenID === form.watch('tokenID')
  );

  return (
    <Input
      label= {
        selectedToken ? t('sendToken.tokenSelect.tokenAmountFieldLabel',
          { selectedTokenSymbol: selectedToken.symbol || '' })
          : t('sendToken.tokenSelect.tokenAmountFieldLabelPlain')
      }
      value={field.value}
      placeholder= {
        selectedToken ? t('sendToken.tokenSelect.tokenAmountFieldPlaceholder',
          { selectedTokenSymbol: selectedToken.symbol || '' })
          : t('sendToken.tokenSelect.tokenAmountFieldPlaceholderPlain')
      }
      onChange={field.onChange}
      keyboardType="numeric"
      disabled={!selectedToken}
      error={form.formState.errors.amount?.message}
      adornments={{
        right: (
          <Text style={[styles.tokenAmountInCurrencyText]}>
            ~ {`${tokenAmountInCurrency} ${currency}`}
          </Text>
        )
      }}
      innerStyles={{
        containerStyle: {
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
          marginBottom: 16,
          marginTop: 16,
        },
        inputLabel: {
          marginBottom: 8
        },
        input: {
          padding: 16
        }
      }}
    />
  );
}

export function SendTokenDescriptionField({ form, t }) {
  const [showInput, setShowInput] = useState(false);

  const { field } = useController({
    name: 'message',
    control: form.control,
  });

  if (!showInput) {
    return (
      <LabelButton
        onClick={() => setShowInput(true)}
        style={{ width: 178 }}
        textStyle={{ fontSize: 14, lineHeight: 0, marginBottom: 16 }}
      >
        {t('sendToken.tokenSelect.messageFieldTriggerButtonText')}
      </LabelButton>
    );
  }

  return (
    <Input
      label={t('sendToken.tokenSelect.messageFieldLabel')}
      value={field.value}
      placeholder={t('sendToken.tokenSelect.messageFieldPlaceholder')}
      onChange={field.onChange}
      multiline
      innerStyles={{
        containerStyle: {
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
          marginBottom: 16
        },
        inputLabel: {
          marginBottom: 8
        },
        input: {
          padding: 16,
          minHeight: 80
        }
      }}
    />
  );
}

export function SendTokenPriorityField({ form, t }) {
  const {
    data: prioritiesData,
    isLoading: isLoadingPrioritiesData,
    error: errorOnPriorities
  } = useTransactionPriorities(form.watch('amount'), form.watch('message'));

  const { field } = useController({
    name: 'priority',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const shouldShowPrioritiesData = useMemo(
    () => prioritiesData && prioritiesData[0]?.fee,
    [prioritiesData]
  );

  if (!shouldShowPrioritiesData) {
    return null;
  }

  if (isLoadingPrioritiesData) {
    return (
      <View>
        <Text style={[styles.label]}>
          {t('sendToken.tokenSelect.priorityFieldLabel')}
        </Text>

        <Text>
          {t('sendToken.tokenSelect.loadingPrioritiesText')}
        </Text>
      </View>
    );
  }

  if (errorOnPriorities) {
    return (
      <View>
        <Text style={[styles.label, styles.theme.label]}>
          {t('sendToken.tokenSelect.priorityFieldLabel')}
        </Text>

        <Text>
          {t('sendToken.tokenSelect.errorLoadingPrioritiesText')}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[styles.label, styles.theme.label]}>
        {t('sendToken.tokenSelect.priorityFieldLabel')}
      </Text>

      <View style={[styles.row, { width: '100%' }]}>
        {prioritiesData.map(priority => (
          <TouchableOpacity
            key={priority.code}
            onPress={() => field.onChange(priority.code)}
            style={[
              styles.priorityButtonBase,
              styles[field.value === priority.code ? 'selectedPriorityButton' : 'notSelectedPriorityButton'],
              { marginRight: 8 }
            ]}
          >
            <Text style={[styles.priorityButtonText, styles.theme.priorityButtonText]}>
              {t(PRIORITY_NAMES_MAP[priority.code])}
            </Text>

            <Text style={[styles.priorityButtonFeeText, styles.theme.priorityButtonFeeText]}>
              {priority.fee} LSK
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function SendTokenTransactionFeesLabels({ form, tokens, t }) {
  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const tokenID = form.watch('tokenID');

  const selectedToken = tokens.data?.find(token => token.tokenID === tokenID);

  const transactionFee = useTransactionFeeCalculator({
    tokenID,
    amount: form.watch('amount'),
    priority: form.watch('priority'),
    message: form.watch('message'),
  });

  const initializationFee = useInitializationFeeCalculator({
    tokenID,
    recipientAccountAddress: form.watch('recipientAccountAddress'),
  });

  const cmmFee = useCCMFeeCalculator({
    senderApplicationChainID: form.watch('senderApplicationChainID'),
    recipientApplicationChainID: form.watch('recipientApplicationChainID')
  });

  return (
    <View>
      <View style={[styles.feeContainer]}>
        <Text style={[styles.text, styles.theme.text]}>
          {t('sendToken.tokenSelect.transactionFeeLabel')}
        </Text>
          <Text style={[styles.text, styles.theme.text]}>
            {transactionFee.data} {selectedToken?.symbol}
          </Text>
      </View>

      <View style={[styles.feeContainer]}>
        <Text style={[styles.text, styles.theme.text]}>
          {t('sendToken.tokenSelect.initializationFeeLabel')}
        </Text>

        {initializationFee.isLoading ? (
          <Text style={[styles.text, styles.theme.text]}>
            {t('sendToken.tokenSelect.loadingInitializationFeeText')}
          </Text>
        ) : (
          <Text style={[styles.text, styles.theme.text]}>
            {initializationFee.data} {selectedToken?.symbol}
          </Text>
        )}
      </View>

      <View style={[styles.feeContainer]}>
        <Text style={[styles.text, styles.theme.text]}>
          {t('sendToken.tokenSelect.cmmFeeLabel')}
        </Text>

        {cmmFee.isLoading ? (
          <Text style={[styles.text, styles.theme.text]}>
            {t('sendToken.tokenSelect.loadingCmmFeeText')}
          </Text>
        ) : (
          <Text style={[styles.text, styles.theme.text]}>
            {cmmFee.data} {selectedToken?.symbol}
          </Text>
        )}
      </View>
    </View>
  );
}
