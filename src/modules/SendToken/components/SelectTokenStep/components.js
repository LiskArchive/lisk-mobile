/* eslint-disable max-lines, max-statements */
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { useAccountInfo } from 'modules/Accounts/hooks/useAccounts/useAccountInfo';
import Input from 'components/shared/toolBox/input';
import Picker from 'components/shared/Picker';
import { LabelButton } from 'components/shared/toolBox/button';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { P } from 'components/shared/toolBox/typography';
import InfoToggler from 'components/shared/InfoToggler';
import { fromRawLsk } from 'utilities/conversions';
import TokenSvg from 'assets/svgs/TokenSvg';
import DeleteSvg from 'assets/svgs/DeleteSvg';
import colors from 'constants/styleGuide/colors';
import { PRIORITY_NAMES_MAP } from '../../constants';
import useTransactionPriorities from '../../hooks/useTransactionPriorities';
import useTransactionFeeCalculator from '../../hooks/useTransactionFeeCalculator';
import useInitializationFeeCalculator from '../../hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from '../../hooks/useCCMFeeCalculator';

import { useTokenAmountInCurrency } from './hooks';
import getSendTokenSelectTokenStepStyles, {
  sendTokenAmountFieldStyles,
  sendTokenMessageFieldStyles
} from './styles';

export function TokenSelectField({
  value,
  onChange,
  errorMessage,
  tokens,
}) {
  const currentAccountInfo = useAccountInfo();

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const normalizedBalance = fromRawLsk(currentAccountInfo.summary.balance);

  const selectedToken = tokens.data?.find(token => token.tokenID === value);

  return (
    <Picker
      value={value}
      onChange={onChange}
      error={errorMessage}
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
  value,
  onChange,
  errorMessage,
  tokenID,
  tokens,
}) {
  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const { tokenAmountInCurrency, currency } = useTokenAmountInCurrency(value);

  const selectedToken = tokens.data?.find(
    token => token.tokenID === tokenID
  );

  return (
    <Input
      value={value && value.toString()}
      onChange={newValue => onChange(newValue && parseFloat(newValue))}
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
      error={errorMessage}
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

export function SendTokenMessageField({
  value,
  onChange,
}) {
  const [showInput, setShowInput] = useState(false);

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  function handleRemove() {
    setShowInput(false);
    onChange('');
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
      value={value}
      onChange={onChange}
      label={
        <View style={[styles.labelContainer, { justifyContent: 'space-between' }]}>
          <View style={[styles.row]}>
            <P style={[styles.label, styles.theme.label, styles.iconLabel]}>
              {i18next.t('sendToken.tokenSelect.messageFieldLabel')}
            </P>

            <InfoToggler
              title={i18next.t('sendToken.info.bytesCounter.title')}
              description={[
                i18next.t('sendToken.info.bytesCounter.description1'),
                i18next.t('sendToken.info.bytesCounter.description2'),
              ]}
            />
          </View>

          <TouchableOpacity onPress={handleRemove}>
            <DeleteSvg color={colors.light.ultramarineBlue} height={16}/>
          </TouchableOpacity>
        </View>
      }
      placeholder={i18next.t('sendToken.tokenSelect.messageFieldPlaceholder')}
      multiline
      innerStyles={sendTokenMessageFieldStyles}
    />
  );
}

export function SendTokenPriorityField({
  value,
  onChange,
}) {
  const {
    data: prioritiesData,
    isLoading: isLoadingPrioritiesData,
    error: errorOnPriorities
  } = useTransactionPriorities();

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const shouldShowPrioritiesData = useMemo(
    () => prioritiesData && prioritiesData[0]?.fee,
    [prioritiesData]
  );

  if (!shouldShowPrioritiesData) return null;

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
      <View style={[styles.labelContainer]}>
        <P style={[styles.label, styles.theme.label, styles.iconLabel]}>
          {i18next.t('sendToken.tokenSelect.priorityFieldLabel')}
        </P>

        <InfoToggler
          title={i18next.t('sendToken.info.priority.title')}
          description={i18next.t('sendToken.info.priority.description1')}
        />
      </View>

      <View style={[styles.row, { width: '100%' }]}>
        {prioritiesData.map(priority => (
          <TouchableOpacity
            key={priority.code}
            onPress={() => onChange(priority.code)}
            style={[
              styles.priorityButtonBase,
              styles[value === priority.code ? 'selectedPriorityButton' : 'notSelectedPriorityButton'],
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

export function SendTokenTransactionFeesLabels({
  tokenID,
  amount,
  priority,
  message,
  recipientAccountAddress,
  senderApplicationChainID,
  recipientApplicationChainID,
  tokens
}) {
  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const selectedToken = tokens.data?.find(token => token.tokenID === tokenID);

  const transactionFee = useTransactionFeeCalculator({
    tokenID,
    amount,
    priority,
    message,
  });

  const initializationFee = useInitializationFeeCalculator({
    tokenID,
    recipientAccountAddress,
  });

  const cmmFee = useCCMFeeCalculator({
    senderApplicationChainID,
    recipientApplicationChainID
  });

  return (
    <View>
      <View style={[styles.feeContainer]}>
        <View style={[styles.row]}>
          <Text style={[styles.text, styles.theme.text, styles.iconLabel]}>
            {i18next.t('sendToken.tokenSelect.transactionFeeLabel')}
          </Text>

          <InfoToggler
            title={i18next.t('sendToken.info.transactionFee.title')}
            description={i18next.t('sendToken.info.transactionFee.description1')}
          />
        </View>

        <Text style={[styles.text, styles.theme.text]}>
          {transactionFee.data} {selectedToken?.symbol}
        </Text>
      </View>

      <View style={[styles.feeContainer]}>
        <View style={[styles.row]}>
          <Text style={[styles.text, styles.theme.text, styles.iconLabel]}>
            {i18next.t('sendToken.tokenSelect.initializationFeeLabel')}
          </Text>

          <InfoToggler
            title={i18next.t('sendToken.info.initializationFee.title')}
            description={i18next.t('sendToken.info.initializationFee.description1')}
          />
        </View>

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
        <View style={[styles.row]}>
          <Text style={[styles.text, styles.theme.text, styles.iconLabel]}>
            {i18next.t('sendToken.tokenSelect.cmmFeeLabel')}
          </Text>

          <InfoToggler
            title={i18next.t('sendToken.info.cmmFee.title')}
            description={i18next.t('sendToken.info.cmmFee.description1')}
          />
        </View>

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
