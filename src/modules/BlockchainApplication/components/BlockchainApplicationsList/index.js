import React, { useState } from 'react';
import { View, Image } from 'react-native';
import ModalBox from 'react-native-modalbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import { deviceType } from 'utilities/device';
import { colors, themes } from 'constants/styleGuide';
import Input from 'components/shared/toolBox/input';
import Icon from 'components/shared/toolBox/icon';
import { IconButton } from 'components/shared/toolBox/button';
import Swipeable from 'components/shared/Swipeable';
import PinSvg from 'assets/svgs/PinSvg';
import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
import { useSearch } from '../../../../hooks/useSearch';
import CaretSvg from '../../../../assets/svgs/CaretSvg';
import StatsSvg from '../../../../assets/svgs/StatsSvg';
import HeaderBackButton from '../../../../components/navigation/headerBackButton';
import ApplicationStats from '../ApplicationStat';

import getBlockchainApplicationsListStyles from './styles';

export default function BlockchainApplicationsList() {
  const [showStatsModal, setShowStatsModal] = useState(false);

  const { theme, styles } = useTheme({ styles: getBlockchainApplicationsListStyles() });

  const { applications } = useBlockchainApplicationManagement();

  const { togglePin } = usePinBlockchainApplication();

  const { term, setTerm } = useSearch();

  const extraHeight = deviceType() === 'android' ? 170 : 0;

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title="Applications"
        noIcon
        rightIconComponent={() => (
          <IconButton
            onClick={() => setShowStatsModal(true)}
            icon={<StatsSvg height={20} />}
            title="Stats"
            titleStyle={{
              marginLeft: 8,
              color: theme === themes.dark ? colors.dark.mountainMist : colors.light.zodiacBlue,
            }}
            style={styles.statsButton}
          />
        )}
      />

      <KeyboardAwareScrollView
        viewIsInsideTab
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        extraHeight={extraHeight}
      >
        <View style={[styles.innerContainer, styles.theme.innerContainer]}>
          <View style={styles.searchContainer}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={18}
              color={theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray}
            />
            <Input
              placeholder="Search applications"
              autoCorrect={false}
              autoFocus
              innerStyles={{
                input: [styles.input],
                containerStyle: [styles.inputContainer],
              }}
              placeholderTextColor={
                theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray
              }
              onChange={(value) => setTerm(value)}
              value={term}
              returnKeyType="search"
            />
          </View>

          <View style={styles.body}>
            {applications.isLoading ? (
              <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
                Loading apps...
              </P>
            ) : (
              applications.data.map((application) => (
                <Swipeable
                  key={application.chainID}
                  leftActions={[
                    {
                      title: !application.isPinned ? 'Pin' : 'Unpin',
                      color: colors.light.ufoGreen,
                      icon: () => (
                        <PinSvg
                          color={colors.light.white}
                          variant={!application.isPinned ? 'outline' : 'closed'}
                        />
                      ),
                      onPress: () => togglePin(application.chainID),
                    },
                  ]}
                >
                  <View key={application.chainID} style={styles.applicationContainer}>
                    <View style={styles.applicationNameContainer}>
                      <Image
                        source={{ uri: application.images.logo.png }}
                        style={{ ...styles.applicationLogoImage }}
                      />

                      <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
                        {application.name}
                      </P>
                    </View>

                    <View style={styles.applicationNameContainer}>
                      {application.isPinned && (
                        <PinSvg
                          color={colors.light.ultramarineBlue}
                          style={{ marginRight: 12 }}
                          variant="fill"
                        />
                      )}

                      <CaretSvg
                        direction="right"
                        color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
                      />
                    </View>
                  </View>
                </Swipeable>
              ))
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <ModalBox
        position="bottom"
        style={styles.statsModal}
        isOpen={showStatsModal}
        onClosed={() => setShowStatsModal(false)}
      >
        <Icon
          onPress={() => setShowStatsModal(false)}
          name="cross"
          color={theme === themes.light ? colors.light.black : colors.dark.white}
          style={styles.statsModalCloseButton}
          size={24}
        />

        <ApplicationStats
          totalSupply={10000}
          staked={500000}
          stats={{ registered: 100, active: 50, terminated: 80 }}
          styles={{
            container: {
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            },
          }}
        />
      </ModalBox>
    </View>
  );
}
