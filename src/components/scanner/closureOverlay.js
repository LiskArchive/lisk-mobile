import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { IconButton } from '../toolBox/button';
import { colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';

const CameraOverlay = ({
  styles, close, containerStyles, theme, t,
}) => (
  <View style={[styles.cameraOverlay, containerStyles]}>
    <IconButton
      icon='cross'
      title={t('Close')}
      onPress={() => close()}
      style={styles.closeButton}
      titleStyle={styles.theme.closeButton}
      color={colors[theme].white}
    />
  </View>
);

export default withTheme(translate()(CameraOverlay), getStyles());
