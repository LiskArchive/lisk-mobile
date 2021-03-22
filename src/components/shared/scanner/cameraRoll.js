import React from 'react';
import { View } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import withTheme from '../withTheme';
import getStyles from './styles';

const CameraRoll = ({
  styles,
  permission,
  visible,
  onSelect,
  containerStyles,
}) => {
  if (permission !== 'denied' && visible) {
    return (
      <View style={[styles.preview, styles.photoPreview, containerStyles]}>
        <CameraRollPicker selectSingleItem={true} callback={onSelect} />
      </View>
    );
  }

  return null;
};

export default withTheme(CameraRoll, getStyles());
