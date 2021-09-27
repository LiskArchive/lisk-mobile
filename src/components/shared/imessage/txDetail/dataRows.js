import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import FormattedDate from '../../formattedDate';
import { fromRawLsk } from '../../../../utilities/conversions';
import FormattedNumber from '../../formattedNumber';
import {
  B, P, H1, H3, A
} from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import Avatar from '../../avatar';
import { isTransfer, getTxConstant } from '../../../../constants/transactions';
import arrowLight from '../../../../assets/images/txDetail/arrow-light2x.png';
import arrowDark from '../../../../assets/images/txDetail/arrow-dark2x.png';
import { colors, themes } from '../../../../constants/styleGuide';

export const TimeStamp = ({ timestamp, styles }) => {
  if (timestamp) {
    return (
      <FormattedDate
        format="MMM D, YYYY LTS"
        type={P}
        style={[styles.date, styles.theme.date]}
      >
        {timestamp}
      </FormattedDate>
    );
  }

  return null;
};

export const TxAmount = ({
  config,
  tx,
  language,
}) => {
  if (isTransfer(tx) && tx.recipientAddress !== tx.senderAddress) {
    return (
      <H1 style={config.amountStyle}>
        {config.amountSign}
        <FormattedNumber language={language}>
          {tx.notRawLisk ? tx.amount : fromRawLsk(tx.amount)}
        </FormattedNumber>
      </H1>
    );
  }

  return null;
};

export const Sender = ({
  styles,
  tx,
}) => (
  <View style={[styles.detailRow, styles.theme.detailRow]}>
    <Icon
      name="send"
      size={22}
      style={styles.rowIcon}
      color={colors.light.slateGray}
    />
    <View style={styles.rowContent}>
      <P style={[styles.label, styles.theme.label]}>
        {tx.type !== 0 || tx.recipientAddress === tx.senderAddress ? (
          <Fragment>Account address</Fragment>
        ) : (
          <Fragment>Sender</Fragment>
        )}
      </P>
      <View style={styles.addressContainer}>
        <A
          value={tx.senderAddress}
          style={[
            styles.value,
            styles.theme.value,
            styles.transactionId,
          ]}
        >
          {tx.senderAddress}
        </A>
      </View>
    </View>
  </View>
);

export const Recipient = ({
  styles,
  tx,
}) => {
  if (tx.type !== 0 || tx.recipientAddress === tx.senderAddress) {
    return null;
  }
  return (
    <View style={[styles.detailRow, styles.theme.detailRow]}>
      <Icon
        name="recipient"
        size={22}
        style={styles.rowIcon}
        color={colors.light.slateGray}
      />
      <View style={styles.rowContent}>
        <P style={[styles.label, styles.theme.label]}>Recipient</P>
        <View style={styles.addressContainer}>
          <A
            value={tx.senderAddress}
            style={[
              styles.value,
              styles.theme.value,
              styles.transactionId,
            ]}
          >
            {tx.recipientAddress}
          </A>
        </View>
      </View>
    </View>
  );
};

export const Reference = ({
  tx,
  styles,
}) => {
  if (tx.asset && tx.asset.data) {
    return (
      <View style={[styles.detailRow, styles.theme.detailRow]}>
        <Icon
          name="reference"
          size={22}
          style={styles.rowIcon}
          color={colors.light.slateGray}
        />
        <View style={styles.rowContent}>
          <P style={[styles.label, styles.theme.label]}>Reference</P>
          <B
            style={[
              styles.value,
              styles.theme.value,
              styles.referenceValue,
            ]}
          >
            {tx.asset.data}
          </B>
        </View>
      </View>
    );
  }

  return null;
};

export const Graphics = ({
  styles,
  theme,
  config,
}) => (
  <View style={styles.row}>
    <Avatar address={config.firstAddress} size={50} />
    {theme === themes.light ? (
      <Image
        source={arrowLight}
        style={[styles.arrow, config.arrowStyle]}
      />
    ) : (
      <Image
        source={arrowDark}
        style={[styles.arrow, config.arrowStyle]}
      />
    )}
    <Avatar address={config.secondAddress} size={50} />
  </View>
);

export const TxTitle = ({
  tx,
  config,
}) => {
  if (!isTransfer(tx) || tx.recipientAddress === tx.senderAddress) {
    return (
    <H3 style={config.amountStyle}>
      {getTxConstant(tx).title}
    </H3>
    );
  }

  return null;
};

export const Confirmations = ({
  styles,
  tx,
}) => (
  <View style={[styles.detailRow, styles.theme.detailRow]}>
    <Icon
      name="confirmations"
      size={22}
      style={styles.rowIcon}
      color={colors.light.slateGray}
    />
    <View style={styles.rowContent}>
      <P style={[styles.label, styles.theme.label]}>Confirmations</P>
      <B style={[styles.value, styles.theme.value]}>
        {tx.confirmations || 'Not confirmed yet.'}
      </B>
    </View>
  </View>
);
