import React from 'react';
import { List as NativeList } from 'react-native-elements';
import Item from './item';
import styles from './styles';

const List = ({
  transactions, account, navigate, pending,
}) =>
  (<NativeList containerStyle={styles.nativeList}>
    {
      pending.map(tx => <Item navigate={navigate}
        account={account} key={tx} tx={tx} />)
    }
    {
      transactions.map(tx => <Item navigate={navigate}
        account={account} key={tx.id} tx={tx} />)
    }
  </NativeList>);

export default List;
