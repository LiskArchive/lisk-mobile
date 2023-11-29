import React, { useContext, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import i18next from 'i18next';

import { ModalContext } from 'contexts/ModalContext';
import { useExternalApplicationSignatureRequest } from 'modules/BlockchainApplication/hooks/useExternalApplicationSignatureRequest';
import AccountHomeScreen from 'modules/Accounts/components/AccountHome/AccountHome';
import BlockchainApplicationsExplorer from 'modules/BlockchainApplication/components/ApplicationsExplorer';
import BookmarksScreen from 'modules/Bookmark';
import SettingsScreen from 'modules/Settings/components/SettingsScreen/SettingsScreen';
import { getTabBarIcon } from '../../navigation.utils';
import { getNavigationTabBarStyles } from '../Navigator/Navigator.styles';
import { useIndexStatusQuery } from '../../../utilities/api/hooks/useIndexStatusQuery';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { isOpen: modalOpen } = useContext(ModalContext);
  const toastOpen = useRef();
  const navigation = useNavigation();
  useExternalApplicationSignatureRequest(navigation);

  const { isRefetching, data } = useIndexStatusQuery();

  const { percentageIndexed, chainLength, numBlocksIndexed } = data?.data ?? {};

  const showIndexStatusAlert = () => {
    // Take a difference of latest chain length against blocks indexed to show the notification
    if (chainLength - numBlocksIndexed >= 5) {
      toastOpen.current = true;
      Toast.show({
        type: 'info',
        text1: i18next.t('auth.syncing.inProgress', { percentageIndexed }),
        autoHide: false,
        topOffset: Platform.OS === 'ios' ? 50 : 0,
      });
    } else if (toastOpen.current) {
      toastOpen.current = false;
      Toast.hide();
    }
  };

  useEffect(() => {
    showIndexStatusAlert();
  }, [isRefetching]);

  return (
    <>
      <Tab.Navigator
        initialRouteName="AccountHome"
        lazy
        screenOptions={{ unmountOnBlur: false }}
        tabBarOptions={{
          showLabel: false,
          style: getNavigationTabBarStyles(modalOpen),
        }}
      >
        <Tab.Screen name="AccountHome" component={AccountHomeScreen} options={getTabBarIcon} />
        <Tab.Screen
          name="Applications"
          component={BlockchainApplicationsExplorer}
          options={getTabBarIcon}
        />
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} options={getTabBarIcon} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={getTabBarIcon} />
      </Tab.Navigator>
    </>
  );
}
