/* eslint-disable no-undef */
/* eslint-disable max-lines, max-statements */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';
import * as Lisk from '@liskhq/lisk-client';

import { useTheme } from 'hooks/useTheme';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import useInitializationFeeCalculator from 'modules/Transactions/hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from 'modules/Transactions/hooks/useCCMFeeCalculator';
import Input from 'components/shared/toolBox/input';
import Picker from 'components/shared/Picker';
import { LabelButton } from 'components/shared/toolBox/button';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { P } from 'components/shared/toolBox/typography';
import InfoToggler from 'components/shared/InfoToggler';
import FadeInView from 'components/shared/fadeInView';
import DataRenderer from 'components/shared/DataRenderer';
import TokenSvg from 'assets/svgs/TokenSvg';
import DeleteSvg from 'assets/svgs/DeleteSvg';
import colors from 'constants/styleGuide/colors';
import { PRIORITY_NAMES_MAP } from '../../constants';

import { useTokenAmountInCurrency } from './hooks';
import getSendTokenSelectTokenStepStyles, {
  getSendTokenAmountFieldStyles,
  getSendTokenMessageFieldStyles,
} from './styles';

export function TokenSelectField({ value, onChange, recipientApplication, errorMessage, style }) {
  const {
    data: supportedTokensData,
    isLoading: isLoadingSupportedTokens,
    isError: isSupportedTokensError,
  } = useApplicationSupportedTokensQuery(recipientApplication);

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const selectedToken = supportedTokensData?.find((token) => token.tokenID === value);

  const tokenBalance = selectedToken?.availableBalance
    ? Number(
        Lisk.transactions.convertBeddowsToLSK(selectedToken?.availableBalance)
      ).toLocaleString()
    : 0;

  return (
    <Picker value={value} onChange={onChange} error={errorMessage}>
      <View style={{ ...styles.row, justifyContent: 'space-between' }}>
        <Picker.Label style={style?.label}>
          {i18next.t('sendToken.tokenSelect.tokenIDFieldLabel')}
        </Picker.Label>

        {selectedToken && (
          <Picker.Label style={style?.label}>
            {i18next.t('sendToken.tokenSelect.tokenIDBalanceLabel')}:{' '}
            {/* TODO: Read token symbol from account info when backend send the data */}
            <Text style={[styles.balanceText]}>
              {tokenBalance} {selectedToken.symbol}
            </Text>
          </Picker.Label>
        )}
      </View>

      <DataRenderer
        data={supportedTokensData}
        isLoading={isLoadingSupportedTokens}
        error={isSupportedTokensError}
        renderData={(data) => (
          <>
            <Picker.Toggle style={style?.toggle}>
              {selectedToken && (
                <View style={[styles.row]}>
                  <Text style={[styles.text, styles.theme.text]}>{selectedToken.symbol}</Text>

                  <TokenSvg symbol={selectedToken.symbol} style={styles.tokenSvg} />
                </View>
              )}
            </Picker.Toggle>

            <Picker.Menu>
              <InfiniteScrollList
                data={data}
                keyExtractor={(item) => item.tokenID}
                renderItem={(item) => (
                  <Picker.Item key={item.tokenID} value={item.tokenID}>
                    <Text style={[styles.text, styles.theme.text]}>{item.symbol}</Text>

                    <TokenSvg symbol={item.symbol} style={styles.tokenSvg} />
                  </Picker.Item>
                )}
                // TODO: Integrate pagination props using react-query.
              />
            </Picker.Menu>
          </>
        )}
      />
    </Picker>
  );
}

