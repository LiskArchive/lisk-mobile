import React from 'react';
import { List as NativeList } from 'react-native-elements';
import Item from './item';

const List = ({ followedAccounts, navigate }) =>
  (<NativeList containerStyle={{ marginTop: 0 }}>
    {
      followedAccounts.map((address, index) => <Item navigate={navigate}
        key={address} address={address} index={index} />)
    }
  </NativeList>);

export default List;
