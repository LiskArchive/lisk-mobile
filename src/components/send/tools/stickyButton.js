import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { SecondaryButton } from '../../toolBox/button';
import styles from './styles';

const StickyButton = ({ disabled, title, onClick }) => {
  const keyboardButtonStyle = Platform.OS === 'ios' ? 'iosKeyboard' : 'androidKeyboard';

  return (<KeyboardAccessoryView
    style={styles[keyboardButtonStyle]}>
    <SecondaryButton
      disabled={disabled}
      title={title}
      onClick={onClick}
      style={styles.stickyButton} />
  </KeyboardAccessoryView>);
};

export default StickyButton;
