import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import AccountCard from '../AccountCard/AccountCard';
import getAccountDetailsStyles from './AccountDetails.styles';
import MigrateToL2Card from '../MigrateToL2Card/MigrateToL2Card';

/**
 * Renders a account detailed information (personal data, tokens and transactions) given an address.
 * @param {Object} account - Account to which render its information.
 */
export default function AccountDetails({ account }) {
  const { styles } = useTheme({ styles: getAccountDetailsStyles() });

  return (
    <View style={[styles.container]}>
      <AccountCard account={account} />
      <MigrateToL2Card style={styles.migrateToL2Card} />
    </View>
  );
}
