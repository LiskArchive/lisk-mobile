import React from 'react';
import { View } from 'react-native';
import Item from './item';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';

const List = ({
  styles,
  theme,
  transactions,
  account,
  activeToken,
  followedAccounts,
  navigate,
  pending,
  incognito,
}) => (
  <View style={styles.nativeList}>
    {pending.map(tx => (
      <Item
        key={tx}
        navigate={navigate}
        incognito={incognito}
        account={account}
        activeToken={activeToken}
        followedAccounts={followedAccounts}
        tx={tx}
        theme={theme}
      />
    ))}
    {transactions.map(tx => (
      <Item
        key={tx.id}
        navigate={navigate}
        incognito={incognito}
        account={account}
        activeToken={activeToken}
        followedAccounts={followedAccounts}
        tx={tx}
        theme={theme}
      />
    ))}
  </View>
);

export default withTheme(List, getStyles());
