/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useController } from 'react-hook-form';

import Input from 'components/shared/toolBox/input';
import Picker from 'components/shared/Picker';
import { LabelButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import { fromRawLsk } from 'utilities/conversions';
import TokenSvg from 'assets/svgs/TokenSvg';
import { useAccountInfo } from '../../../Accounts/hooks/useAccounts/useAccountInfo';

import getSendTokenSelectTokenStepStyles from './styles';
import { useTokenAmountInCurrency } from './hooks';
import { PRIORITY_NAMES_MAP } from '../../constants';
import useTransactionPriorities from '../../hooks/useTransactionPriorities';
import useTransactionFeeCalculator from '../../hooks/useTransactionFeeCalculator';
import useInitializationFeeCalculator from '../../hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from '../../hooks/useCCMFeeCalculator';

export function TokenSelectField({
  form,
  tokens
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
    <Picker value={field.value} onChange={field.onChange}>
      <View style={{ ...styles.row, justifyContent: 'space-between' }}>
        <Picker.Label>
          Token
        </Picker.Label>

        <Picker.Label>
          Bal: {' '}
          {/* TODO: Read token symbol from account info when backend send the data */}
          <Text style={[styles.balanceText]}>
            {normalizedBalance} {selectedToken?.symbol}
          </Text>
        </Picker.Label>
      </View>

      <Picker.Toggle
        disabled={tokens.isLoading || tokens.error}
        style={{ container: { marginBottom: 16 } }}
      >
        <View style={[styles.row]}>
          {tokens.isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text>{selectedToken?.symbol}</Text>
              <TokenSvg symbol={selectedToken?.symbol} style={styles.tokenSvg} />
            </>
          )}
        </View>
      </Picker.Toggle>

      <Picker.Menu>
        {tokens.data?.map(token => (
          <Picker.Item
            key={token.tokenID}
            value={token.tokenID}
          >
            <Text>{token.symbol}</Text>
            <TokenSvg symbol={token.symbol} style={styles.tokenSvg} />
          </Picker.Item>
        ))}
      </Picker.Menu>
    </Picker>
  );
}

export function TokenAmountField({
  form,
  tokens
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
      label={`Amount (${selectedToken?.symbol})`}
      value={field.value}
      placeholder={`Add your amount of ${selectedToken?.symbol}`}
      keyboardType="numeric"
      onChange={field.onChange}
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
          marginBottom: 16
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

export function SendTokenDescriptionField({ form }) {
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
        + Add message (Optional)
      </LabelButton>
    );
  }

  return (
    <Input
      label="Message (optional)"
      value={field.value}
      placeholder="Add an optional message"
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

export function SendTokenPriorityField({ form }) {
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

  if (isLoadingPrioritiesData) {
    return (
      <View>
        <Text style={[styles.label]}>Priority</Text>
        <Text>Loading priorities...</Text>
      </View>
    );
  }

  if (errorOnPriorities) {
    return (
      <View>
        <Text style={[styles.label]}>Priority</Text>
        <Text>Error loading priorities!</Text>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[styles.label]}>Priority</Text>

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
            <Text style={[styles.priorityButtonText]}>{PRIORITY_NAMES_MAP[priority.code]}</Text>

            <Text style={[styles.priorityButtonFeeText]}>{priority.fee} LSK</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function SendTokenTransactionFeesLabels({ form, tokens }) {
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

  if (transactionFee.error) {
    return <Text>Error calculating fees!</Text>;
  }

  return (
    <View>
      <View style={[styles.feeContainer]}>
        <Text>Transaction fee</Text>
        {transactionFee.isLoading ? (
          <Text>Loading transaction fee...</Text>) : (
          <Text>{transactionFee.data} {selectedToken?.symbol}</Text>
        )}
      </View>

      <View style={[styles.feeContainer]}>
        <Text>Initialization fee</Text>
        {initializationFee.isLoading ? (
          <Text>Loading initialization fee...</Text>) : (
          <Text>{initializationFee.data} {selectedToken?.symbol}</Text>
        )}
      </View>

      <View style={[styles.feeContainer]}>
        <Text>CCM fee</Text>
        {cmmFee.isLoading ? (
          <Text>Loading CCM fee...</Text>) : (
          <Text>{cmmFee.data} {selectedToken?.symbol}</Text>
        )}
      </View>
    </View>
  );
}
