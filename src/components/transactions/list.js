import React, { Fragment } from 'react';
import { List } from 'react-native-elements'
import Item from './item';

export default ({ transactions, account, navigation, pending }) =>
  (<List>
    {
      pending.map(tx => <Item navigation={navigation} account={account} tx={tx} />)
    }
    {
      transactions.map(tx => <Item navigation={navigation} account={account} tx={tx} />)
    }
  </List>);
