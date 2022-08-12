/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { P } from 'components/shared/toolBox/typography';
import TokenSvg from 'assets/svgs/TokenSvg';
import { stringShortener } from 'utilities/helpers';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { PRIORITY_NAMES_MAP } from '../../constants';

import getSendTokenSummaryStepStyles from './styles';
import { useSendTokenSummary } from './hooks';
import { SendTokenSummaryModal } from './components';

export default function SendTokenSummaryStep({
  prevStep,
  form,
  navigation
}) {
  const [showSendTokenSummaryModal,
    setShowSendTokenSummaryModal] = useState(false);

  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
  });

  const summary = useSendTokenSummary({ form });

  return (
    <>
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={[styles.container]}>
          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>From Application</Text>

            <View style={[styles.row]}>
              <Text style={[styles.valueText, styles.theme.valueText]}>
                {summary.senderApplication?.name}
              </Text>

              <Image
                source={{ uri: summary.senderApplication?.images.logo.png }}
                style={[styles.applicationLogoImage]}
              />
            </View>
          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>To Application</Text>

            <View style={[styles.row]}>
              <Text style={[styles.valueText, styles.theme.valueText]}>
                {summary.recipientApplication?.name}
              </Text>

              <Image
                source={{ uri: summary.recipientApplication?.images.logo.png }}
                style={[styles.applicationLogoImage]}
              />
            </View>
          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>Recipient</Text>

            <CopyToClipboard
              style={[styles.valueText, styles.theme.valueText]}
              labelStyle={[styles.valueText, styles.theme.valueText, { marginRight: 8 }]}
              showIcon
              iconSize={18}
              value={summary.recipientAccount.metadata.address}
              type={P}
              label={stringShortener(summary.recipientAccount.metadata.address, 5, 5)}
            />

          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>Token</Text>

            <View style={[styles.row]}>
              <Text
                style={[styles.valueText, styles.theme.valueText]}
              >
                {summary.token?.symbol}
              </Text>

              <TokenSvg symbol={summary.token?.symbol} style={styles.tokenSvg} />
            </View>
          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>Amount</Text>

            <Text
              style={[styles.valueText, styles.theme.valueText]}
            >
                {summary.amount} {summary.token?.symbol}
            </Text>
          </View>

          {!!summary.message && (
            <View style={[styles.messageRow]}>
              <Text style={[styles.label, { marginBottom: 8 }]}>Message</Text>

              <Text
                style={[styles.valueText, styles.theme.valueText]}
              >
                {summary.message}
              </Text>
            </View>
          )}

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>Priority</Text>

            <Text
              style={[styles.valueText, styles.theme.valueText]}
            >
              {PRIORITY_NAMES_MAP[summary.priority]}
            </Text>
          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>Transaction fee</Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {summary.transactionFee?.data} {summary.token?.symbol}
            </Text>
          </View>

          <View style={[styles.fieldRow, { borderBottomColor: 'transparent' }]}>
            <Text style={[styles.label]}>CCM fee</Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {summary.initializationFee?.data} {summary.token?.symbol}
            </Text>
          </View>
        </View>

        <View style={[styles.buttonsContainer]}>
          <Button
            style={{ marginRight: 16, flex: 1 }}
            onClick={prevStep}
            title={'Back'}
          />

          <PrimaryButton
            noTheme
            onClick={() => setShowSendTokenSummaryModal(true)}
            title={'Send'}
            style={{ flex: 1 }}
          />
        </View>
      </View>

      <SendTokenSummaryModal
        show={showSendTokenSummaryModal}
        setShow={setShowSendTokenSummaryModal}
        summary={summary}
        navigation={navigation}
      />
    </>
  );
}
