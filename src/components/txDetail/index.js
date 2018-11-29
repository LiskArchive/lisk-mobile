import React, { Fragment } from 'react';
import { ScrollView, View, Image } from 'react-native';
import FormattedDate from '../formattedDate';
import withTheme from '../withTheme';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { B, P, H1, H3 } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import Avatar from '../avatar';
import transactions from '../../constants/transactions';
import Blur from '../transactions/blur';
import arrowLight from '../../assets/images/txDetail/arrow-light2x.png';
import arrowDark from '../../assets/images/txDetail/arrow-dark2x.png';
import getStyles from './styles';
import { colors, themes } from '../../constants/styleGuide';

const txTypes = ['accountInitialization', 'setSecondPassphrase', 'registerDelegate', 'vote'];

const TxDetail = ({ navigation, styles, theme }) => {
  const tx = navigation.getParam('tx', null);
  const account = navigation.getParam('account', null);
  const incognito = navigation.getParam('incognito', null);
  let arrowStyle;
  let amountStyle = [styles.outgoing, styles.theme.outgoing];
  let secondAddress = tx.recipientId;
  let amountSign = '-';
  let direction = 'outgoing';

  if ((account !== tx.senderId) && tx.type === 0) {
    arrowStyle = styles.reverseArrow;
    amountStyle = [styles.incoming, styles.theme.incoming];
    secondAddress = tx.senderId;
    amountSign = '';
    direction = 'incoming';
  }

  const normalizedAmount = fromRawLsk(tx.amount);

  return (<ScrollView style={[styles.container, styles.theme.container]}>
    <H1 style={[styles.title, styles.theme.title]}>Transaction details</H1>
    <View style={[styles.senderAndRecipient, styles.theme.senderAndRecipient]}>
      <View style={styles.row}>
      { tx.type !== 0 || (tx.recipientId === tx.senderId) ?
        <Image
          style={{ width: 50, height: 50 }}
          source={transactions[txTypes[tx.type]].image(theme)}
        /> :
        <Fragment>
          <Avatar address={account} size={50}/>
          {
            theme === themes.light ?
              <Image source={arrowLight} style={[styles.arrow, arrowStyle]} /> :
              <Image source={arrowDark} style={[styles.arrow, arrowStyle]} />
          }
          <Avatar address={secondAddress} size={50}/>
        </Fragment>
      }
      </View>
      { tx.type !== 0 || (tx.recipientId === tx.senderId) ?
        <H3 style={amountStyle}>{transactions[txTypes[tx.type]].title}</H3> : null
      }
      {
        tx.type === 0 && (tx.recipientId !== tx.senderId) && !incognito ?
          <H1 style={amountStyle}>
            {amountSign}
            <FormattedNumber>
              {fromRawLsk(tx.amount)}
            </FormattedNumber>
          </H1> : null
      }
      {
        tx.type === 0 && (tx.recipientId !== tx.senderId) && incognito ?
          <Blur value={normalizedAmount} direction={direction} style={styles.amountBlur} /> : null
      }
      {
        tx.timestamp ?
          <FormattedDate format='MMM D, YYYY LTS' type={P} style={[styles.date, styles.theme.date]}>{ tx.timestamp }</FormattedDate> : null
      }
    </View>
    <View style={[styles.detailRow, styles.theme.detailRow]}>
      <Icon name='send' size={22} style={styles.rowIcon}
      color={colors[theme].gray2} />
      <View style={styles.rowContent}>
        <P style={[styles.label, styles.theme.label]}>
        { tx.type !== 0 || (tx.recipientId === tx.senderId) ?
          <Fragment>Account address</Fragment> :
          <Fragment>Sender</Fragment>
        }
        </P>
        <View style={styles.addressContainer}>
          <Share type={B} value={tx.senderId} icon={true}
            style={[styles.value, styles.theme.value, styles.transactionId]} />
        </View>
      </View>
    </View>
    { tx.type !== 0 || (tx.recipientId === tx.senderId) ?
      null :
      <View style={[styles.detailRow, styles.theme.detailRow]}>
        <Icon name='recipient' size={22} style={styles.rowIcon}
        color={colors[theme].gray2} />
        <View style={styles.rowContent}>
          <P style={[styles.label, styles.theme.label]}>Recipient</P>
          <View style={styles.addressContainer}>
            <Share type={B} value={tx.recipientId} icon={true}
              style={[styles.value, styles.theme.value, styles.transactionId]} />
          </View>
        </View>
      </View>
    }
    <View style={[styles.detailRow, styles.theme.detailRow]}>
      <Icon name='tx-fee' size={22} style={styles.rowIcon}
      color={colors[theme].gray2} />
      <View style={styles.rowContent}>
        <P style={[styles.label, styles.theme.label]}>Transaction Fee</P>
        <B style={[styles.value, styles.theme.value]}>
          <FormattedNumber>{fromRawLsk(transactions[txTypes[tx.type]].fee)}</FormattedNumber>
        </B>
      </View>
    </View>
    {
      (tx.asset && tx.asset.data) ?
      <View style={[styles.detailRow, styles.theme.detailRow]}>
        <Icon name='reference' size={22} style={styles.rowIcon}
        color={colors[theme].gray2} />
        <View style={styles.rowContent}>
          <P style={[styles.label, styles.theme.label]}>Reference</P>
          <B style={[styles.value, styles.theme.value]}>{ tx.asset.data }</B>
        </View>
      </View> : null
    }
    <View style={[styles.detailRow, styles.theme.detailRow]}>
      <Icon name='confirmation' size={22} style={styles.rowIcon}
      color={colors[theme].gray2} />
      <View style={styles.rowContent}>
        <P style={[styles.label, styles.theme.label]}>Confirmations</P>
        <B style={[styles.value, styles.theme.value]}>{tx.confirmations || 'Not confirmed yet.'}</B>
      </View>
    </View>
    <View style={[styles.detailRow, styles.theme.detailRow]}>
      <Icon name='tx-id' size={22} style={styles.rowIcon}
      color={colors[theme].gray2} />
      <View style={styles.rowContent}>
        <P style={[styles.label, styles.theme.label]}>Transaction ID</P>
        <View style={styles.addressContainer}>
          <Share type={B} value={tx.id} icon={true}
            style={[styles.value, styles.theme.value, styles.transactionId]} />
        </View>
      </View>
    </View>
  </ScrollView>);
};

export default withTheme(TxDetail, getStyles());
