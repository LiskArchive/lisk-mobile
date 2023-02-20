import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { selectBookmarkList as selectBookmarkListSelector } from 'modules/Bookmark/store/selectors';

import getAccountDetailsScreenStyles from './AccountDetailsScreen.styles';
import AccountDetails from '../AccountDetails/AccountDetails';

/**
 * Renders an account details screen given an address by route params.
 */
export default function AccountDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { styles } = useTheme({ styles: getAccountDetailsScreenStyles() });

  const address = route.params?.address;

  const bookmarkedAccounts = useSelector(selectBookmarkListSelector);

  const bookmarkAccount = bookmarkedAccounts.find(
    (bookmarkedAccount) => bookmarkedAccount.address === address
  );

  const account = { address, name: bookmarkAccount?.label, ...bookmarkAccount };

  return (
    <SafeAreaView style={[styles.flex, styles.theme.container]}>
      <HeaderBackButton title="Account details" onPress={navigation.goBack} />
      <AccountDetails account={account} />
    </SafeAreaView>
  );
}
