import React from 'react';
import { View } from 'react-native';
import withTheme from 'components/shared/withTheme';
import Item from './Item';
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
  discrete,
}) => (
  <View style={styles.nativeList}>
    {pending.map((tx) => (
      <Item
        key={tx}
        navigate={navigate}
        discrete={discrete}
        account={account}
        activeToken={activeToken}
        followedAccounts={followedAccounts}
        tx={tx}
        theme={theme}
      />
    ))}
    {transactions.map((tx) => (
      <Item
        key={tx.id}
        navigate={navigate}
        discrete={discrete}
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
