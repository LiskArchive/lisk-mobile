import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ModalContext } from 'contexts/ModalContext';
import { useExternalApplicationSignatureRequest } from 'modules/BlockchainApplication/hooks/useExternalApplicationSignatureRequest';
import Settings from 'modules/Settings';
import AccountHome from 'modules/Accounts/components/AccountHome/AccountHome';
import Bookmarks from 'modules/Bookmark';
import BlockchainApplicationsExplorer from 'modules/BlockchainApplication/components/ApplicationsExplorer';
import { getTabBarIcon } from '../../helpers';
import { getNavigationTabBarStyles } from '../../styles';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { isOpen: modalOpen } = useContext(ModalContext);

  useExternalApplicationSignatureRequest();

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
        <Tab.Screen name="AccountHome" component={AccountHome} options={getTabBarIcon} />
        <Tab.Screen
          name="Applications"
          component={BlockchainApplicationsExplorer}
          options={getTabBarIcon}
        />
        <Tab.Screen name="Bookmarks" component={Bookmarks} options={getTabBarIcon} />
        <Tab.Screen name="Settings" component={Settings} options={getTabBarIcon} />
      </Tab.Navigator>
    </>
  );
}
