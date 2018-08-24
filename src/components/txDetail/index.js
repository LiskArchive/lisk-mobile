import React, { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import styles from './styles';
import Share from '../share';
import { B, P, H1 } from '../toolBox/typography';
import Avatar from '../avatar';
import transactions from '../../constants/transactions';

const txTypes = ['send', 'setSecondPassphrase', 'registerDelegate', 'vote'];

const TxDetail = ({ navigation }) => {
  const tx = navigation.getParam('tx', null);
  return (<ScrollView style={styles.container}>
    <H1 style={styles.title}>Transaction details</H1>
    <View style={styles.senderAndRecipient}>
      <View style={styles.row}>
        <P style={styles.label}>Sender</P>
        <View style={styles.addressContainer}>
          <Avatar address={tx.senderId} style={styles.avatar} size={50}/>
          <Share type={B} value={tx.senderId} icon={true} />
        </View>
      </View>
      {
        tx.type === 0 ?
        <View style={styles.row}>
          <P style={styles.label}>Recipient</P>
          <View style={styles.addressContainer}>
            <Avatar address={tx.recipientId} style={styles.avatar} size={50}/>
            <Share type={B} value={tx.recipientId} icon={true} />
          </View>
        </View> : null
      }
    </View>
    {
      tx.type === 0 ?
      <Fragment>
        <P style={styles.label}>Amount</P>
        <B style={styles.value}>
          <FormattedNumber>{fromRawLsk(tx.amount)}</FormattedNumber> Ⱡ
        </B>
      </Fragment> :
      <Fragment>
        <P style={styles.label}>Type</P>
        <B style={styles.value}>{transactions[txTypes[tx.type]].title}</B>
      </Fragment>
    }
    <P style={styles.label}>Fee</P>
    <B style={styles.value}>
      <FormattedNumber>{fromRawLsk(transactions[txTypes[tx.type]].fee)}</FormattedNumber> Ⱡ
    </B>
    {
      tx.confirmations ?
      <Fragment>
        <P style={styles.label}>Date</P>
        <FormattedDate format='MMM D, YYYY - LTS' type={B} style={styles.value}>{ tx.timestamp }</FormattedDate>
      </Fragment> : null
    }
    {
      (tx.asset && tx.asset.data) ?
      <View>
        <P style={styles.label}>Reference</P>
        <B style={styles.value}>{ tx.asset.data }</B>
      </View> : null
    }
    <P style={styles.label}>Confirmations</P>
    <B style={styles.value}>{tx.confirmations || 'Not confirmed yet.'}</B>
    <P style={styles.label}>Transaction ID</P>
    <View style={styles.addressContainer}>
      <Share type={B} value={tx.id} icon={true} style={[styles.value, styles.transactionId]} />
    </View>
  </ScrollView>);
};

export default TxDetail;
