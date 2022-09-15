import React, { useState } from 'react';
import { View } from 'react-native-interactable';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import { IconButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Tabs from 'components/shared/Tabs';
import BottomModal from 'components/shared/BottomModal';
import StatsSvg from 'assets/svgs/StatsSvg';
import { colors, themes } from 'constants/styleGuide';
import { useBlockchainApplicationExplorer } from '../../hooks/useBlockchainApplicationExplorer';
import { useBlockchainApplicationStats } from '../../hooks/useBlockchainApplicationStats';
import ApplicationList from '../ApplicationList';
import ApplicationRow from '../ApplicationRow';
import ApplicationsStats from '../ApplicationsStats';
import ExternalApplicationList from '../ExternalApplicationList';

import getBlockchainApplicationsExplorerStyles from './styles';

/**
 *
 * Renders a component that enable users to search, list and
 * view blockchain applications.
 */
export default function BlockchainApplicationsExplorer() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('internalApplications');
  const [showStatsModal, setShowStatsModal] = useState(false);

  const { applicationsMetadata } = useBlockchainApplicationExplorer();
  const { data } = useBlockchainApplicationStats();

  const { theme, styles } = useTheme({
    styles: getBlockchainApplicationsExplorerStyles(),
  });

  return (
    <>
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

        <View style={[styles.body]}>
          <Tabs value={activeTab} onClick={(tab) => setActiveTab(tab)}>
            <Tabs.Tab value="internalApplications">All applications</Tabs.Tab>
            <Tabs.Tab value="externalApplications">External connections</Tabs.Tab>
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

      <BottomModal
        show={showStatsModal}
        toggleShow={() => setShowStatsModal(false)}
        style={{ container: styles.statsModal }}
      >
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
    </>
  );
}
