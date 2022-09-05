/* eslint-disable max-lines, max-statements */
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import Input from 'components/shared/toolBox/input';
import Picker from 'components/shared/Picker';
import { LabelButton } from 'components/shared/toolBox/button';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { useTheme } from 'hooks/useTheme';
import { fromRawLsk } from 'utilities/conversions';
import TokenSvg from 'assets/svgs/TokenSvg';
import DeleteSvg from 'assets/svgs/DeleteSvg';
import InfoSvg from 'assets/svgs/InfoSvg';
import ModalHolder from 'utilities/modal';
import { useAccountInfo } from 'modules/Accounts/hooks/useAccounts/useAccountInfo';

import getSendTokenSelectTokenStepStyles, { sendTokenAmountFieldStyles, SendTokenMessageFieldStyles } from './styles';
import { useTokenAmountInCurrency } from './hooks';
import { PRIORITY_NAMES_MAP } from '../../constants';
import useTransactionPriorities from '../../hooks/useTransactionPriorities';
import useTransactionFeeCalculator from '../../hooks/useTransactionFeeCalculator';
import useInitializationFeeCalculator from '../../hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from '../../hooks/useCCMFeeCalculator';
import colors from '../../../../constants/styleGuide/colors';
import { P } from '../../../../components/shared/toolBox/typography';

export function TokenSelectField({
  form,
  tokens,
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
          {i18next.t('sendToken.tokenSelect.tokenIDFieldLabel')}
        </Picker.Label>

        {selectedToken && (
          <Picker.Label>
            {i18next.t('sendToken.tokenSelect.tokenIDBalanceLabel')}: {' '}
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
          <Text>
            {i18next.t('sendToken.tokenSelect.loadingTokensText')}
          </Text>
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
        <InfiniteScrollList
          data={tokens.data}
          keyExtractor={(item) => item.tokenID}
          renderItem={(item) => (
            <Picker.Item
              key={item.tokenID}
              value={item.tokenID}
            >
              <Text style={[styles.text, styles.theme.text]}>
                {item.symbol}
              </Text>

              <TokenSvg symbol={item.symbol} style={styles.tokenSvg} />
            </Picker.Item>
          )}
          renderSpinner
          // TODO: Integrate pagination props using react-query.
        />
      </Picker.Menu>
    </Picker>
  );
}

export function TokenAmountField({
  form,
  tokens,
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
      value={field.value && field.value.toString()}
      onChange={value => field.onChange(value && parseFloat(value))}
      keyboardType="numeric"
      disabled={!selectedToken}
      label= {
        selectedToken ? i18next.t('sendToken.tokenSelect.tokenAmountFieldLabel',
          { selectedTokenSymbol: selectedToken.symbol || '' })
          : i18next.t('sendToken.tokenSelect.tokenAmountFieldLabelPlain')
      }
      placeholder= {
        selectedToken ? i18next.t('sendToken.tokenSelect.tokenAmountFieldPlaceholder',
          { selectedTokenSymbol: selectedToken.symbol || '' })
          : i18next.t('sendToken.tokenSelect.tokenAmountFieldPlaceholderPlain')
      }
      error={form.formState.errors.amount?.message}
      adornments={{
        right: (
          <Text style={[styles.tokenAmountInCurrencyText]}>
            ~ {`${tokenAmountInCurrency} ${currency}`}
          </Text>
        )
      }}
      innerStyles={sendTokenAmountFieldStyles}
    />
  );
}

export function SendTokenMessageField({ form }) {
  const [showInput, setShowInput] = useState(false);

  const { field } = useController({
    name: 'message',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  function handleOpenInfoModal() {
    ModalHolder.open({
      title: 'Bytes Counter',
      component: () => <P>blabla</P>
    });
  }

  if (!showInput) {
    return (
      <LabelButton
        onClick={() => setShowInput(true)}
        style={{ width: 178 }}
        textStyle={{ fontSize: 14, lineHeight: 0, marginBottom: 16 }}
      >
        {i18next.t('sendToken.tokenSelect.messageFieldTriggerButtonText')}
      </LabelButton>
    );
  }

  return (
    <Input
      label={
        <View style={[styles.row, { justifyContent: 'space-between', width: '100%' }]}>
          <View style={[styles.row]}>
            <P style={[styles.messageLabel, styles.theme.messageLabel]}>
              {i18next.t('sendToken.tokenSelect.messageFieldLabel')}
            </P>

            <TouchableOpacity onPress={handleOpenInfoModal}>
              <InfoSvg />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setShowInput(false)}>
            <DeleteSvg color={colors.light.ultramarineBlue} height={16}/>
          </TouchableOpacity>
        </View>
      }
      value={field.value}
      placeholder={i18next.t('sendToken.tokenSelect.messageFieldPlaceholder')}
      onChange={field.onChange}
      multiline
      innerStyles={SendTokenMessageFieldStyles}
    />
  );
}

export function SendTokenPriorityField({ form }) {
  const {
    data: prioritiesData,
    isLoading: isLoadingPrioritiesData,
    error: errorOnPriorities
  } = useTransactionPriorities();

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
          {i18next.t('sendToken.tokenSelect.priorityFieldLabel')}
        </Text>

        <Text>
          {i18next.t('sendToken.tokenSelect.loadingPrioritiesText')}
        </Text>
      </View>
    );
  }

  if (errorOnPriorities) {
    return (
      <View>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('sendToken.tokenSelect.priorityFieldLabel')}
        </Text>

        <Text>
          {i18next.t('sendToken.tokenSelect.errorLoadingPrioritiesText')}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[styles.label, styles.theme.label]}>
        {i18next.t('sendToken.tokenSelect.priorityFieldLabel')}
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
              {i18next.t(PRIORITY_NAMES_MAP[priority.code])}
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

  return (
    <View>
      <View style={[styles.feeContainer]}>
        <Text style={[styles.text, styles.theme.text]}>
          {i18next.t('sendToken.tokenSelect.transactionFeeLabel')}
        </Text>
          <Text style={[styles.text, styles.theme.text]}>
            {transactionFee.data} {selectedToken?.symbol}
          </Text>
      </View>

      <View style={[styles.feeContainer]}>
        <Text style={[styles.text, styles.theme.text]}>
          {i18next.t('sendToken.tokenSelect.initializationFeeLabel')}
        </Text>

        {initializationFee.isLoading ? (
          <Text style={[styles.text, styles.theme.text]}>
            {i18next.t('sendToken.tokenSelect.loadingInitializationFeeText')}
          </Text>
        ) : (
          <Text style={[styles.text, styles.theme.text]}>
            {initializationFee.data} {selectedToken?.symbol}
          </Text>
        )}
      </View>

      <View style={[styles.feeContainer]}>
        <Text style={[styles.text, styles.theme.text]}>
          {i18next.t('sendToken.tokenSelect.cmmFeeLabel')}
        </Text>

        {cmmFee.isLoading ? (
          <Text style={[styles.text, styles.theme.text]}>
            {i18next.t('sendToken.tokenSelect.loadingCmmFeeText')}
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
