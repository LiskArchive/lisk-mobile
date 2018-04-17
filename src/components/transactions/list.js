import React, { Fragment } from 'react';
import { List, ListView } from 'react-native-elements'
import Item from './item';

export default ({ transactions, account, navigate, pending }) =>
  (<List containerStyle={{marginTop: 0}}>
    {
      pending.map((tx, index) => <Item navigate={navigate}
        account={account} key={tx} tx={tx} index={index} />)
    }
    {
      transactions.map((tx, index) => <Item navigate={navigate}
        account={account} key={tx.id} tx={tx} index={index + (pending.length % 2)} />)
    }
  </List>);
