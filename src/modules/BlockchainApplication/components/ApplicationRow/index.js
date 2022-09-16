import React, { useState, memo } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import Swipeable from 'components/shared/Swipeable';
import BottomModal from 'components/shared/BottomModal';
import ResultScreen from 'components/screens/ResultScreen';
import PinSvg from 'assets/svgs/PinSvg';
import CaretSvg from 'assets/svgs/CaretSvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
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
  application,
  onPress,
  variant = 'manage',
  showActive,
  showCaret,
  deleteApplication,
}) {
  const navigation = useNavigation();

  const [showDeleteDefaultApplicationModal, setShowDeleteDefaultApplicationModal] = useState(false);

  const { theme, styles } = useTheme({ styles: getBlockchainApplicationRowStyles() });
  const [currentApplication] = useCurrentBlockchainApplication();

  const { leftActions, rightActions } = useBlockchainApplicationRowActions({
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
              source={{ uri: application.logo.png }}
              style={{ ...styles.applicationLogoImage }}
            />

            <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
              {application.chainName}
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

      <BottomModal
        show={showDeleteDefaultApplicationModal}
        toggleShow={() => setShowDeleteDefaultApplicationModal(false)}
      >
        <ResultScreen
          variant="error"
          description={i18next.t('application.manage.deleteDefaultApplicationModal.description')}
          buttonText={i18next.t('application.manage.deleteDefaultApplicationModal.buttonText')}
          onContinue={() => setShowDeleteDefaultApplicationModal(false)}
        />
      </BottomModal>
    </>
  );
}

export default memo(BlockchainApplicationRow);
