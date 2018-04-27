import React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';

const TxDetail = ({ navigation }) => {
  const tx = navigation.getParam('tx', null);

  return (<View style={styles.container}>
    <Text h4 style={styles.title}>Transaction ID :</Text>
    <Text style={styles.value}>{ tx.id }</Text>
    <Divider style={styles.divider} />
    <Text h4 style={styles.title}>Sender :</Text>
    <Text style={styles.value}>{ tx.senderId }</Text>
    <Divider style={styles.divider} />
    <Text h4 style={styles.title}>Recipient :</Text>
    <Text style={styles.value}>{ tx.recipientId }</Text>
    <Divider style={styles.divider} />
    <Text h4 style={styles.title}>Amount :</Text>
    <Text style={styles.value}>{ `${fromRawLsk(tx.amount)} LSK` }</Text>
    <Divider style={styles.divider} />
    <Text h4 style={styles.title}>Date :</Text>
    <FormattedDate style={styles.value}>{ tx.timestamp }</FormattedDate>
  </View>);
};

export default TxDetail;
