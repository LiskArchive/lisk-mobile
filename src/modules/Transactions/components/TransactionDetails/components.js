/* eslint-disable max-statements */
import React, { useRef, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useTokenMetaQuery } from 'modules/BlockchainApplication/api/useTokenMetaQuery';
import { LabelButton } from 'components/shared/toolBox/button';
import { fromBaseToDisplayDenom } from 'utilities/conversions.utils';
import CopyToClipboard from 'components/shared/copyToClipboard';
import Avatar from 'components/shared/avatar';
import { P } from 'components/shared/toolBox/typography';
import ObjectViewer from 'components/shared/ObjectViewer/ObjectViewer';
import { stringShortener, setColorOpacity } from 'utilities/helpers';
import { colors } from 'constants/styleGuide';
import { useTransactionAssets } from '../../hooks/useTransactionAssets';
import { TRANSACTION_STATUS_NAMES } from '../../constants';
import TransactionTimestamp from '../TransactionTimestamp';

import getTransactionDetailsStyles from './styles';

export function TransactionDetailsBody({ transaction, address }) {
  const scrollViewRef = useRef();

  const [showParams, setShowParams] = useState(false);

  const navigation = useNavigation();

  const { data: tokenMetaData } = useTokenMetaQuery(transaction.params.tokenID);

  const transactionAssets = useTransactionAssets({ transaction, address });

  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  const addressIsSender = !!transactionAssets.amount?.sign;

  const displayedAddress = addressIsSender
    ? transaction.meta.recipient.address
    : transaction.sender.address;

  const fee = fromBaseToDisplayDenom({
    amount: transaction.fee,
    displayDenom: tokenMetaData?.data[0]?.displayDenom,
    denomUnits: tokenMetaData?.data[0]?.denomUnits,
    symbol: tokenMetaData?.data[0]?.symbol,
    withSymbol: true,
  });

  const handleAccountClick = () =>
    navigation.navigate({
      name: 'AccountDetails',
      key: displayedAddress,
      params: { address: displayedAddress },
    });

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() =>
        showParams && scrollViewRef.current.scrollToEnd({ animated: true })
      }
      style={[styles.container, styles.theme.container]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.section]}>
        <Text style={[styles.text, styles.theme.text, { marginBottom: 8 }]}>
          {transactionAssets.title}
        </Text>

        <TransactionTimestamp timestamp={transaction.block.timestamp} styles={styles} />
      </View>

      <View style={[styles.section, styles.row]}>
        <TouchableOpacity style={[styles.row]} onPress={handleAccountClick}>
          <View style={[styles.column]}>
            <Text style={[styles.label, styles.theme.label]}>
              {addressIsSender
                ? i18next.t('transactions.transactionDetails.recipientLabel')
                : i18next.t('transactions.transactionDetails.senderLabel')}
            </Text>

            <CopyToClipboard
              style={[styles.text, styles.theme.text]}
              labelStyle={[styles.text, styles.theme.text]}
              showIcon
              iconSize={18}
              value={displayedAddress}
              type={P}
              label={stringShortener(displayedAddress, 5, 5)}
            />
          </View>

          <Avatar address={displayedAddress} size={40} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.transactionFeeLabel')}
        </Text>

        <Text style={[styles.text, styles.theme.text]}>{fee}</Text>
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.nonceLabel')}
        </Text>

        <Text style={[styles.text, styles.theme.text]}>{transaction.nonce}</Text>
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.statusLabel')}
        </Text>

        <TransactionDetailsStatus status={transaction.executionStatus} />
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

        <Text style={[styles.text, styles.theme.text]}>{transaction.block.height}</Text>
      </View>

      <TransactionDetailsParams
        params={transaction.params}
        show={showParams}
        setShow={setShowParams}
      />
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
        {i18next.t(TRANSACTION_STATUS_NAMES[status]) || 'No status'}
      </Text>
    </View>
  );
}

function TransactionDetailsParams({ params, show, setShow }) {
  const { styles } = useTheme({ styles: getTransactionDetailsStyles() });

  return (
    <View style={[styles.section]}>
      <View style={[styles.row]}>
        <Text style={[styles.label, styles.theme.label]}>
          {i18next.t('transactions.transactionDetails.paramsLabel')}
        </Text>

        <LabelButton
          onClick={() => setShow((prevState) => !prevState)}
          textStyle={styles.showParamsButton}
        >
          {!show
            ? i18next.t('transactions.transactionDetails.showParamsButtonText')
            : i18next.t('transactions.transactionDetails.hideParamsButtonText')}
        </LabelButton>
      </View>
      {show && <ObjectViewer data={params} style={[styles.params, styles.theme.params]} />}
    </View>
  );
}
