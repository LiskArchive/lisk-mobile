import React, { Fragment } from 'react';
import { List, ListView } from 'react-native-elements'
import Item from './item';

export default ({ followedAccounts, navigate }) =>
  (<List containerStyle={{marginTop: 0}}>
    {
      followedAccounts.map((address, index) => <Item navigate={navigate}
        key={address} address={address} index={index} />)
    }
  </List>);
