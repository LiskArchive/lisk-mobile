import React from 'react';
import { View } from 'react-native';
import Item from './item';
import withTheme from '../withTheme';
import getStyles from './styles';

const List = ({
  styles, theme, transactions, account, navigate, pending, incognito,
}) =>
  (<View style={styles.nativeList}>
    {
      pending.map(tx => <Item navigate={navigate} incognito={incognito}
        account={account} key={tx} tx={tx} theme={theme} />)
    }
    {
      transactions.map(tx => <Item navigate={navigate} incognito={incognito}
        account={account} key={tx.id} tx={tx} theme={theme} />)
    }
  </View>);

export default withTheme(List, getStyles());
