import React from 'react';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'constants/styleGuide';
import { IconButton } from '../toolBox/button';
import { P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';

const CameraOverlay = ({ styles, t, close, theme }) => (
  <SafeAreaView style={[styles.cameraOverlay]}>
    <IconButton
      icon="cross"
      onPress={close}
      style={styles.closeButton}
      titleStyle={styles.theme.closeButton}
      color={colors[theme].white}
    />
    <P style={[styles.galleryDescription]}>{t('Scan a QR code.')}</P>
  </SafeAreaView>
);

export default withTheme(translate()(CameraOverlay), getStyles());
