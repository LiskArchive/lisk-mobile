/* eslint-disable max-statements */
import React from 'react';
import { View, Text, Image } from 'react-native';
import i18next from 'i18next';
import * as Lisk from '@liskhq/lisk-client';

import { useTheme } from 'hooks/useTheme';
import { PRIORITY_NAMES_MAP } from 'modules/Transactions/utils/constants';
import { P } from 'components/shared/toolBox/typography';
import CopyToClipboard from 'components/shared/copyToClipboard';
import Avatar from 'components/shared/avatar';
import TokenSvg from 'assets/svgs/TokenSvg';
import { stringShortener } from 'utilities/helpers';

import getTransactionSummaryStyles from './styles';
import { useTransactionSummary } from './hooks';

export default function TransactionSummary(transaction) {
  const summary = useTransactionSummary(transaction);

  const { styles } = useTheme({
    styles: getTransactionSummaryStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>
          {i18next.t('sendToken.applicationsSelect.senderApplicationFieldLabel')}
        </Text>

        <View style={[styles.row]}>
          <Text style={[styles.valueText, styles.theme.valueText]}>
            {summary.senderApplication?.chainName}
          </Text>

          <Image
            source={{ uri: summary.senderApplication?.logo.png }}
            style={[styles.applicationLogoImage]}
          />
        </View>
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>
          {i18next.t('sendToken.applicationsSelect.recipientApplicationFieldLabel')}
        </Text>

        <View style={[styles.row]}>
          <Text style={[styles.valueText, styles.theme.valueText]}>
            {summary.recipientApplication?.chainName}
          </Text>

          <Image
            source={{ uri: summary.recipientApplication?.logo.png }}
            style={[styles.applicationLogoImage]}
          />
        </View>
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>
          {i18next.t('sendToken.applicationsSelect.recipientAccountFieldLabel')}
        </Text>

        {summary.recipientAccount.isNew ? (
          <CopyToClipboard
            style={[styles.valueText, styles.theme.valueText]}
            labelStyle={[styles.valueText, styles.theme.valueText, { marginRight: 8 }]}
            showIcon
            iconSize={18}
            value={summary.recipientAccount.address}
            type={P}
            label={stringShortener(summary.recipientAccount.address, 5, 5)}
          />
        ) : (
          <View style={[styles.row]}>
            <Avatar address={summary.recipientAccount.address} size={24} style={styles.avatar} />

            <View>
              {!!summary.recipientAccount.label && (
                <P style={[styles.valueText, styles.theme.valueText]}>
                  {summary.recipientAccount.label}
                </P>
              )}

              <P style={[styles.label, styles.theme.label]}>
                {stringShortener(summary.recipientAccount.address, 6, 6)}
              </P>
            </View>
          </View>
        )}
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>{i18next.t('sendToken.tokenSelect.tokenIDFieldLabel')}</Text>

        <View style={[styles.row]}>
          <Text style={[styles.valueText, styles.theme.valueText]}>{summary.token?.symbol}</Text>

          <TokenSvg symbol={summary.token?.symbol} style={styles.tokenSvg} />
        </View>
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>
          {i18next.t('sendToken.tokenSelect.tokenAmountFieldLabelPlain')}
        </Text>

        <Text style={[styles.valueText, styles.theme.valueText]}>
          {summary.amount} {summary.token?.symbol}
        </Text>
      </View>

      {!!summary.message && (
        <View style={[styles.messageRow]}>
          <Text style={[styles.label, { marginBottom: 8 }]}>
            {i18next.t('sendToken.tokenSelect.messageFieldLabelPlain')}
          </Text>

          <Text style={[styles.valueText, styles.theme.valueText]}>{summary.message}</Text>
        </View>
      )}

      {!!summary.priority && (
        <View style={[styles.fieldRow]}>
          <Text style={[styles.label]}>
            {i18next.t('sendToken.tokenSelect.priorityFieldLabel')}
          </Text>

          <Text style={[styles.valueText, styles.theme.valueText]}>
            {i18next.t(PRIORITY_NAMES_MAP[summary.priority])}
          </Text>
        </View>
      )}

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>{i18next.t('sendToken.tokenSelect.transactionFeeLabel')}</Text>

        <Text style={[styles.valueText, styles.theme.valueText]}>
          {summary.transactionFee} {summary.token?.symbol}
        </Text>
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>
          {i18next.t('sendToken.tokenSelect.initializationFeeLabel')}
        </Text>

        <Text style={[styles.valueText, styles.theme.valueText]}>
          {Lisk.transactions.convertBeddowsToLSK(summary.initializationFee?.data.toString())}{' '}
          {summary.token?.symbol}
        </Text>
      </View>

      <View style={[styles.fieldRow, { borderBottomColor: 'transparent' }]}>
        <Text style={[styles.label]}>{i18next.t('sendToken.tokenSelect.cmmFeeLabel')}</Text>

        <Text style={[styles.valueText, styles.theme.valueText]}>
          {Lisk.transactions.convertBeddowsToLSK(summary.cmmFee?.data.toString())}{' '}
          {summary.token?.symbol}
        </Text>
      </View>
    </View>
  );
}
