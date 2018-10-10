import React from 'react';
import { View } from 'react-native';
import Item from './item';
import styles from './styles';

const List = ({
  transactions, account, navigate, pending,
}) =>
  (<View style={styles.nativeList}>
    {
      pending.map(tx => <Item navigate={navigate}
        account={account} key={tx} tx={tx} />)
    }
    {
      transactions.map(tx => <Item navigate={navigate}
        account={account} key={tx.id} tx={tx} />)
    }
  </View>);

export default List;
