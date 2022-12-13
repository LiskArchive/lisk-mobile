import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Modal, ScrollView, Animated, Dimensions } from 'react-native';

import Icon from 'components/shared/toolBox/icon';
import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';

import getStyles from './styles';

const BottomModal = ({ showClose = true, show, toggleShow, children, style }) => {
  const panY = useRef(new Animated.Value(Dimensions.get('screen').height)).current;

  const { styles } = useTheme({ styles: getStyles() });

  const resetPositionAnimation = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
  });

  const closeAnimation = Animated.timing(panY, {
    toValue: Dimensions.get('screen').height,
    duration: 300,
  });

  const handleClose = () => closeAnimation.start(() => toggleShow(false));

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  useEffect(() => {
    if (show) {
      resetPositionAnimation.start();
    }
  }, [show, resetPositionAnimation]);

  return (
    <Modal transparent visible={show} onRequestClose={handleClose} animationType="fade">
      <View style={[styles.overlay, styles.theme.overlay, style?.overlay]}>
        <Animated.View
          style={[styles.container, styles.theme.container, style?.container, { top }]}
        >
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
          same orientation because it can break windowing and other functionality.  */}
          <ScrollView style={[style?.children]}>{children}</ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomModal;
