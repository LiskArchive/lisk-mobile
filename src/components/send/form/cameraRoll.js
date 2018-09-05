import React from 'react';
import { View } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import styles from './styles';
import { P } from '../../toolBox/typography';

const CameraRoll = ({ permission, visible, onSelect }) => {
  if (permission !== 'denied' && visible) {
    return (
      <View style={[styles.preview, styles.photoPreview]}>
        <CameraRollPicker
          selectSingleItem={true}
          callback={onSelect} />
      </View>
    );
  }
  return null;
};

export default CameraRoll;
