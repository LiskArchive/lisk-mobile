import React, { useRef, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { LabelButton } from 'components/shared/toolBox/button';
import { fromRawLsk } from 'utilities/conversions';
import { TimeStamp } from 'components/shared/imessage/txDetail/dataRows';
import CopyToClipboard from 'components/shared/copyToClipboard';
import Avatar from 'components/shared/avatar';
import { P } from 'components/shared/toolBox/typography';
import { stringShortener, setColorOpacity } from 'utilities/helpers';
import { colors } from 'constants/styleGuide';
import { useTransactionAssets } from '../../hooks/useTransactionAssets';
import { TRANSACTION_PARAMS_NAMES, TRANSACTION_STATUS_NAMES } from '../../constants';

import getTransactionDetailsStyles from './styles';

export function TransactionDetailsBody({ transaction }) {
  const transactionAssets = useTransactionAssets(transaction);

  const scrollViewRef = useRef();

  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      style={[styles.container, styles.theme.container]}
    >
      <View style={[styles.section]}>
        <Text style={[styles.text, styles.theme.text, { marginBottom: 8 }]}>
          {transactionAssets.title}
        </Text>

        <TimeStamp
          timestamp={transaction.block.timestamp}
          format="MMM D, YYYY h:mm:ss A"
          styles={styles}
        />
      </View>

      <View style={[styles.section, styles.row]}>
        <View style={[styles.column]}>
          <Text style={[styles.label, styles.theme.label]}>
            {i18next.t('transactions.transactionDetails.senderLabel')}
          </Text>

          <CopyToClipboard
            style={[styles.text, styles.theme.text]}
            labelStyle={[styles.text, styles.theme.text]}
            showIcon
            iconSize={18}
            value={transaction.sender.address}
            type={P}
            label={stringShortener(transaction.sender.address, 5, 5)}
          />
        </View>

        <Avatar
          address={transaction.sender.address}
          size={40}
        />
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.transactionFeeLabel')}
        </Text>

        <Text style={[styles.text, styles.theme.text]}>
          {fromRawLsk(transaction.fee)} LSK
        </Text>
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.nonceLabel')}
        </Text>

        <Text style={[styles.text, styles.theme.text]}>
          {transaction.nonce}
        </Text>
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.confirmationsLabel')}
        </Text>

        <Text style={[styles.text, styles.theme.text]}>
          {transaction.confirmations}
        </Text>
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.statusLabel')}
        </Text>

        <TransactionDetailsStatus />
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.transactionIDLabel')}
        </Text>

        <CopyToClipboard
          style={[styles.text, styles.theme.text]}
          labelStyle={[styles.text, styles.theme.text, { flex: 1 }]}
          showIcon
          iconSize={18}
          value={transaction.id}
          type={P}
          label={transaction.id}
        />
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.blockIDLabel')}
        </Text>

        <CopyToClipboard
          style={[styles.text, styles.theme.text]}
          labelStyle={[styles.text, styles.theme.text, { flex: 1 }]}
          showIcon
          iconSize={18}
          value={transaction.block.id}
          type={P}
          label={transaction.block.id}
        />
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.blockHeightLabel')}
        </Text>

        <Text style={[styles.text, styles.theme.text]}>
          {transaction.block.height}
        </Text>
      </View>

      <TransactionDetailsParams params={transaction.params}/>
    </ScrollView>
  );
}

function TransactionDetailsStatus({ status }) {
  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  let color;
  let backgroundColor;

  switch (status) {
    case 'success':
      color = colors.light.ufoGreen;
      backgroundColor = setColorOpacity(colors.light.ufoGreen, 0.15);
      break;

    case 'pending':
      color = colors.light.yellowCopacabana;
      backgroundColor = setColorOpacity(colors.light.yellowCopacabana, 0.15);
      break;

    case 'fail':
      color = colors.light.burntSieanna;
      backgroundColor = setColorOpacity(colors.light.burntSieanna, 0.15);
      break;

    default:
      color = colors.light.white;
      backgroundColor = colors.light.platinum;
      break;
  }

  return (
    <View style={[styles.statusContainer, { backgroundColor }]}>
      <Text style={[styles.statusText, { color }]}>
        {TRANSACTION_STATUS_NAMES[status] || 'No status'}
      </Text>
    </View>
  );
}

function TransactionDetailsParams({ params }) {
  const [show, setShow] = useState(false);

  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  const paramsEntries = Object.entries(params);

  return (
    <View style={[styles.section]}>
      <View style={[styles.row]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.paramsLabel')}
        </Text>

        <LabelButton
          onClick={() => setShow(prevState => !prevState)}
          textStyle={styles.showParamsButton}
        >
          {!show
            ? i18next.t('transactions.transactionDetails.showParamsButtonText')
            : i18next.t('transactions.transactionDetails.hideParamsButtonText')}
        </LabelButton>
      </View>

      {show && (
        paramsEntries.map(([paramKey, paramValue]) => (
          <>
            <Text style={[styles.label, styles.theme.label, { marginTop: 16 }]}>
              {TRANSACTION_PARAMS_NAMES[paramKey]}:
           </Text>

           <Text style={[styles.text, styles.theme.text]}>
             {paramValue}
           </Text>
          </>
        ))
      )}
    </View>
  );
}
