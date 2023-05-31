/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
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
  const panY = useRef(new Animated.Value(Dimensions.get('screen').height)).current;

  const { styles } = useTheme({ styles: getStyles() });

  const resetPositionAnimation = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  const closeAnimation = Animated.timing(panY, {
    toValue: Dimensions.get('screen').height,
    duration: 300,
    useNativeDriver: false,
  });

  const handleClose = () => {
    closeAnimation.start(() => close());
  };

  useEffect(() => {
    if (isOpen) {
      toggleModalContext(isOpen);
      resetPositionAnimation.start();
    }
  }, [isOpen, resetPositionAnimation, toggleModalContext]);

  if (!isOpen || !component) {
    return null;
  }

  return (
    <Animated.View style={styles.content} onPress={handleClose}>
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
                  onPress={handleClose}
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
