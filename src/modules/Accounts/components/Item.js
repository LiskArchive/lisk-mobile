/* eslint-disable complexity */
/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { translate } from 'react-i18next';
import { fromRawLsk } from 'utilities/conversions';
import { stringShortener } from 'utilities/helpers';
import { getTxConstant, isTransfer } from 'modules/SendToken/constants';
import loadingAnimation from 'assets/animations/loading-dots.json';
import { Blur } from 'components/shared/blur';
import FormattedNumber from 'components/shared/formattedNumber';
import FormattedDate from 'components/shared/formattedDate';
import { B, Small } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import { useSelector } from 'react-redux';
import Symbol from './Symbol';
import getStyles from './styles';

const TimeStamp = ({
  styles,
  language,
  tx,
  t,
}) => {
  if (typeof tx.timestamp !== 'number') {
    return (
      <Small style={[styles.date, styles.theme.date]}>
        {t('Pending confirmation')}
      </Small>
    );
  }

  return (
    <FormattedDate
      locale={language}
      type={Small}
      style={[styles.date, styles.theme.date]}
    >
      {tx.timestamp * 1000}
    </FormattedDate>
  );
};

const Item = ({
  styles,
  theme,
  tx,
  t,
  activeToken,
  account,
  followedAccounts,
  discrete,
  navigate,
}) => {
  const animation = useRef();
  const language = useSelector(state => state.settings.language);

  useEffect(() => {
    if (typeof tx.timestamp !== 'number') {
      animation.current.play();
    }
  }, []);

  const showDetail = () => {
    navigate('TransactionDetails', { tx, account, discrete });
  };

  const getAddressText = address => {
    if (address === 'Unparsed Address') {
      return t('Unparsed Address');
    }

    return stringShortener(address, 6, 5);
  };

  let direction = 'incoming';
  let address = tx.senderAddress;

  if (account === tx.senderAddress && isTransfer(tx)) {
    direction = 'outgoing';
    address = tx.recipientAddress;
  }

  let addressText = getAddressText(address);

  const followedAccount = followedAccounts?.[activeToken]?.find(
    fa => fa.address === address
  );
  if (followedAccount) {
    addressText = followedAccount.label;
  }

  const amount = direction === 'incoming'
    ? fromRawLsk(tx.amount)
    : `-${fromRawLsk(tx.amount)}`;

  return (
    <TouchableOpacity
      style={[styles.itemContainer, styles.theme.itemContainer]}
      onPress={showDetail}
      testID="transaction-item"
    >
      <View style={styles.innerContainer}>
        <View style={[styles.itemColumn, styles.avatarContainer]}>
          <Symbol
            token={activeToken}
            theme={theme}
            moduleAssetId={tx.moduleAssetId}
            direction={direction}
            address={address}
          />
        </View>
        <View style={styles.column}>
          <B style={[styles.address, styles.theme.address]}>
            {!isTransfer(tx)
              ? t(getTxConstant(tx).title)
              : addressText}
          </B>
          <TimeStamp
            styles={styles}
            language={language}
            tx={tx}
            t={t}
          />
        </View>
      </View>
      {isTransfer(tx) && (
        <View style={[styles.column, styles.amountWrapper]}>
          {(tx.recipientAddress === tx.senderAddress)
            || discrete ? null : (
            <View style={[styles[direction], styles.theme[direction]]}>
              <FormattedNumber
                trim={true}
                tokenType={activeToken}
                type={B}
                style={[
                  styles[`${direction}Amount`],
                  styles.theme[`${direction}Amount`],
                ]}
                language={language}
              >
                {amount}
              </FormattedNumber>
            </View>
            )}
          {tx.recipientAddress !== tx.senderAddress && discrete ? (
            <Blur value={amount} direction={direction} />
          ) : null}
          {
            (typeof tx.timestamp !== 'number') && (
              <View style={styles.pendingIcon}>
                <LottieView
                  source={loadingAnimation}
                  ref={animation}
                  style={{}}
                />
              </View>
            )
          }
        </View>
      )}
    </TouchableOpacity>
  );
};

export default withTheme(translate()(Item), getStyles());
