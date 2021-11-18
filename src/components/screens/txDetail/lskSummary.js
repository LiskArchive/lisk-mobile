import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import FormattedDate from '../../shared/formattedDate';
import withTheme from '../../shared/withTheme';
import { P } from '../../shared/toolBox/typography';
import { getTxConstant, isTransfer } from '../../../constants/transactions';
import getStyles from './styles';

const getConfig = (styles, tx, accountAddress) => {
  if (accountAddress !== tx.senderAddress && isTransfer(tx)) {
    return {
      arrowStyle: styles.reverseArrow,
      amountStyle: [styles.incoming, styles.theme.incoming],
      firstAddress: tx.recipientAddress,
      secondAddress: tx.senderAddress,
      amountSign: '',
      direction: 'incoming'
    };
  }
  return {
    arrowStyle: null,
    amountStyle: [styles.outgoing, styles.theme.outgoing],
    firstAddress: tx.senderAddress,
    secondAddress: tx.recipientAddress,
    amountSign: '-',
    direction: 'outgoing'
  };
};

const Graphics = ({ tx, theme }) => (
  <Image style={{ width: 35, height: 35 }} source={getTxConstant(tx).image(theme)} />
);

const TimeStamp = ({ timestamp, styles }) => {
  if (timestamp) {
    return (
      <FormattedDate format="MMM D, YYYY LTS" type={P} style={[styles.date, styles.theme.date]}>
        {timestamp * 1000}
      </FormattedDate>
    );
  }

  return null;
};

const LskSummary = ({
  styles, theme, t, tx, accountAddress
}) => {
  const config = getConfig(styles, tx, accountAddress);
  return (
    <View style={[styles.senderAndRecipient, styles.theme.senderAndRecipient]}>
      <View style={styles.titleContainer}>
        <View>
          <P style={[styles.transactionTitle, styles.theme.transactionTitle]}>
            {t(getTxConstant(tx).title)}
          </P>
          <TimeStamp timestamp={tx.timestamp} styles={styles} />
        </View>
        <Graphics styles={styles} tx={tx} theme={theme} config={config} />
      </View>
    </View>
  );
};

export default withTheme(translate()(LskSummary), getStyles());
