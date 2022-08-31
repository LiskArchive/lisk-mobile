import React, { useState, memo } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalBox from 'react-native-modalbox';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import Swipeable from 'components/shared/Swipeable';
import PinSvg from 'assets/svgs/PinSvg';
import CaretSvg from 'assets/svgs/CaretSvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import ErrorScreen from 'components/screens/ErrorScreen';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';

import { useBlockchainApplicationRowActions } from './hooks';
import getBlockchainApplicationRowStyles from './styles';

/**
 * Renders a Blockchain Application row for the Blockchain Applications component.
 * @param {Object} application - Blockchain application to render.
 * @param {'explore' | 'manage'} variant - Enables swipe on application row item for explore
 * @param {Function} onPress - Callback to trigger on row click.
 * @param {boolean} showActive - Flag for showing/hiding icon that visualizes if the app is
 * active or not.
 * @param {boolean} showCaret - Flag for showing/hiding caret icon for clicking on the row.
 */
function BlockchainApplicationRow({
  t,
  application,
  onPress,
  variant = 'manage',
  showActive,
  showCaret,
  navigation,
  deleteApplication
}) {
  const [
    showDeleteDefaultApplicationModal,
    setShowDeleteDefaultApplicationModal
  ] = useState(false);

  const { theme, styles } = useTheme({ styles: getBlockchainApplicationRowStyles() });
  const [currentApplication] = useCurrentBlockchainApplication();

  const { leftActions, rightActions } = useBlockchainApplicationRowActions({
    t,
    application,
    variant,
    navigation,
    setShowDeleteDefaultApplicationModal,
    deleteApplication,
  });

  return (
    <>
      <Swipeable key={application.chainID} leftActions={leftActions} rightActions={rightActions}>
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
              <View style={{ marginRight: 12 }}>
                <CircleCheckedSvg variant="fill" />
              </View>
            )}

            {showCaret && (
              <CaretSvg
                direction="right"
                color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
              />
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>

      <ModalBox
        position="bottom"
        style={styles.deleteDefaultApplicationModal}
        isOpen={showDeleteDefaultApplicationModal}
        onClosed={() => setShowDeleteDefaultApplicationModal(false)}
        coverScreen
      >
        <ErrorScreen
          description={t('application.manage.deleteDefaultApplicationModal.description')}
          buttonText={t('application.manage.deleteDefaultApplicationModal.buttonText')}
          onContinue={() => setShowDeleteDefaultApplicationModal(false)}
        />
      </ModalBox>
    </>
  );
}

export default translate()(memo(BlockchainApplicationRow));
