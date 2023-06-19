/* eslint-disable max-statements */
import React, { memo } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import { P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import Swipeable from 'components/shared/Swipeable';
import ResultScreen from 'components/screens/ResultScreen';
import WarningSvg from 'assets/svgs/WarningSvg';
import CaretSvg from 'assets/svgs/CaretSvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import CheckSvg from 'assets/svgs/CheckSvg';

import { useApplicationRowActions } from './ApplicationRow.hooks';
import getApplicationRowStyles from './ApplicationRow.styles';
import { useCurrentApplication } from '../../hooks/useCurrentApplication';
import { APPLICATION_STATUSES } from '../../constants';

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

  const { theme, styles } = useTheme({ styles: getApplicationRowStyles() });

  const toggleDeleteDefaultApplicationModal = (bool) => {
    if (bool) {
      return modal.open(
        <ResultScreen
          variant="error"
          description={i18next.t('application.manage.deleteDefaultApplicationModal.description')}
          onContinue={modal.close}
          continueButtonTitle={i18next.t(
            'application.manage.deleteDefaultApplicationModal.buttonText'
          )}
        />
      );
    }
    return modal.close();
  };

  const renderStatus = (status) => {
    const baseProps = { height: 14, width: 16, style: { marginRight: 12 } };

    switch (status) {
      case APPLICATION_STATUSES.active:
        return <CheckSvg color={colors.light.ufoGreen} {...baseProps} />;

      case APPLICATION_STATUSES.registered:
        return <CheckSvg color={colors.light.ultramarineBlue} {...baseProps} />;

      case APPLICATION_STATUSES.terminated:
        return <WarningSvg {...baseProps} />;

      default:
        return null;
    }
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
            {renderStatus(application.status)}

            {showActive && currentApplication.data?.chainID === application.chainID && (
              <View style={{ marginRight: 12 }}>
                <CircleCheckedSvg variant="fill" />
              </View>
            )}

            {showCaret && (
              <CaretSvg
                direction="right"
                color={theme === themes.light ? colors.light.blueGray : colors.dark.mountainMist}
              />
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    </>
  );
}

export default memo(ApplicationRow);
