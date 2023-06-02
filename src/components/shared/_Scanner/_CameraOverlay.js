import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';
import { useTheme } from 'contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'constants/styleGuide';
import GallerySvg from 'assets/svgs/GallerySvg';
import { IconButton } from '../toolBox/button';
import { P } from '../toolBox/typography';
import getStyles from './Scanner.styles';

const CameraOverlay = ({ close, toggleGallery }) => {
  const { styles, theme } = useTheme({ styles: getStyles() });
  return (
    <SafeAreaView style={styles.overlay}>
      <View style={[styles.headerContainer]}>
        <IconButton
          icon="cross"
          onPress={close}
          style={styles.closeButton}
          titleStyle={styles.theme.closeButton}
          color={colors[theme].white}
        />
        <P style={[styles.galleryDescription]}>{i18next.t('auth.register.scanQR')}</P>
      </View>
      <View style={styles.bottomContent}>
        <TouchableOpacity style={styles.galleryButton} onPress={toggleGallery}>
          <GallerySvg height={40} width={40} />
        </TouchableOpacity>
        <P style={styles.galleryText}>{i18next.t('auth.register.gallery')}</P>
      </View>
    </SafeAreaView>
  );
};

export default CameraOverlay;
