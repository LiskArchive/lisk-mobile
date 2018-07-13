import React from 'react';
import { View, Share } from 'react-native';
import Icon from '../toolBox/icons';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import styles from './styles';
import CopyToClipBoard from '../copyToClipboard';
import { H4, P, H1 } from '../toolBox/typography';
import Avatar from '../avatar';

const TxDetail = ({ navigation }) => {
  const tx = navigation.getParam('tx', null);
  return (<View style={styles.container}>
    <H1 style={styles.title}>Transaction details</H1>
    <View style={styles.senderAndRecipient}>
      <View style={styles.row}>
        <P style={styles.label}>Sender</P>
        <View style={styles.addressContainer}>
          <Avatar address={tx.senderId} style={styles.avatar} size={50}/>
          <CopyToClipBoard type={H4} value={tx.senderId} icon={true} />
        </View>
      </View>
      <View style={styles.row}>
        <P style={styles.label}>Recipient</P>
        <View style={styles.addressContainer}>
          <Avatar address={tx.recipientId} style={styles.avatar} size={50}/>
          <CopyToClipBoard type={H4} value={tx.recipientId} icon={true} />
        </View>
      </View>
    </View>
    <P style={styles.label}>Amount :</P>
    <H4 style={styles.value}>
    <FormattedNumber>{fromRawLsk(tx.amount)}</FormattedNumber> Ⱡ
    </H4>
    <P style={styles.label}>Date</P>
    <FormattedDate type={H4} style={styles.value}>{ tx.timestamp }</FormattedDate>
    {tx.asset.data ? <View>
      <P style={styles.label}>reference</P>
      <H4 style={styles.value}>{ tx.asset.data }</H4>
      </View> : null}
    <P style={styles.label}>Transaction ID</P>
    <View style={styles.addressContainer}>
      <H4 style={[styles.value, styles.transactionId]}>{tx.id}</H4>
      <Icon
      size={20}
      style={styles.shareIcon}
      onPress={() => {
        Share.share({
          message: tx.id,
          url: '',
        });
      }}
      name="share"
      />
    </View>
  </View>);
};

export default TxDetail;
