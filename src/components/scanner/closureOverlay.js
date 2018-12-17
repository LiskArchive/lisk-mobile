import React from 'react';
import { View } from 'react-native';
import { IconButton } from '../toolBox/button';
import { colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';

const CameraOverlay = ({
  styles, close, containerStyles, theme,
}) => (
  <View style={[styles.cameraOverlay, containerStyles]}>
    <IconButton
      icon='cross'
      title='Close'
      onPress={() => close()}
      style={styles.closeButton}
      titleStyle={styles.theme.closeButton}
      color={colors[theme].white}
    />
  </View>
);

export default withTheme(CameraOverlay, getStyles());
