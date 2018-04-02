import React, { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  title: {
    // alignItems: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 20
  },
  value: {
    paddingLeft: 20
  },
  divider: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: '#ccc'
  }
});

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
    <Text style={styles.value}>{ tx.amount }</Text>
  </View>);
}
