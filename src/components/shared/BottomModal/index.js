/* eslint-disable max-statements */
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { TouchableOpacity, View, Platform, Keyboard } from 'react-native';
import { useModal } from 'hooks/useModal';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'components/shared/toolBox/icon';
import { useTheme } from 'contexts/ThemeContext';
import { colors } from 'constants/styleGuide';

import getStyles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BottomModal = () => {
  const { toggle: toggleModalContext, close, isOpen, component, showClose } = useModal();
  const bottomSheetRef = useRef(null);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  const { styles } = useTheme({ styles: getStyles() });

  useEffect(() => {
    if (isOpen) {
      toggleModalContext(isOpen);
    }
  }, [isOpen, toggleModalContext]);

  const snapPoints = useMemo(() => (keyboardIsOpen ? ['75%'] : ['60%']), [keyboardIsOpen]);

  const handleKeyboardDidShow = () => {
    setKeyboardIsOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardIsOpen(false);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        handleKeyboardDidShow
      );

      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        handleKeyboardDidHide
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);

  const onModalClose = () => {
    close();
  };

  const closeModal = () => {
    bottomSheetRef.current?.close?.();
  };

  if (!isOpen || !component) {
    return null;
  }

  return (
    <KeyboardAwareScrollView
      style={[styles.content]}
      contentContainerStyle={[styles.content, styles.theme.content]}
      bounces
      enableOnAndroid
      renderToHardwareTextureAndroid
      nestedScrollEnabled
      extraScrollHeight={50}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onClose={onModalClose}
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        keyboardBehavior="interactive"
        handleComponent={() => (
          <View style={[styles.horizontalLine, styles.theme.horizontalLine]} />
        )}
        enablePanDownToClose={showClose}
        style={[styles.container]}
        backgroundStyle={[styles.theme.container]}
        enableHandlePanningGesture
      >
        {showClose && (
          <TouchableOpacity
            style={[styles.closeButtonContainer, styles.theme.closeButtonContainer]}
            onPress={closeModal}
          >
            <Icon name="cross" color={colors.light.ultramarineBlue} size={20} />
          </TouchableOpacity>
        )}
        {component}
        <View style={styles.bottomHeight} />
      </BottomSheet>
    </KeyboardAwareScrollView>
  );
};

export default BottomModal;
