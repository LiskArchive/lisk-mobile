import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import FormattedDate from '../../shared/formattedDate';
import withTheme from '../../shared/withTheme';
import { fromRawLsk } from '../../../utilities/conversions';
import FormattedNumber from '../../shared/formattedNumber';
import { P, H3 } from '../../shared/toolBox/typography';
import Avatar from '../../shared/avatar';
import { getTxConstant, isTransfer } from '../../../constants/transactions';
import Blur from '../../shared/transactions/blur';
import arrowLight from '../../../assets/images/txDetail/arrow-light2x.png';
import arrowDark from '../../../assets/images/txDetail/arrow-dark2x.png';
import getStyles from './styles';
import { themes } from '../../../constants/styleGuide';

const getConfig = (styles, tx, accountAddress) => {
  if (accountAddress !== tx.senderAddress && isTransfer(tx)) {
    return {
      arrowStyle: styles.reverseArrow,
      amountStyle: [styles.incoming, styles.theme.incoming],
      firstAddress: tx.recipientAddress,
      secondAddress: tx.senderAddress,
      amountSign: '',
      direction: 'incoming',
    };
  }
  return {
    arrowStyle: null,
    amountStyle: [styles.outgoing, styles.theme.outgoing],
    firstAddress: tx.senderAddress,
    secondAddress: tx.recipientAddress,
    amountSign: '-',
    direction: 'outgoing',
  };
};

const Graphics = ({
  styles,
  tx,
  theme,
  config,
}) => (
  <View style={styles.row}>
    {!isTransfer(tx) || tx.recipientAddress === tx.senderAddress ? (
      <Image
        style={{ width: 40, height: 40 }}
        source={getTxConstant(tx).image(theme)}
      />
    ) : (
      <Fragment>
        <Avatar address={config.firstAddress} size={40} />
        {theme === themes.light ? (
          <Image source={arrowLight} style={[styles.arrow, config.arrowStyle]} />
        ) : (
          <Image source={arrowDark} style={[styles.arrow, config.arrowStyle]} />
        )}
        <Avatar address={config.secondAddress} size={40} />
      </Fragment>
    )}
  </View>
);

const TimeStamp = ({
  timestamp,
  styles,
}) => {
  if (timestamp) {
    return (
      <FormattedDate
          format="MMM D, YYYY LTS"
          type={P}
          style={[styles.date, styles.theme.date]}
        >
        {timestamp * 1000}
      </FormattedDate>
    );
  }

  return null;
};

const LskSummary = ({
  styles,
  theme,
  t,
  tx,
  accountAddress,
  incognito,
  language,
}) => {
  const amount = fromRawLsk(tx.amount);
  const config = getConfig(styles, tx, accountAddress);

  return (
    <View style={[styles.senderAndRecipient, styles.theme.senderAndRecipient]}>
      <Graphics
        styles={styles}
        tx={tx}
        theme={theme}
        config={config}
      />
      {!isTransfer(tx) || tx.recipientAddress === tx.senderAddress ? (
        <H3 style={config.amountStyle}>{t(getTxConstant(tx).title)}</H3>
      ) : null}
      {isTransfer(tx)
      && tx.recipientAddress !== tx.senderAddress
      && !incognito ? (
        <H3 style={config.amountStyle}>
          {config.amountSign}
          <FormattedNumber language={language}>
            {fromRawLsk(tx.amount)}
          </FormattedNumber>
        </H3>
        ) : null}
      {isTransfer(tx)
      && tx.recipientAddress !== tx.senderAddress
      && incognito ? (
        <Blur value={amount} direction={config.direction} style={styles.amountBlur} />
        ) : null}
      <TimeStamp
        timestamp={tx.timestamp}
        styles={styles}
      />
    </View>
  );
};

export default withTheme(translate()(LskSummary), getStyles());
