import React from 'react';
import { View, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import URLs from 'constants/URLs';
import { H2, P, A } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import AccountList from 'modules/Accounts/components/AccountList';
import LiskMobileLogoSvg from 'assets/svgs/LiskMobileLogoSvg';
import ExternalLinkSvg from 'assets/svgs/ExternalLinkSvg';
import getStyles from './styles';

export default function MigrateToL2Screen() {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getStyles(),
  });

  const handleOpenMigrationLink = () =>
    Linking.openURL(URLs.liskMigration).catch(() =>
      Toast.show({
        type: 'error',
        text2: 'Error opening link. Please try again later.',
      })
    );

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <View style={[styles.headerLogoContainer, styles.theme.headerLogoContainer]}>
        <LiskMobileLogoSvg />
      </View>

      <View style={[styles.announcementContainer, styles.theme.announcementContainer]}>
        <H2 style={[styles.title, styles.theme.title]}>Migrate to Lisk L2</H2>

        <P style={[styles.description, styles.theme.description]}>
          Lisk has moved to an L2 built on Optimism&apos;s OP Stack in 2024. Please migrate your
          accounts on
        </P>
        <View style={styles.linkContainer}>
          <A onPress={handleOpenMigrationLink} style={[styles.link, styles.theme.link]}>
            <ExternalLinkSvg size={1} style={styles.linkIcon} /> Lisk Portal
          </A>
        </View>
      </View>

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
