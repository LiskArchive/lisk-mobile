/* eslint-disable max-statements */
import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import { P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import Swipeable from 'components/shared/Swipeable';
import ResultScreen from 'components/screens/ResultScreen';
import PinSvg from 'assets/svgs/PinSvg';
import CaretSvg from 'assets/svgs/CaretSvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';

import { useApplicationRowActions } from './ApplicationRow.hooks';
import getApplicationRowStyles from './ApplicationRow.styles';
import { useCurrentApplication } from '../../hooks/useCurrentApplication';
import { usePinApplications } from '../../hooks/usePinApplications';

/**
 * Renders a Blockchain Application row for the Blockchain Applications component.
 * @param {Object} application - Blockchain application to render.
 * @param {'explore' | 'manage'} variant - Enables swipe on application row item for explore
 * @param {Function} onPress - Callback to trigger on row click.
 * @param {boolean} showActive - Flag for showing/hiding icon that visualizes if the app is
 * active or not.
 * @param {boolean} showCaret - Flag for showing/hiding caret icon for clicking on the row.
 */
function ApplicationRow({
  application,
  onPress,
  variant = 'manage',
  showActive,
  showCaret,
  deleteApplication,
  navigation,
}) {
  const modal = useModal();

  const [currentApplication] = useCurrentApplication();

  const { checkPin } = usePinApplications();

  const { theme, styles } = useTheme({ styles: getApplicationRowStyles() });

  const applicationPinned = checkPin(application.chainID);

  const toggleDeleteDefaultApplicationModal = (bool) => {
    if (bool) {
      return modal.open(
        <ResultScreen
          variant="error"
          description={i18next.t('application.manage.deleteDefaultApplicationModal.description')}
          buttonText={i18next.t('application.manage.deleteDefaultApplicationModal.buttonText')}
          onContinue={() => modal.close(false)}
        />
      );
    }
    return modal.close();
  };

  const { leftActions, rightActions } = useApplicationRowActions({
    application,
    variant,
    navigation,
    toggleDeleteDefaultApplicationModal,
    deleteApplication,
  });

  return (
    <>
      <Swipeable key={application.chainID} leftActions={leftActions} rightActions={rightActions}>
        <TouchableOpacity
          style={[styles.applicationContainer, styles.theme.applicationContainer]}
          onPress={onPress}
        >
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
            {applicationPinned && (
              <PinSvg
                color={colors.light.ultramarineBlue}
                style={{ marginRight: 12 }}
                variant="fill"
              />
            )}

            {showActive && currentApplication.data?.chainID === application.chainID && (
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
    </>
  );
}

export default memo(ApplicationRow);
