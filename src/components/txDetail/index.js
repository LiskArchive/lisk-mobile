import React, { Fragment } from 'react';
import { View } from 'react-native';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import styles from './styles';
import Share from '../share';
import { H4, P, H1 } from '../toolBox/typography';
import Avatar from '../avatar';
import transactions from '../../constants/transactions';

const txTypes = ['send', 'setSecondPassphrase', 'registerDelegate', 'vote'];

const TxDetail = ({ navigation }) => {
  const tx = navigation.getParam('tx', null);
  return (<View style={styles.container}>
    <H1 style={styles.title}>Transaction details</H1>
    <View style={styles.senderAndRecipient}>
      <View style={styles.row}>
        <P style={styles.label}>Sender</P>
        <View style={styles.addressContainer}>
          <Avatar address={tx.senderId} style={styles.avatar} size={50}/>
          <Share type={H4} value={tx.senderId} icon={true} />
        </View>
      </View>
      {
        tx.type === 0 ?
        <View style={styles.row}>
          <P style={styles.label}>Recipient</P>
          <View style={styles.addressContainer}>
            <Avatar address={tx.recipientId} style={styles.avatar} size={50}/>
            <Share type={H4} value={tx.recipientId} icon={true} />
          </View>
        </View> : null
      }
    </View>
    {
      tx.type === 0 ?
      <Fragment>
        <P style={styles.label}>Amount</P>
        <H4 style={styles.value}>
          <FormattedNumber>{fromRawLsk(tx.amount)}</FormattedNumber> Ⱡ
        </H4>
      </Fragment> :
      <Fragment>
        <P style={styles.label}>Type</P>
        <H4 style={styles.value}>{transactions[txTypes[tx.type]].title}</H4>
      </Fragment>
    }
    <P style={styles.label}>Fee</P>
    <H4 style={styles.value}>
      <FormattedNumber>{fromRawLsk(transactions[txTypes[tx.type]].fee)}</FormattedNumber> Ⱡ
    </H4>
    {
      tx.confirmations ?
      <Fragment>
        <P style={styles.label}>Date</P>
        <FormattedDate format='MMM D, YYYY - LTS' type={H4} style={styles.value}>{ tx.timestamp }</FormattedDate>
      </Fragment> : null
    }
    {
      (tx.asset && tx.asset.data) ?
      <View>
        <P style={styles.label}>Reference</P>
        <H4 style={styles.value}>{ tx.asset.data }</H4>
      </View> : null
    }
    <P style={styles.label}>Confirmations</P>
    <H4 style={styles.value}>{tx.confirmations || 'Not confirmed yet.'}</H4>
    <P style={styles.label}>Transaction ID</P>
    <View style={styles.addressContainer}>
      <Share type={H4} value={tx.id} icon={true} style={[styles.value, styles.transactionId]} />
    </View>
  </View>);
};

export default TxDetail;
