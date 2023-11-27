/* eslint-disable max-statements */
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View, Keyboard } from 'react-native';
import { useModal } from 'hooks/useModal';
import {
  BottomSheetScrollView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Icon from 'components/shared/toolBox/icon';
import { useTheme } from 'contexts/ThemeContext';
import { colors } from 'constants/styleGuide';

import getStyles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const BottomModal = () => {
  const { close, isOpen, component, showClose } = useModal();
  const bottomSheetRef = useRef(null);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const timeout = useRef();

  const { styles } = useTheme({ styles: getStyles() });

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present?.();
    }
  }, [isOpen]);

  const closeModal = () => {
    bottomSheetRef.current?.close?.();
    timeout.current = setTimeout(() => {
      close();
    }, 300);
  };

  const handleKeyboardWillShow = () => {
    setKeyboardIsOpen(true);
  };

  const handleKeyboardWillHide = () => {
    setKeyboardIsOpen(false);
  };

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      handleKeyboardWillShow
    );

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      handleKeyboardWillHide
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      clearTimeout(timeout.current);
    };
  }, []);

  const shouldDismissModalOnTap = showClose && !keyboardIsOpen;

  if (!isOpen || !component) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.content}
      style={styles.content}
      behavior="position"
    >
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          enableDynamicSizing
          android_keyboardInputMode="adjustResize"
          keyboardBlurBehavior="restore"
          keyboardBehavior="extend"
          handleComponent={() => (
            <View style={[styles.horizontalLine, styles.theme.horizontalLine]} />
          )}
          enablePanDownToClose={false}
          enableDismissOnClose={false}
          backdropComponent={() => (
            <TouchableWithoutFeedback
              onPress={shouldDismissModalOnTap ? closeModal : null}
              containerStyle={[styles.content, styles.theme.content]}
            />
          )}
          style={[styles.container]}
          backgroundStyle={[styles.theme.container]}
          enableHandlePanningGesture
        >
          {/* TODO: Replace {children} container with another VirtualizedList-backed container.
          VirtualizedLists should never be nested inside plain ScrollViews with the 
          same orientation because it can break windowing and other functionality.
          (details on https://github.com/LiskHQ/lisk-mobile/issues/2051).
          */}
          <BottomSheetScrollView
            bounces
            enableOnAndroid
            renderToHardwareTextureAndroid
            nestedScrollEnabled
            extraScrollHeight={50}
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
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </KeyboardAvoidingView>
  );
};

export default BottomModal;
