import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ModalContext } from 'contexts/ModalContext';
import AccountHomeScreen from 'modules/Accounts/components/AccountHome/AccountHome';
import BookmarksScreen from 'modules/Bookmark';
import SettingsScreen from 'modules/Settings/components/SettingsScreen/SettingsScreen';
import { getTabBarIcon } from '../../navigation.utils';
import { getNavigationTabBarStyles } from '../Navigator/Navigator.styles';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { isOpen: modalOpen } = useContext(ModalContext);

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
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} options={getTabBarIcon} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={getTabBarIcon} />
      </Tab.Navigator>
    </>
  );
}
