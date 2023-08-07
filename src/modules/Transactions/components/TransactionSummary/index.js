/* eslint-disable max-statements */
import React from 'react';
import { View, Text, Image } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { PRIORITY_NAMES_MAP } from 'modules/Transactions/utils/constants';
import { P } from 'components/shared/toolBox/typography';
import CopyToClipboard from 'components/shared/CopyToClipboard/CopyToClipboard';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';

import getTransactionSummaryStyles from './styles';

export default function TransactionSummary(transaction) {
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
          <View style={[styles.applicationNameContainer]}>
            <Text style={[styles.valueText, styles.theme.valueText]}>
              {transaction.senderApplication?.displayName}
            </Text>

            {transaction.senderApplication?.chainID && (
              <Text style={[styles.label, styles.theme.label]}>
                Chain ID: {transaction.senderApplication?.chainID}
              </Text>
            )}
          </View>

          <Image
            source={{ uri: transaction.senderApplication?.logo.png }}
            style={[styles.applicationLogoImage]}
          />
        </View>
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>
          {i18next.t('sendToken.applicationsSelect.recipientApplicationFieldLabel')}
        </Text>

        <View style={[styles.row]}>
          <View style={[styles.applicationNameContainer]}>
            <Text style={[styles.valueText, styles.theme.valueText]}>
              {transaction.recipientApplication?.displayName}
            </Text>

            {transaction.recipientApplication?.chainID && (
              <Text style={[styles.label, styles.theme.label]}>
                Chain ID: {transaction.recipientApplication?.chainID}
              </Text>
            )}
          </View>

          <Image
            source={{ uri: transaction.recipientApplication?.logo.png }}
            style={[styles.applicationLogoImage]}
          />
        </View>
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>
          {i18next.t('sendToken.applicationsSelect.recipientAccountFieldLabel')}
        </Text>

        {transaction.recipientAccount.isNew ? (
          <CopyToClipboard
            style={[styles.valueText, styles.theme.valueText]}
            labelStyle={[styles.valueText, styles.theme.valueText, { marginRight: 8 }]}
            showIcon
            iconSize={18}
            value={transaction.recipientAccount.address}
            type={P}
            label={stringShortener(transaction.recipientAccount.address, 5, 5)}
          />
        ) : (
          <View style={[styles.row]}>
            <Avatar
              address={transaction.recipientAccount.address}
              size={24}
              style={styles.avatar}
            />

            <View>
              {!!transaction.recipientAccount.label && (
                <P style={[styles.valueText, styles.theme.valueText]}>
                  {transaction.recipientAccount.label}
                </P>
              )}

              <P style={[styles.label, styles.theme.label]}>
                {stringShortener(transaction.recipientAccount.address, 6, 6)}
              </P>
            </View>
          </View>
        )}
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>{i18next.t('sendToken.tokenSelect.tokenIDFieldLabel')}</Text>

        <View style={[styles.row]}>
          <Text style={[styles.valueText, styles.theme.valueText]}>
            {transaction.token?.symbol}
          </Text>

          <Image
            source={{ uri: transaction.token?.logo?.png }}
            style={styles.applicationLogoImage}
          />
        </View>
      </View>

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>
          {i18next.t('sendToken.tokenSelect.tokenAmountFieldLabelPlain')}
        </Text>

        <Text style={[styles.valueText, styles.theme.valueText]}>
          {transaction.amount} {transaction.token?.symbol}
        </Text>
      </View>

      {!!transaction.message && (
        <View style={[styles.messageRow]}>
          <Text style={[styles.label, { marginBottom: 8 }]}>
            {i18next.t('sendToken.tokenSelect.messageFieldLabelPlain')}
          </Text>

          <Text style={[styles.valueText, styles.theme.valueText]}>{transaction.message}</Text>
        </View>
      )}

      {!!transaction.priority && (
        <View style={[styles.fieldRow]}>
          <Text style={[styles.label]}>
            {i18next.t('sendToken.tokenSelect.priorityFieldLabel')}
          </Text>

          <Text style={[styles.valueText, styles.theme.valueText]}>
            {i18next.t(PRIORITY_NAMES_MAP[transaction.priority])}
          </Text>
        </View>
      )}

      <View style={[styles.fieldRow]}>
        <Text style={[styles.label]}>{i18next.t('sendToken.tokenSelect.transactionFeeLabel')}</Text>

        <Text style={[styles.valueText, styles.theme.valueText]}>{transaction.transactionFee}</Text>
      </View>

      {transaction.messageFee && (
        <View style={[styles.fieldRow, { borderBottomColor: 'transparent' }]}>
          <Text style={[styles.label]}>{i18next.t('sendToken.tokenSelect.messageFeeLabel')}</Text>

          <Text style={[styles.valueText, styles.theme.valueText]}>{transaction.messageFee}</Text>
        </View>
      )}
    </View>
  );
}
