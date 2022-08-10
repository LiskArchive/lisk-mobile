/* eslint-disable max-statements */
import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getSendTokenSummaryStepStyles from './styles';
import { PRIORITY_NAMES_MAP } from '../../constants';
import { useSendTokenSummary } from './hooks';

export default function SendTokenSummaryStep({
  nextStep,
  prevStep,
  form,
}) {
  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
  });

  const summary = useSendTokenSummary({ form });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <View style={[styles.row]}>
          <Text>From Application</Text>
          <Text>{summary.senderApplication?.name}</Text>
        </View>

        <View style={[styles.row]}>
          <Text>To Application</Text>
          <Text>{summary.recipientApplication?.name}</Text>
        </View>

        <View style={[styles.row]}>
          <Text>Recipient</Text>
          <Text>{summary.recipientAccount.metadata.name}</Text>
        </View>

        <View style={[styles.row]}>
          <Text>Token</Text>
          <Text>{summary.token?.symbol}</Text>
        </View>

        <View style={[styles.row]}>
          <Text>Amount</Text>
          <Text>{summary.amount}</Text>
        </View>

        <View style={[styles.row]}>
          <Text>Message</Text>
          <Text>{summary.message}</Text>
        </View>

        <View style={[styles.row]}>
          <Text>Priority</Text>
          <Text>{PRIORITY_NAMES_MAP[summary.priority]}</Text>
        </View>

        <View style={[styles.row]}>
          <Text>Transaction fee</Text>
          <Text>{summary.transactionFee?.data}</Text>
        </View>

        <View style={[styles.row]}>
          <Text>CCM fee</Text>
          <Text>{summary.initializationFee?.data}</Text>
        </View>
      </View>

      <View style={[styles.buttonsContainer]}>
        <Button
          style={{ marginRight: 16, flex: 1 }}
          onClick={() => prevStep()}
          title={'Back'}
        />

        <PrimaryButton
          noTheme
          onClick={() => nextStep()}
          title={'Send'}
          style={{ flex: 1 }}
        />

      </View>
    </View>
  );
}
