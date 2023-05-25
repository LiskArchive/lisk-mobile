import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'constants/styleGuide';
import { IconButton } from '../toolBox/button';
import { P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
import GallerySvg from '../../../assets/svgs/GallerySvg';

const CameraOverlay = ({ styles, t, close, theme, toggleGallery }) => (
  <SafeAreaView style={styles.overlay}>
    <View style={[styles.headerContainer]}>
      <IconButton
        icon="cross"
        onPress={close}
        style={styles.closeButton}
        titleStyle={styles.theme.closeButton}
        color={colors[theme].white}
      />
      <P style={[styles.galleryDescription]}>{t('Scan a QR code.')}</P>
    </View>
    <View style={styles.bottomContent}>
      <TouchableOpacity style={styles.galleryButton} onPress={toggleGallery}>
        <GallerySvg />
      </TouchableOpacity>
      <P style={styles.gallery}>{t('auth.register.gallery')}</P>
    </View>
  </SafeAreaView>
);

export default withTheme(translate()(CameraOverlay), getStyles());
