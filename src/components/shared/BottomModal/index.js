import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Modal, ScrollView, Animated, Easing } from 'react-native';
import Icon from 'components/shared/toolBox/icon';
import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';
import getStyles from './styles';

const BottomModal = ({ showClose = true, show, toggleShow, children }) => {
  const { styles } = useTheme({ styles: getStyles() });
  const animation = useRef(new Animated.Value(0)).current;

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.7],
    easing: Easing.elastic(),
  });

  useEffect(() => {
    if (show) {
      Animated.spring(animation, {
        toValue: 1,
        duration: 1000,
        delay: 50,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const closeModal = () => {
    animation.setValue(0);
    toggleShow(false);
  };

  return (
    <Animated.View style={[show && styles.overlay, styles.theme.overlay, { opacity }]}>
      <Modal transparent visible={show} onRequestClose={closeModal} animationType="slide">
        <View style={[styles.content]}>
          <View style={[styles.container, styles.theme.container]}>
            <View style={[styles.horizontalLine, styles.theme.horizontalLine]} />

            {showClose && (
              <TouchableOpacity
                style={[styles.closeButtonContainer, styles.theme.closeButtonContainer]}
                onPress={closeModal}
              >
                <Icon name="cross" color={colors.light.ultramarineBlue} size={20} />
              </TouchableOpacity>
            )}
            <ScrollView>{children}</ScrollView>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default BottomModal;
