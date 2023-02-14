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
 * @TODO - Implement this component.
 * (details on https://github.com/LiskHQ/lisk-mobile/issues/1601).
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

  if (!bookmarkAccount) {
    return null;
  }

  const account = { ...bookmarkAccount, username: bookmarkAccount.label };

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title="Account details" onPress={navigation.goBack} />

      <AccountDetails account={account} />
    </SafeAreaView>
  );
}
