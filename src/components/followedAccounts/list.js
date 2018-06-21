import React from 'react';
import { List as NativeList } from 'react-native-elements';
import Item from './item';

const List = ({ followedAccounts, navigate, edit }) =>
  (<NativeList containerStyle={{ marginTop: 0 }}>
    {
      followedAccounts.map((account, index) =>
        <Item navigate={navigate} edit={edit}
          key={account.address} account={account} index={index} />)
    }
  </NativeList>);

export default List;
