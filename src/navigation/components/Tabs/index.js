import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useModal } from 'contexts/useModal';
import { ModalContext } from 'contexts/ModalContext';
import Settings from 'modules/Settings';
import AccountHome from 'modules/Accounts/components/AccountHome/AccountHome';
import Bookmarks from 'modules/Bookmark';
import BlockchainApplicationsExplorer from 'modules/BlockchainApplication/components/ApplicationsExplorer';
import ExternalApplicationSignatureRequest from 'modules/BlockchainApplication/components/ExternalApplicationSignatureRequest';
import { getTabBarIcon } from '../../helpers';
import { getNavigationTabBarStyles } from '../../styles';
import useWalletConnectSession from '../../../../libs/wcm/hooks/useSession';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { session, reject } = useWalletConnectSession();
  const { isOpen: modalOpen } = useContext(ModalContext);
  const { showModal, closeModal } = useModal();

  const rejectRequest = () => {
    reject();
    closeModal();
  };

  const showSignatureRequestModal = () =>
    showModal(
      <ExternalApplicationSignatureRequest session={session.request} onCancel={rejectRequest} />,
      false
    );

  useEffect(() => {
    if (session.request) {
      showSignatureRequestModal();
    }
  }, [session.request]);

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
        <Tab.Screen
          name="AccountHome"
          component={AccountHome}
          options={getTabBarIcon}
          listeners={({ route, navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              const { history } = navigation.getState();
              if (history[history.length - 1].key === route.key) {
                if (route.params?.scrollToTop) {
                  route.params.scrollToTop();
                }
              }
              navigation.navigate('AccountHome');
            },
          })}
        />
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
