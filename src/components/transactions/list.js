import React from 'react';
import { List as NativeList } from 'react-native-elements';
import Item from './item';
import styles from './styles';

const List = ({
  transactions, account, navigate, pending,
}) =>
  (<NativeList containerStyle={styles.contaier}>
    {
      pending.map((tx, index) => <Item navigate={navigate}
        account={account} key={tx} tx={tx} index={index} />)
    }
    {
      transactions.map((tx, index) => <Item navigate={navigate}
        account={account} key={tx.id} tx={tx} index={index + (pending.length % 2)} />)
    }
  </NativeList>);

export default List;
