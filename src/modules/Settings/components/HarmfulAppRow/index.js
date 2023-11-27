/* eslint-disable max-statements */
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { P } from 'components/shared/toolBox/typography';
import { colors } from 'constants/styleGuide';

import { useModal } from 'hooks/useModal';
import { useTheme } from 'contexts/ThemeContext';
import AppLogo from 'assets/images/security/app.png';
import WarningSvg from 'assets/svgs/WarningSvg';

import HarmfulAppDetails from '../HarmfulAppDetails';

import getStyles from './styles';

export default function HarmfulAppRow({ packageName }) {
  const { styles } = useTheme({ styles: getStyles() });

  const modal = useModal();

  const openModal = () => {
    modal.open(<HarmfulAppDetails packageName={packageName} />);
  };

  return (
    <TouchableOpacity style={styles.row} onPress={openModal}>
      <Image source={AppLogo} style={styles.appLogo} />
      <P style={[styles.packageName, styles.theme.packageName]}>{packageName}</P>
      <WarningSvg color={colors.light.yellowCopacabana} />
    </TouchableOpacity>
  );
}
