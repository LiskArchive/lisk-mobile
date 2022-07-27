import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import Swipeable from 'components/shared/Swipeable';
import PinSvg from 'assets/svgs/PinSvg';
import CaretSvg from 'assets/svgs/CaretSvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';

import getBlockchainApplicationRowStyles from './styles';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';

/**
 * Renders a Blockchain Application row for the Blockchain Applications component.
 * @param {Object} application - Blockchain application to render.
 * @param {'explore' | 'manage'} variant - Enables swipe on application row item for explore
 */
function BlockchainApplicationRow({
  t, application, onPress, variant, showActive, showCaret
}) {
  const { theme, styles } = useTheme({ styles: getBlockchainApplicationRowStyles() });
  const [currentApplication] = useCurrentBlockchainApplication();

  const { togglePin } = usePinBlockchainApplication();

  return (
    <Swipeable
      key={application.chainID}
      enabled={variant === 'explore'}
      leftActions={[
        {
          title: !application.isPinned
            ? t('blockchainApplicationsList.pinText')
            : t('blockchainApplicationsList.unpinText'),
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
      <TouchableOpacity style={styles.applicationContainer} onPress={onPress}>
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
          {showActive && currentApplication.chainID === application.chainID && (
          <View style={styles.icon}>
            <CircleCheckedSvg />
          </View>
          )}

          {showCaret && <CaretSvg
            direction="right"
            color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
          />}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default translate()(BlockchainApplicationRow);
