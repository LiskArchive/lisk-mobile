import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import Swipeable from 'components/shared/Swipeable';
import PinSvg from 'assets/svgs/PinSvg';
import CaretSvg from 'assets/svgs/CaretSvg';
import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';

import getBlockchainApplicationRowStyles from './styles';

function BlockchainApplicationRow({ t, application }) {
  const { theme, styles } = useTheme({ styles: getBlockchainApplicationRowStyles() });

  const { togglePin } = usePinBlockchainApplication();

  return (
    <Swipeable
      key={application.chainID}
      leftActions={[
        {
          title: !application.isPinned
            ? t('blockchainApplicationsList.pinText')
            : t('blockchainApplicationsList.unpinText'),
          color: colors.light.ufoGreen,
          icon: () => <PinSvg color={colors.light.white} variant={!application.isPinned ? 'outline' : 'closed'} />,
          onPress: () => togglePin(application.chainID),
        },
      ]}
    >
      <View key={application.chainID} style={styles.applicationContainer}>
        <View style={styles.applicationNameContainer}>
          <Image source={{ uri: application.images.logo.png }} style={{ ...styles.applicationLogoImage }} />

          <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>{application.name}</P>
        </View>

        <View style={styles.applicationNameContainer}>
          {application.isPinned && (
            <PinSvg color={colors.light.ultramarineBlue} style={{ marginRight: 12 }} variant="fill" />
          )}

          <CaretSvg direction="right" color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white} />
        </View>
      </View>
    </Swipeable>
  );
}

export default translate()(BlockchainApplicationRow);
