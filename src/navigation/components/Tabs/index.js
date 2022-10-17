import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from 'modules/Settings';
import Home from 'modules/Accounts';
import Bookmarks from 'modules/Bookmark';
import BlockchainApplicationsExplorer from 'modules/BlockchainApplication/components/ApplicationsExplorer';
import ExternalApplicationSignatureRequest from 'modules/BlockchainApplication/components/ExternalApplicationSignatureRequest';
import BottomModal from 'components/shared/BottomModal';
import { getTabBarIcon } from '../../helpers';
import { getNavigationTabBarStyles } from '../../styles';
import useSession from '../../../../libs/wcm/hooks/useSession';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { session } = useSession();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (session.request) {
      setModalOpen(true);
    }
  }, [session.request]);

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        lazy
        screenOptions={{ unmountOnBlur: false }}
        tabBarOptions={{
          showLabel: false,
          style: getNavigationTabBarStyles(),
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
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
              navigation.navigate('Home');
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

      <BottomModal show={modalOpen} toggleShow={closeModal}>
        <ExternalApplicationSignatureRequest session={session.request} onFinish={closeModal} />
      </BottomModal>
    </>
  );
}
