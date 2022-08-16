/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { translate } from 'react-i18next';

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

function SendTokenSummaryStep({
  form,
  prevStep,
  reset,
  t
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
        <View style={[styles.container, styles.theme.container]}>
          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>
              {t('sendToken.applicationsSelect.senderApplicationFieldLabel')}
            </Text>

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
            <Text style={[styles.label]}>
              {t('sendToken.applicationsSelect.recipientApplicationFieldLabel')}
            </Text>

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
            <Text style={[styles.label]}>
              {t('sendToken.applicationsSelect.recipientAccountFieldLabel')}
            </Text>

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
            <Text style={[styles.label]}>
              {t('sendToken.tokenSelect.tokenIDFieldLabel')}
            </Text>

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
            <Text style={[styles.label]}>
              {t('sendToken.tokenSelect.tokenAmountFieldLabelPlain')}
            </Text>

            <Text
              style={[styles.valueText, styles.theme.valueText]}
            >
                {summary.amount} {summary.token?.symbol}
            </Text>
          </View>

          {!!summary.message && (
            <View style={[styles.messageRow]}>
              <Text style={[styles.label, { marginBottom: 8 }]}>
                {t('sendToken.tokenSelect.messageFieldLabelPlain')}
              </Text>

              <Text
                style={[styles.valueText, styles.theme.valueText]}
              >
                {summary.message}
              </Text>
            </View>
          )}

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>
              {t('sendToken.tokenSelect.priorityFieldLabel')}
            </Text>

            <Text
              style={[styles.valueText, styles.theme.valueText]}
            >
              {t(PRIORITY_NAMES_MAP[summary.priority])}
            </Text>
          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>
              {t('sendToken.tokenSelect.transactionFeeLabel')}
            </Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {summary.transactionFee?.data} {summary.token?.symbol}
            </Text>
          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>
              {t('sendToken.tokenSelect.initializationFeeLabel')}
            </Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {summary.initializationFee?.data} {summary.token?.symbol}
            </Text>
          </View>

          <View style={[styles.fieldRow, { borderBottomColor: 'transparent' }]}>
            <Text style={[styles.label]}>
              {t('sendToken.tokenSelect.cmmFeeLabel')}
            </Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {summary.cmmFee?.data} {summary.token?.symbol}
            </Text>
          </View>
        </View>

        <View style={[styles.buttonsContainer]}>
          <Button
            style={{ marginRight: 16, flex: 1 }}
            onClick={prevStep}
            title={t('sendToken.summary.prevStepButtonText')}
          />

          <PrimaryButton
            noTheme
            onClick={() => setShowSendTokenSummaryModal(true)}
            title={t('sendToken.summary.submitTransactionButtonText')}
            style={{ flex: 1 }}
          />
        </View>
      </View>

      <SendTokenSummaryModal
        show={showSendTokenSummaryModal}
        setShow={setShowSendTokenSummaryModal}
        summary={summary}
        form={form}
        handleResetForm={() => {
          form.handleReset();
          reset();
        }}
        handleResetStepper={reset}
      />
    </>
  );
}

export default translate()(SendTokenSummaryStep);
