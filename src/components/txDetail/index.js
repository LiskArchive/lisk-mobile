import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';

export default ({ navigation }) => {
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
    <Text h4 style={styles.title}>Date :</Text>
    <FormattedDate style={styles.value}>{ tx.timestamp }</FormattedDate>
  </View>);
}
