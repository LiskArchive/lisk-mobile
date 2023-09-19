/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
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
  const { toggle: toggleModalContext, close, isOpen, component, showClose } = useModal();
  const bottomSheetRef = useRef(null);
  const timeout = useRef();

  const { styles } = useTheme({ styles: getStyles() });

  useEffect(() => {
    if (isOpen) {
      toggleModalContext(isOpen);
      bottomSheetRef.current?.present?.();
    }
    return () => clearTimeout(timeout.current);
  }, [isOpen, toggleModalContext]);

  const closeModal = () => {
    bottomSheetRef.current?.close?.();
    timeout.current = setTimeout(() => {
      close();
    }, 300);
  };

  if (!isOpen || !component) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.content}
      style={styles.content}
      behavior="height"
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
              onPress={showClose ? closeModal : null}
              containerStyle={[styles.content, styles.theme.content]}
            />
          )}
          style={[styles.container]}
          backgroundStyle={[styles.theme.container]}
          enableHandlePanningGesture
        >
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