export function SendTokenAmountField({
  value,
  onChange,
  recipientApplication,
  errorMessage,
  tokenID,
  style,
}) {
  const {
    data: supportedTokensData,
    isLoading: isLoadingSupportedTokens,
    isError: isSupportedTokensError,
  } = useApplicationSupportedTokensQuery(recipientApplication);

  const selectedToken = supportedTokensData?.find((token) => token.tokenID === tokenID);

  const tokenAmountInCurrency = useTokenAmountInCurrency({
    tokenAmount: value,
    tokenSymbol: selectedToken?.symbol,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  return (
    <DataRenderer
      data={supportedTokensData}
      isLoading={isLoadingSupportedTokens}
      error={isSupportedTokensError}
      renderData={() => (
        <Input
          value={value && value.toString()}
          onChange={(newValue) => onChange(newValue && parseFloat(newValue))}
          keyboardType="numeric"
          disabled={!selectedToken}
          label={
            selectedToken
              ? i18next.t('sendToken.tokenSelect.tokenAmountFieldLabel', {
                  selectedTokenSymbol: selectedToken.symbol || '',
                })
              : i18next.t('sendToken.tokenSelect.tokenAmountFieldLabelPlain')
          }
          placeholder={
            selectedToken
              ? i18next.t('sendToken.tokenSelect.tokenAmountFieldPlaceholder', {
                  selectedTokenSymbol: selectedToken.symbol || '',
                })
              : i18next.t('sendToken.tokenSelect.tokenAmountFieldPlaceholderPlain')
          }
          error={errorMessage}
          adornments={{
            right: tokenAmountInCurrency && (
              <Text style={[styles.tokenAmountInCurrencyText]}>
                ~ {`${tokenAmountInCurrency.amount} ${tokenAmountInCurrency.currency}`}
              </Text>
            ),
          }}
          innerStyles={getSendTokenAmountFieldStyles(style)}
        />
      )}
    />
  );
}

export function SendTokenMessageField({ value, onChange, style }) {
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
    <FadeInView>
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
              <DeleteSvg color={colors.light.ultramarineBlue} height={16} />
            </TouchableOpacity>
          </View>
        }
        placeholder={i18next.t('sendToken.tokenSelect.messageFieldPlaceholder')}
        multiline
        innerStyles={getSendTokenMessageFieldStyles(style)}
      />
    </FadeInView>
  );
}

export function SendTokenPriorityField({ value, onChange, transaction, style }) {
  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const priorities =
    transaction.data._feeEstimatePerByte &&
    Object.entries(transaction.data._feeEstimatePerByte).map(([code, fee]) => ({ code, fee }));

  const shouldRender = priorities?.reduce((acc, priority) => acc && priority.fee > 0, true);

  if (!shouldRender) return null;

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={[styles.labelContainer]}>
        <P style={[styles.label, styles.theme.label, styles.iconLabel, style?.label]}>
          {i18next.t('sendToken.tokenSelect.priorityFieldLabel')}
        </P>

        <InfoToggler
          title={i18next.t('sendToken.info.priority.title')}
          description={i18next.t('sendToken.info.priority.description1')}
        />
      </View>

      <View style={[styles.row, { width: '100%' }]}>
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority.code}
            onPress={() => onChange(priority.code)}
            style={[
              styles.priorityButtonBase,
              styles[
                value === priority.code ? 'selectedPriorityButton' : 'notSelectedPriorityButton'
              ],
              { marginRight: 8 },
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
  recipientAccountAddress,
  senderApplication,
  recipientApplication,
  transaction,
}) {
  const { data: tokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const selectedToken = tokensData?.find((token) => token.tokenID === tokenID);

  const transactionFee = Lisk.transactions.convertBeddowsToLSK(
    transaction.data.transaction.fee.toString()
  );

  const initializationFee = useInitializationFeeCalculator({
    recipientAccountAddress,
  });

  const cmmFee = useCCMFeeCalculator({
    senderApplicationChainID: senderApplication.chainID,
    recipientApplicationChainID: recipientApplication.chainID,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
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
          {transactionFee} {selectedToken?.symbol}
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

        <DataRenderer
          data={initializationFee.data}
          isLoading={initializationFee.isLoading}
          error={initializationFee.error}
          renderData={(data) => (
            <Text style={[styles.text, styles.theme.text]}>
              {Lisk.transactions.convertBeddowsToLSK(data.toString())} {selectedToken?.symbol}
            </Text>
          )}
          renderEmpty={() => (
            <Text style={[styles.text, styles.theme.text]}>0 {selectedToken?.symbol}</Text>
          )}
        />
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

        <DataRenderer
          data={cmmFee.data}
          isLoading={cmmFee.isLoading}
          error={cmmFee.error}
          renderData={(data) => (
            <Text style={[styles.text, styles.theme.text]}>
              {Lisk.transactions.convertBeddowsToLSK(data.toString())} {selectedToken?.symbol}
            </Text>
          )}
          renderEmpty={() => (
            <Text style={[styles.text, styles.theme.text]}>0 {selectedToken?.symbol}</Text>
          )}
        />

        {/* {cmmFee.isLoading ? (
          <Text style={[styles.text, styles.theme.text]}>
            {i18next.t('sendToken.tokenSelect.loadingCmmFeeText')}
          </Text>
        ) : (
          <Text style={[styles.text, styles.theme.text]}>
            {cmmFee.data} {selectedToken?.symbol}
          </Text>
        )} */}
      </View>
    </View>
  );
}
