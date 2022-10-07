/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import i18next from 'i18next';

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
import Avatar from '../../../../components/shared/avatar';

export default function SendTokenSummaryStep({ form, prevStep, reset, transaction }) {
  const [showSendTokenSummaryModal, setShowSendTokenSummaryModal] = useState(false);

  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
  });

  const summary = useSendTokenSummary({ form, transaction });

  return (
    <>
      <View style={[styles.wrapper, styles.theme.wrapper]}>
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
                <Avatar
                  address={summary.recipientAccount.address}
                  size={24}
                  style={styles.avatar}
                />

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
            <Text style={[styles.label]}>
              {i18next.t('sendToken.tokenSelect.tokenIDFieldLabel')}
            </Text>

            <View style={[styles.row]}>
              <Text style={[styles.valueText, styles.theme.valueText]}>
                {summary.token?.symbol}
              </Text>

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

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>
              {i18next.t('sendToken.tokenSelect.priorityFieldLabel')}
            </Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {i18next.t(PRIORITY_NAMES_MAP[summary.priority])}
            </Text>
          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>
              {i18next.t('sendToken.tokenSelect.transactionFeeLabel')}
            </Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {summary.transactionFee} {summary.token?.symbol}
            </Text>
          </View>

          <View style={[styles.fieldRow]}>
            <Text style={[styles.label]}>
              {i18next.t('sendToken.tokenSelect.initializationFeeLabel')}
            </Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {summary.initializationFee?.data} {summary.token?.symbol}
            </Text>
          </View>

          <View style={[styles.fieldRow, { borderBottomColor: 'transparent' }]}>
            <Text style={[styles.label]}>{i18next.t('sendToken.tokenSelect.cmmFeeLabel')}</Text>

            <Text style={[styles.valueText, styles.theme.valueText]}>
              {summary.cmmFee?.data} {summary.token?.symbol}
            </Text>
          </View>
        </View>

        <View style={[styles.buttonsContainer]}>
          <Button
            style={{ marginRight: 16, flex: 1 }}
            onClick={prevStep}
            title={i18next.t('sendToken.summary.prevStepButtonText')}
          />

          <PrimaryButton
            noTheme
            onClick={() => setShowSendTokenSummaryModal(true)}
            title={i18next.t('sendToken.summary.submitTransactionButtonText')}
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
