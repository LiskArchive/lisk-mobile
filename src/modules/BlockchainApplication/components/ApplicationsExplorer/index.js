/* eslint-disable max-statements */
import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import Stepper from 'components/shared/Stepper';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'hooks/useTheme';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import { IconButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Tabs from 'components/shared/Tabs';
import BottomModal from 'components/shared/BottomModal';
import StatsSvg from 'assets/svgs/StatsSvg';
import { colors, themes } from 'constants/styleGuide';
import Fab from 'components/shared/Fab';
import QRCodeSvg from 'assets/svgs/QRCodeSvg';
import CopySvg from 'assets/svgs/CopySvg';
import { useBlockchainApplicationExplorer } from '../../hooks/useBlockchainApplicationExplorer';
import { useBlockchainApplicationStats } from '../../hooks/useBlockchainApplicationStats';
import ApplicationList from '../ApplicationList';
import ApplicationRow from '../ApplicationRow';
import ApplicationsStats from '../ApplicationsStats';
import ExternalApplicationList from '../ExternalApplicationList';

import getBlockchainApplicationsExplorerStyles from './styles';
import BridgeApplication from '../BridgeApplication';
import InitiateConnection from '../InitiateConnection';
import ApproveConnection from '../ApproveConnection';
import ConnectionContext from '../../../../../libs/wcm/context/connectionContext';

const actions = [
  {
    key: 'paste',
    text: 'Paste URI',
    icon: <CopySvg variant="outline" color={colors.light.white} />,
  },
  { key: 'scan', text: 'Scan QR Code', icon: <QRCodeSvg /> },
];

/**
 *
 * Renders a component that enable users to search, list and
 * view blockchain applications.
 */
export default function BlockchainApplicationsExplorer() {
  const navigation = useNavigation();
  const AppContext = useContext(ConnectionContext);
  const [activeTab, setActiveTab] = useState('internalApplications');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showBridgeAppModal, setShowBridgeAppModal] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();
  const { applicationsMetadata } = useBlockchainApplicationExplorer();
  const { data } = useBlockchainApplicationStats();

  console.log(AppContext);

  const { theme, styles } = useTheme({
    styles: getBlockchainApplicationsExplorerStyles(),
  });

  const onFabItemPress = (item) => {
    if (item.key === 'paste') {
      setShowBridgeAppModal(true);
    }
  };

  const onCancelConnection = () => setShowBridgeAppModal(false);

  return (
    <View style={styles.container}>
      <NavigationSafeAreaView>
        <HeaderBackButton
          title={i18next.t('application.explore.title')}
          noIcon
          rightIconComponent={() => (
            <IconButton
              onClick={() => setShowStatsModal(true)}
              icon={<StatsSvg height={20} />}
              title={i18next.t('application.explore.statsButtonText')}
              titleStyle={{
                marginLeft: 8,
                color: theme === themes.dark ? colors.dark.mountainMist : colors.light.zodiacBlue,
              }}
              style={styles.statsButton}
            />
          )}
          titleStyle={[styles.header]}
        />

        <View style={[styles.body, styles.flex]}>
          <Tabs value={activeTab} onClick={setActiveTab}>
            <Tabs.Tab value="internalApplications">
              {i18next.t('application.explore.applicationList.title')}
            </Tabs.Tab>
            <Tabs.Tab value="externalApplications">
              {i18next.t('application.explore.externalApplicationList.title')}
            </Tabs.Tab>
          </Tabs>
          <Tabs.Panel index="internalApplications" value={activeTab}>
            <ApplicationList
              applications={applicationsMetadata}
              Component={ApplicationRow}
              onItemPress={(item) =>
                navigation.navigate('ApplicationDetail', {
                  chainID: item.chainID,
                  variant: 'explore',
                })
              }
              showCaret
              variant="explore"
            />
          </Tabs.Panel>

          <Tabs.Panel index="externalApplications" value={activeTab}>
            <ExternalApplicationList />
          </Tabs.Panel>
        </View>
      </NavigationSafeAreaView>

      <BottomModal show={showBridgeAppModal} toggleShow={() => setShowBridgeAppModal(false)}>
        <Stepper>
          <BridgeApplication />
          <InitiateConnection event={AppContext.events[0]} closeModal={onCancelConnection} />
          <ApproveConnection event={AppContext.events[0]} closeModal={onCancelConnection} />
        </Stepper>
      </BottomModal>
      <BottomModal show={showStatsModal} toggleShow={() => setShowStatsModal(false)}>
        <ApplicationsStats
          totalSupply={data.totalSupplyLSK}
          staked={data.stakedLSK}
          stats={{ registered: data.registered, active: data.active, terminated: data.terminated }}
          styles={{
            container: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            },
          }}
        />
      </BottomModal>
      {activeTab === 'externalApplications' && (
        <Fab actions={actions} bottom={tabBarHeight} onPressItem={onFabItemPress} />
      )}
    </View>
  );
}
