/* eslint-disable max-statements */
import React, { useState, useRef, useEffect } from 'react';
import { View, InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import Stepper from 'components/shared/Stepper';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useModal } from 'hooks/useModal';
import { useTheme } from 'contexts/ThemeContext';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import Scanner from 'components/shared/Scanner/Scanner';
import { IconButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Tabs from 'components/shared/Tabs';
import StatsSvg from 'assets/svgs/StatsSvg';
import { colors, themes } from 'constants/styleGuide';
import Fab from 'components/shared/Fab';
import QRCodeSvg from 'assets/svgs/QRCodeSvg';
import CopySvg from 'assets/svgs/CopySvg';
import { useApplicationsExplorer } from '../../hooks/useApplicationsExplorer';
import ApplicationList from '../ApplicationList/ApplicationList';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import ApplicationsStats from '../ApplicationsStats/ApplicationsStats';
import ExternalApplicationList from '../ExternalApplicationList';

import getApplicationsExplorerStyles from './styles';
import BridgeApplication from '../BridgeApplication';
import InitiateConnection from '../InitiateConnection';
import ApproveConnection from '../ApproveConnection';

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
export default function ApplicationsExplorer() {
  const [activeTab, setActiveTab] = useState('internalApplications');
  const [cameraIsOpen, setCameraIsOpen] = useState(false);

  let interactionPromise = useRef();

  const scannerRef = useRef();

  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const applications = useApplicationsExplorer('explore');

  const applicationStatsModal = useModal();
  const newConnectionModal = useModal();

  const { theme, styles } = useTheme({
    styles: getApplicationsExplorerStyles(),
  });

  const showApplicationStats = () =>
    applicationStatsModal.open(
      <ApplicationsStats
        styles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
        }}
      />
    );

  const showNewConnectionModal = (value) => {
    interactionPromise.current = InteractionManager.runAfterInteractions(() => {
      newConnectionModal.open(
        <Stepper>
          <BridgeApplication uri={value} />
          <InitiateConnection onFinish={newConnectionModal.close} />
          <ApproveConnection onFinish={newConnectionModal.close} />
        </Stepper>
      );
    });
  };

  useEffect(() => {
    if (interactionPromise.current?.cancel) {
      return () => interactionPromise.current.cancel();
    }
  }, []);

  const handleFabItemPress = (item) => {
    if (item.key === 'paste') {
      showNewConnectionModal();
    }
    if (item.key === 'scan') {
      scannerRef.current.toggleCamera();
    }
  };

  const closeCamera = () => scannerRef.current.closeCamera();

  const showFab = activeTab === 'externalApplications' && !cameraIsOpen;

  return (
    <>
      <NavigationSafeAreaView>
        <HeaderBackButton
          title={i18next.t('application.explore.title')}
          noIcon
          rightIconComponent={() => (
            <IconButton
              onClick={showApplicationStats}
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

        <Scanner
          ref={scannerRef}
          navigation={navigation}
          readFromCameraRoll={false}
          onQRCodeRead={showNewConnectionModal}
          onCameraVisibilityChange={setCameraIsOpen}
          permissionDialogTitle={i18next.t('Permission to use camera')}
          permissionDialogMessage={i18next.t('Lisk needs to connect to your camera')}
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
              applications={applications}
              Component={ApplicationRow}
              onItemPress={(item) =>
                navigation.navigate('ApplicationDetails', {
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

      {showFab && (
        <Fab
          actions={actions}
          bottom={tabBarHeight}
          onPressItem={handleFabItemPress}
          onPressMain={closeCamera}
        />
      )}
    </>
  );
}
