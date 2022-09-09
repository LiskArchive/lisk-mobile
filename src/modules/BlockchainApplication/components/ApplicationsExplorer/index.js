import React, { useState } from 'react'
import { translate } from 'react-i18next'

import { useTheme } from 'hooks/useTheme'
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView'
import { IconButton } from 'components/shared/toolBox/button'
import HeaderBackButton from 'components/navigation/headerBackButton'
import { P } from 'components/shared/toolBox/typography'
import BottomModal from 'components/shared/BottomModal'
import StatsSvg from 'assets/svgs/StatsSvg'
import { colors, themes } from 'constants/styleGuide'

import { useBlockchainApplicationExplorer } from '../../hooks/useBlockchainApplicationExplorer'
import { useBlockchainApplicationStats } from '../../hooks/useBlockchainApplicationStats'
import ApplicationList from '../ApplicationList'
import BlockchainApplicationRow from '../ApplicationRow'
import BlockchainApplicationsStats from '../ApplicationsStats'

import getBlockchainApplicationsExplorerStyles from './styles'

/**
 *
 * Renders a component that enable users to search, list and
 * view blockchain applications.
 */
function BlockchainApplicationsExplorer({ t, navigation }) {
  const [showStatsModal, setShowStatsModal] = useState(false)

  const { applicationsMetadata } = useBlockchainApplicationExplorer()
  const { data } = useBlockchainApplicationStats()

  const { theme, styles } = useTheme({
    styles: getBlockchainApplicationsExplorerStyles(),
  })

  const renderData = () => {
    if (applicationsMetadata.isLoading) {
      return (
        <P style={[styles.message, styles.theme.message]}>
          {t('application.explore.applicationList.loadingText')}
        </P>
      )
    }

    if (applicationsMetadata.isError) {
      return (
        <P style={[styles.message, styles.theme.message]}>
          {t('application.explore.applicationList.errorText')}
        </P>
      )
    }

    if (applicationsMetadata.data?.length === 0) {
      return (
        <P style={[styles.message, styles.theme.message]}>
          {t('application.explore.applicationList.emptyText')}
        </P>
      )
    }
    return (
      <ApplicationList
        applications={applicationsMetadata}
        Component={BlockchainApplicationRow}
        onItemPress={(item) =>
          navigation.navigate('ApplicationDetail', {
            chainID: item.chainID,
            variant: 'explore',
          })
        }
        showCaret
        variant="explore"
        navigation={navigation}
        style={{ container: styles.applicationsListContainer }}
      />
    )
  }

  return (
    <>
      <NavigationSafeAreaView>
        <HeaderBackButton
          title={t('application.explore.title')}
          noIcon
          rightIconComponent={() => (
            <IconButton
              onClick={() => setShowStatsModal(true)}
              icon={<StatsSvg height={20} />}
              title={t('application.explore.statsButtonText')}
              titleStyle={{
                marginLeft: 8,
                color: theme === themes.dark ? colors.dark.mountainMist : colors.light.zodiacBlue,
              }}
              style={styles.statsButton}
            />
          )}
          titleStyle={[styles.header]}
        />

        {renderData()}
      </NavigationSafeAreaView>

      <BottomModal
        show={showStatsModal}
        toggleShow={() => setShowStatsModal(false)}
        style={{ container: styles.statsModal }}
      >
        <BlockchainApplicationsStats
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
  )
}

export default translate()(BlockchainApplicationsExplorer)
