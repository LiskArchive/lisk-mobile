import React, { Fragment } from 'react';
import { Lis, ListView } from 'react-native-elements'
import Item from './item';

export default ({ transactions, account, navigation, pending }) =>
  (<List containerStyle={{marginTop: 0}}>
    {
      pending.map(tx => <Item navigation={navigation} account={account} key={tx} tx={tx} />)
    }
    {
      transactions.map(tx => <Item navigation={navigation} account={account} key={tx.id} tx={tx} />)
    }
  </List>);
