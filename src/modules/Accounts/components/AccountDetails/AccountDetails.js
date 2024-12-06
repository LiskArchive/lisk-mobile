import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
// import TransactionList from 'modules/Transactions/components/TransactionList/TransactionList';
// import TokenList from '../TokenList/TokenList';
import AccountCard from '../AccountCard/AccountCard';

import getAccountDetailsStyles from './AccountDetails.styles';

/**
 * Renders a account detailed information (personal data, tokens and transactions) given an address.
 * @param {Object} account - Account to which render its information.
 */
export default function AccountDetails({ account }) {
  const { styles } = useTheme({ styles: getAccountDetailsStyles() });

  return (
    <View style={[styles.container]}>
      <AccountCard account={account} />

      <View></View>

      {/* <TokenList
        mode="overview"
        address={account.address}
        style={{ container: styles.tokenListContainer }}
      />

      <TransactionList
        mode="overview"
        address={account.address}
        style={{ container: styles.transactionListContainer }}
      /> */}
    </View>
  );
}
