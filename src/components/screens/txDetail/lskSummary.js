import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import FormattedDate from '../../shared/formattedDate';
import withTheme from '../../shared/withTheme';
import { fromRawLsk } from '../../../utilities/conversions';
import FormattedNumber from '../../shared/formattedNumber';
import { P, H3 } from '../../shared/toolBox/typography';
import Avatar from '../../shared/avatar';
import transactions from '../../../constants/transactions';
import Blur from '../../shared/transactions/blur';
import arrowLight from '../../../assets/images/txDetail/arrow-light2x.png';
import arrowDark from '../../../assets/images/txDetail/arrow-dark2x.png';
import getStyles from './styles';
import { themes } from '../../../constants/styleGuide';

const txTypes = ['accountInitialization', 'setSecondPassphrase', 'registerDelegate', 'vote'];

const LskSummary = ({
  styles, theme, t, tx, accountAddress, incognito,
}) => {
  const amount = fromRawLsk(tx.amount);
  let arrowStyle;
  let amountStyle = [styles.outgoing, styles.theme.outgoing];
  let firstAddress = tx.senderAddress;
  let secondAddress = tx.recipientAddress;
  let amountSign = '-';
  let direction = 'outgoing';

  if ((accountAddress !== tx.senderAddress) && tx.type === 0) {
    arrowStyle = styles.reverseArrow;
    amountStyle = [styles.incoming, styles.theme.incoming];
    firstAddress = tx.recipientAddress;
    secondAddress = tx.senderAddress;
    amountSign = '';
    direction = 'incoming';
  }

  return (
    <View style={[styles.senderAndRecipient, styles.theme.senderAndRecipient]}>
      <View style={styles.row}>
        {tx.type !== 0 || (tx.recipientAddress === tx.senderAddress) ?
          <Image
            style={{ width: 40, height: 40 }}
            source={transactions[txTypes[tx.type]].image(theme)}
          /> :
          <Fragment>
            <Avatar address={firstAddress} size={40} />
            {
              theme === themes.light ?
                <Image source={arrowLight} style={[styles.arrow, arrowStyle]} /> :
                <Image source={arrowDark} style={[styles.arrow, arrowStyle]} />
            }
            <Avatar address={secondAddress} size={40} />
          </Fragment>
        }
      </View>
      {
        tx.type !== 0 || (tx.recipientAddress === tx.senderAddress) ?
        <H3 style={amountStyle}>{t(transactions[txTypes[tx.type]].title)}</H3> : null
      }
      {
        tx.type === 0 && (tx.recipientAddress !== tx.senderAddress) && !incognito ?
          <H3 style={amountStyle}>
            {amountSign}
            <FormattedNumber>
              {fromRawLsk(tx.amount)}
            </FormattedNumber>
          </H3> : null
      }
      {
        tx.type === 0 && (tx.recipientAddress !== tx.senderAddress) && incognito ?
          <Blur
            value={amount}
            direction={direction}
            style={styles.amountBlur}
          /> : null
      }
      {
        tx.timestamp ?
          <FormattedDate
            format='MMM D, YYYY LTS'
            type={P}
            style={[styles.date, styles.theme.date]}
          >
            {tx.timestamp}
          </FormattedDate> : null
      }
    </View>
  );
};

export default withTheme(translate()(LskSummary), getStyles());
