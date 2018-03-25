import React, { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'left',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  value: {
    alignItems: 'right',
  }
});

export default ({ navigation }) => {
  const tx = navigation.getParam('tx', null);

  return (<View style={styles.container}>
    <Text h4 style={styles.title}>Transaction ID</Text>
    <Text style={styles.value}>{ tx.id }</Text>
    <Text h4 style={styles.title}>Sender</Text>
    <Text style={styles.value}>{ tx.senderId }</Text>
    <Text h4 style={styles.title}>Recipient</Text>
    <Text style={styles.value}>{ tx.recipientId }</Text>
    <Text h4 style={styles.title}>Amount</Text>
    <Text style={styles.value}>{ tx.amount }</Text>
  </View>);
}
