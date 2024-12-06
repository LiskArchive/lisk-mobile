import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'contexts/ThemeContext';
import AccountList from 'modules/Accounts/components/AccountList';
import MigrateToL2Card from 'modules/Accounts/components/MigrateToL2Card/MigrateToL2Card';
import LiskMobileLogoSvg from 'assets/svgs/LiskMobileLogoSvg';
import getStyles from './styles';

export default function MigrateToL2Screen() {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getStyles(),
  });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <View style={[styles.headerLogoContainer, styles.theme.headerLogoContainer]}>
        <LiskMobileLogoSvg />
      </View>
      <MigrateToL2Card style={styles.migrateToL2Card} />
      <AccountList
        mode="screen"
        onEditAccountClick={(account) =>
          navigation.navigate({ name: 'EditAccount', params: account })
        }
        onDeleteAccountClick={(account) =>
          navigation.navigate({ name: 'DeleteAccount', params: account })
        }
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
