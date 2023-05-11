/* eslint-disable complexity */
/* eslint-disable max-lines, max-statements */
import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { usePriorityFee } from 'modules/Transactions/hooks/usePriorityFee';
import { PRIORITY_NAMES_MAP } from 'modules/Transactions/utils/constants';
import Input from 'components/shared/toolBox/input';
import Picker from 'components/shared/Picker';
import { LabelButton } from 'components/shared/toolBox/button';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { P } from 'components/shared/toolBox/typography';
import InfoToggler from 'components/shared/InfoToggler';
import FadeInView from 'components/shared/fadeInView';
import Skeleton from 'components/shared/Skeleton/Skeleton';
import DataRenderer from 'components/shared/DataRenderer';
import { fromBaseToDisplayDenom, fromBeddowsToLsk } from 'utilities/conversions.utils';
import { deviceWidth } from 'utilities/device';
import DeleteSvg from 'assets/svgs/DeleteSvg';
import CaretSvg from 'assets/svgs/CaretSvg';
import colors from 'constants/styleGuide/colors';

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
    ? fromBaseToDisplayDenom({
        amount: selectedToken.availableBalance,
        displayDenom: selectedToken.displayDenom,
        denomUnits: selectedToken.denomUnits,
        symbol: selectedToken.symbol,
        withSymbol: true,
        formatAmount: true,
      })
    : 0;

  const renderOptions = (data = supportedTokensData) => (
    <InfiniteScrollList
      data={data}
      keyExtractor={(item) => item.tokenID}
      renderItem={(item) => (
        <Picker.Item
          key={item.tokenID}
          value={item.tokenID}
          onChange={onChange}
          testID={`token-select-${item.symbol}`}
        >
          <Text style={[styles.theme.text]}>{item.symbol}</Text>
          <Image source={{ uri: item.logo.png }} style={styles.logo} />
        </Picker.Item>
      )}
      // TODO: Integrate pagination props.
      // (details on https://github.com/LiskHQ/lisk-mobile/issues/1611).
    />
  );

  const { showOptions } = Picker.usePickerMenu(renderOptions());

  return (
    <Picker value={value} error={errorMessage}>
      <View style={{ ...styles.row, justifyContent: 'space-between' }}>
        <Picker.Label style={style?.label}>
          {i18next.t('sendToken.tokenSelect.tokenIDFieldLabel')}
        </Picker.Label>

        {selectedToken && (
          <Picker.Label style={style?.label}>
            {i18next.t('sendToken.tokenSelect.tokenIDBalanceLabel')}:{' '}
            <Text style={[styles.primaryText]}>{tokenBalance}</Text>
          </Picker.Label>
        )}
      </View>

      <DataRenderer
        data={supportedTokensData}
        isLoading={isLoadingSupportedTokens}
        error={isSupportedTokensError}
        renderData={() => (
          <Picker.Toggle style={style?.toggle} openMenu={showOptions}>
            {selectedToken && (
              <View style={[styles.row]} testID="select-token-picker">
                <Text style={[styles.theme.text]}>{selectedToken.symbol}</Text>
                <Image source={{ uri: selectedToken.logo.png }} style={styles.logo} />
              </View>
            )}
          </Picker.Toggle>
        )}
        renderLoading={() => (
          <Skeleton
            height={48}
            width={deviceWidth() - 44}
            style={{ container: { marginBottom: 16 } }}
          />
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
          value={value}
          onChange={(newValue) => onChange(newValue)}
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
            right: tokenAmountInCurrency.amount && (
              <Text style={[styles.tokenAmountInCurrencyText]}>
                ~ {`${tokenAmountInCurrency.amount} ${tokenAmountInCurrency.currency}`}
              </Text>
            ),
          }}
          testID="token-amount"
          innerStyles={getSendTokenAmountFieldStyles(style)}
        />
      )}
      renderLoading={() => (
        <Skeleton
          height={48}
          width={deviceWidth() - 44}
          style={{ container: { marginBottom: 16 } }}
        />
      )}
    />
  );
}

export function SendTokenMessageField({ value, onChange, style }) {
  const [showInput, setShowInput] = useState(!!value);

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
        style={styles.addMessageLabelContainer}
        textStyle={styles.addMessageLabel}
        testID="show-message-input"
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
            <P style={[styles.label, styles.theme.label, styles.iconLabel]}>
              {i18next.t('sendToken.tokenSelect.messageFieldLabel')}
            </P>

            <TouchableOpacity onPress={handleRemove}>
              <DeleteSvg color={colors.light.ultramarineBlue} height={16} />
            </TouchableOpacity>
          </View>
        }
        placeholder={i18next.t('sendToken.tokenSelect.messageFieldPlaceholder')}
        multiline
        innerStyles={getSendTokenMessageFieldStyles(style)}
        testID="message-input"
      />
    </FadeInView>
  );
}

