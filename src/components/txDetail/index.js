import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import styles from './styles';
import CopyToClipBoard from '../copyToClipboard';
import { H4, P } from '../toolBox/typography';

const TxDetail = ({ navigation }) => {
  const tx = navigation.getParam('tx', null);
  return (<View style={styles.container}>
    <H4 style={styles.title}>Transaction ID :</H4>
    <CopyToClipBoard type={P} style={styles.value} value={tx.id} icon={true} />
    <Divider style={styles.divider} />
    <H4 style={styles.title}>Sender :</H4>
    <CopyToClipBoard type={P} style={styles.value} value={tx.senderId} icon={true} />
    <Divider style={styles.divider} />
    <H4 style={styles.title}>Recipient :</H4>
    <CopyToClipBoard type={P} style={styles.value} value={tx.recipientId} icon={true} />
    <Divider style={styles.divider} />
    <H4 style={styles.title}>Amount :</H4>
    <P style={styles.value}>
      <FormattedNumber>{fromRawLsk(tx.amount)}</FormattedNumber> LSK
    </P>
    <Divider style={styles.divider} />
    <H4 style={styles.title}>Date :</H4>
    <FormattedDate style={styles.value}>{ tx.timestamp }</FormattedDate>
    {tx.asset.data ? <View>
      <Divider style={styles.divider} />
      <H4 style={styles.title}>reference :</H4>
      <P style={styles.value}>{ tx.asset.data }</P>
    </View> : null}
  </View>);
};

export default TxDetail;
