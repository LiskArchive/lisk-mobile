/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Animated,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import { useModal } from 'hooks/useModal';

import Icon from 'components/shared/toolBox/icon';
import { useTheme } from 'contexts/ThemeContext';
import { colors } from 'constants/styleGuide';

import getStyles from './styles';

const BottomModal = ({ style }) => {
  const { toggle: toggleModalContext, close, isOpen, component, showClose } = useModal();

  const { styles } = useTheme({ styles: getStyles() });

  useEffect(() => {
    if (isOpen) {
      toggleModalContext(isOpen);
    }
  }, [isOpen, toggleModalContext]);

  if (!isOpen || !component) {
    return null;
  }

  return (
    <Animated.View style={styles.content} onPress={close}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={[styles.overlay, styles.theme.overlay, style?.overlay]}
      >
        <Animated.View>
          <SafeAreaView style={[styles.safeArea, styles.container, styles.theme.container]}>
            <View style={[styles.container, style?.container]}>
              <View style={[styles.horizontalLine, styles.theme.horizontalLine]} />

              {showClose && (
                <TouchableOpacity
                  style={[styles.closeButtonContainer, styles.theme.closeButtonContainer]}
                  onPress={close}
                >
                  <Icon name="cross" color={colors.light.ultramarineBlue} size={20} />
                </TouchableOpacity>
              )}

              {/* TODO: Replace {children} container with another VirtualizedList-backed container.
          VirtualizedLists should never be nested inside plain ScrollViews with the 
          same orientation because it can break windowing and other functionality.
          (details on https://github.com/LiskHQ/lisk-mobile/issues/1606).
          */}
              <ScrollView style={[style?.children]}>{component}</ScrollView>
            </View>
          </SafeAreaView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default BottomModal;