export function SendTokenPriorityField({ value, onChange, style }) {
  const {
    data: priorityFeesData,
    isLoading: isTransactionFeeEstimateLoading,
    error: errorOnTransactionFeeEstimate,
  } = usePriorityFee();

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const priorities =
    priorityFeesData &&
    Object.entries(priorityFeesData).map(([code, fee]) => ({
      code,
      fee,
    }));

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

      <DataRenderer
        data={priorities}
        isLoading={isTransactionFeeEstimateLoading}
        error={errorOnTransactionFeeEstimate}
        renderData={(data) => (
          <View style={[styles.row, { width: '100%' }]}>
            {data.map((priority) => (
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
        )}
      />
    </View>
  );
}

export function SendTokenTransactionFeesLabels({ tokenID, recipientApplication, transaction }) {
  const [showFeesBreakdown, setShowFeesBreakdown] = useState(false);

  const { data: tokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const selectedToken = tokensData?.find((token) => token.tokenID === tokenID);

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const messageFee =
    transaction.data.transaction.params.messageFee &&
    fromBeddowsToLsk(transaction.data.transaction.params.messageFee, true);

  const feesBreakdown = transaction.data.getFeeBreakdown();

  const feesLabels = Object.entries(feesBreakdown).reduce(
    (acc, [feeKey, feeValue]) =>
      feeValue > 0
        ? {
            ...acc,
            [feeKey]: fromBaseToDisplayDenom({
              amount: feeValue,
              displayDenom: selectedToken?.displayDenom,
              denomUnits: selectedToken?.denomUnits,
              symbol: selectedToken?.symbol,
              withSymbol: true,
            }),
          }
        : acc,
    {}
  );

  const shouldShowFeeBreakdown = Object.keys(feesLabels).length > 2;

  return (
    <View>
      <View style={[styles.feeContainer]}>
        <View style={[styles.row]}>
          <Text style={[styles.theme.text, styles.iconLabel, showFeesBreakdown && styles.boldText]}>
            {i18next.t('sendToken.tokenSelect.transactionFeeLabel')}
          </Text>

          <InfoToggler
            title={i18next.t('sendToken.info.transactionFee.title')}
            description={i18next.t('sendToken.info.transactionFee.description1')}
          />
        </View>

        <TouchableOpacity
          onPress={() => setShowFeesBreakdown((prevState) => !prevState)}
          style={[styles.row]}
          testID="fees-breakdown-toggle"
          disabled={!shouldShowFeeBreakdown}
        >
          <Text style={[styles.theme.text, showFeesBreakdown && styles.boldText]}>
            {feesLabels.totalFee}
          </Text>

          {shouldShowFeeBreakdown && (
            <CaretSvg
              color={colors.light.ultramarineBlue}
              height={16}
              direction={showFeesBreakdown ? 'down' : 'right'}
            />
          )}
        </TouchableOpacity>
      </View>

      {showFeesBreakdown && (
        <FadeInView style={[styles.feeBreakdownContainer, styles.theme.feeBreakdownContainer]}>
          <View style={[styles.feeBreakdownRow]}>
            <Text style={[styles.primaryText]}>
              {i18next.t('sendToken.tokenSelect.transactionFeeBreakdownText')}
            </Text>
          </View>

          <View style={[styles.feeBreakdownRow]}>
            <Text style={[styles.secondaryText, styles.iconLabel]}>
              {i18next.t('sendToken.tokenSelect.bytesFeeLabel')}
            </Text>

            <Text style={[styles.theme.text]}>{feesLabels.byteFee}</Text>
          </View>

          {feesLabels.priorityFee && (
            <View style={[styles.feeBreakdownRow]}>
              <Text style={[styles.secondaryText, styles.iconLabel]}>
                {i18next.t('sendToken.tokenSelect.priorityFeeLabel')}
              </Text>

              <Text style={[styles.theme.text]}>{feesLabels.priorityFee}</Text>
            </View>
          )}

          {feesLabels.extraCommandFee && (
            <View style={[styles.feeBreakdownRow]} testID="initialization-fee">
              <Text style={[styles.secondaryText, styles.iconLabel]}>
                {i18next.t('sendToken.tokenSelect.extraCommandFeeLabel')}
              </Text>

              <Text style={[styles.theme.text]}>{feesLabels.extraCommandFee}</Text>
            </View>
          )}
        </FadeInView>
      )}

      {messageFee && (
        <View style={[styles.feeContainer]}>
          <View style={[styles.row]}>
            <Text
              style={[styles.theme.text, styles.iconLabel, showFeesBreakdown && styles.boldText]}
            >
              {i18next.t('sendToken.tokenSelect.messageFeeLabel')}
            </Text>

            <InfoToggler
              title={i18next.t('sendToken.info.messageFee.title')}
              description={i18next.t('sendToken.info.messageFee.description1')}
            />
          </View>

          <Text style={[shouldShowFeeBreakdown && styles.messageFeeText, styles.theme.text]}>
            {messageFee}
          </Text>
        </View>
      )}
    </View>
  );
}
