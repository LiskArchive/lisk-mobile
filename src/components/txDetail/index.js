import React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import styles from './styles';
import CopyToClipBoard from '../copyToClipboard';

const TxDetail = ({ navigation }) => {
  const tx = navigation.getParam('tx', null);
  return (<View style={styles.container}>
    <Text h4 style={styles.title}>Transaction ID :</Text>
    <CopyToClipBoard style={styles.value} value={tx.id} icon={true} />
    <Divider style={styles.divider} />
    <Text h4 style={styles.title}>Sender :</Text>
    <CopyToClipBoard style={styles.value} value={tx.senderId} icon={true} />
    <Divider style={styles.divider} />
    <Text h4 style={styles.title}>Recipient :</Text>
    <CopyToClipBoard style={styles.value} value={tx.recipientId} icon={true} />
    <Divider style={styles.divider} />
    <Text h4 style={styles.title}>Amount :</Text>
    <Text style={styles.value}>
      <FormattedNumber>{fromRawLsk(tx.amount)}</FormattedNumber> LSK
    </Text>
    <Divider style={styles.divider} />
    <Text h4 style={styles.title}>Date :</Text>
    <FormattedDate style={styles.value}>{ tx.timestamp }</FormattedDate>
    {tx.asset.data ? <View>
      <Divider style={styles.divider} />
      <Text h4 style={styles.title}>reference :</Text>
      <Text style={styles.value}>{ tx.asset.data }</Text>
    </View> : null}
  </View>);
};

export default TxDetail;
