import React from 'react';
import { View } from 'react-native';
import { fromRawLsk } from 'utilities/conversions';
import { colors } from 'constants/styleGuide';
import FormattedDate from 'components/shared/formattedDate';
import withTheme from 'components/shared/withTheme';
import Icon from 'components/shared/toolBox/icon';
import FormattedNumber from 'components/shared/formattedNumber';
import { P, H3 } from 'components/shared/toolBox/typography';
import Blur from 'components/shared/blur';
import getStyles from './styles';

const BtcSummary = ({
  styles,
  theme,
  tx,
  accountAddress,
  incognito,
  language,
}) => {
  const amount = fromRawLsk(tx.amount);
  let amountStyle = [styles.outgoing, styles.theme.outgoing];
  let amountSign = '-';
  let direction = 'outgoing';

  if (accountAddress !== tx.senderAddress && tx.type === 0) {
    amountStyle = [styles.incoming, styles.theme.incoming];
    amountSign = '';
    direction = 'incoming';
  }

  return (
    <View style={[styles.senderAndRecipient, styles.theme.senderAndRecipient]}>
      <View style={styles.row}>
        <View
          style={[styles.transactionIcon, styles.theme[`${direction}Symbol`]]}
        >
          <Icon
            name={direction}
            size={14}
            color={
              direction === 'outgoing'
                ? colors[theme].outgoingArrow
                : colors[theme].ufoGreen
            }
          />
        </View>
      </View>
      {!incognito ? (
        <H3 style={amountStyle}>
          {amountSign}
          <FormattedNumber tokenType="BTC" language={language}>
            {fromRawLsk(tx.amount)}
          </FormattedNumber>
        </H3>
      ) : (
        <Blur value={amount} direction={direction} style={styles.amountBlur} />
      )}
      {tx.timestamp ? (
        <FormattedDate
          format="MMM D, YYYY LTS"
          type={P}
          style={[styles.date, styles.theme.date]}
        >
          {tx.timestamp}
        </FormattedDate>
      ) : null}
    </View>
  );
};

export default withTheme(BtcSummary, getStyles());
