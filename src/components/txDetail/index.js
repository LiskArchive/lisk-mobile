import React, { Fragment } from 'react';
import { ScrollView, View, Image } from 'react-native';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import styles from './styles';
import Share from '../share';
import { B, P, H1, H3 } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import Avatar from '../avatar';
import transactions from '../../constants/transactions';
import src from '../../assets/images/txDetail2x.png';

const txTypes = ['accountInitialization', 'setSecondPassphrase', 'registerDelegate', 'vote'];

const TxDetail = ({ navigation }) => {
  const tx = navigation.getParam('tx', null);
  const account = navigation.getParam('account', null);
  let arrowStyle;
  let amountStyle;
  let secondAddress = tx.recipientId;
  let amountSign = '-';

  if ((account !== tx.senderId) && tx.type === 0) {
    arrowStyle = styles.reverseArrow;
    amountStyle = styles.incoming;
    secondAddress = tx.senderId;
    amountSign = '';
  }

  return (<ScrollView style={styles.container}>
    <H1 style={styles.title}>Transaction details</H1>
    <View style={styles.senderAndRecipient}>
      <View style={styles.row}>
      { tx.type !== 0 || (tx.recipientId === tx.senderId) ?
        <Image style={{ width: 50, height: 50 }} source={transactions[txTypes[tx.type]].image} /> :
        <Fragment>
          <Avatar address={account} size={50}/>
          <Image source={src} style={[styles.arrow, arrowStyle]} />
          <Avatar address={secondAddress} size={50}/>
          </Fragment>
      }
      </View>
      { tx.type !== 0 || (tx.recipientId === tx.senderId) ?
        <H3>{transactions[txTypes[tx.type]].title}</H3> :
        <H1 style={amountStyle}>
          {amountSign}
          <FormattedNumber>
            {fromRawLsk(tx.amount)}
          </FormattedNumber> Ⱡ
        </H1>
      }
      <FormattedDate format='MMM D, YYYY LTS' type={P} style={styles.date}>{ tx.timestamp }</FormattedDate>
    </View>
    <View style={styles.detailRow}>
      <Icon name='send' size={20} color='#74869B' style={styles.rowIcon} />
      <View style={styles.rowContent}>
        <P style={styles.label}>
        { tx.type !== 0 || (tx.recipientId === tx.senderId) ?
          <Fragment>Account address</Fragment> :
          <Fragment>Sender</Fragment>
        }
        </P>
        <View style={styles.addressContainer}>
          <Share type={B} value={tx.senderId} icon={true}
            style={[styles.value, styles.transactionId]} />
        </View>
      </View>
    </View>
    { tx.type !== 0 || (tx.recipientId === tx.senderId) ?
      null :
      <View style={styles.detailRow}>
        <Icon name='request' size={20} color='#74869B' style={styles.rowIcon} />
        <View style={styles.rowContent}>
          <P style={styles.label}>Recipient</P>
          <View style={styles.addressContainer}>
            <Share type={B} value={tx.recipientId} icon={true}
              style={[styles.value, styles.transactionId]} />
          </View>
        </View>
      </View>
    }
    <View style={styles.detailRow}>
      <Icon name='request' size={20} color='#74869B' style={styles.rowIcon} />
      <View style={styles.rowContent}>
        <P style={styles.label}>Transaction Fee</P>
        <B style={styles.value}>
          <FormattedNumber>{fromRawLsk(transactions[txTypes[tx.type]].fee)}</FormattedNumber> Ⱡ
        </B>
      </View>
    </View>
    {
      (tx.asset && tx.asset.data) ?
      <View style={styles.detailRow}>
        <Icon name='request' size={20} color='#74869B' style={styles.rowIcon} />
        <View style={styles.rowContent}>
          <P style={styles.label}>Reference</P>
          <B style={styles.value}>{ tx.asset.data }</B>
        </View>
      </View> : null
    }
    <View style={styles.detailRow}>
      <Icon name='request' size={20} color='#74869B' style={styles.rowIcon} />
      <View style={styles.rowContent}>
        <P style={styles.label}>Confirmations</P>
        <B style={styles.value}>{tx.confirmations || 'Not confirmed yet.'}</B>
      </View>
    </View>
    <View style={styles.detailRow}>
      <Icon name='request' size={20} color='#74869B' style={styles.rowIcon} />
      <View style={styles.rowContent}>
        <P style={styles.label}>Transaction ID</P>
        <View style={styles.addressContainer}>
          <Share type={B} value={tx.id} icon={true} style={[styles.value, styles.transactionId]} />
        </View>
      </View>
    </View>
  </ScrollView>);
};

export default TxDetail;
