/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';

import { getTouchableComponent } from '../utils/touchable';
import styles from './styles';

const FloatingActionItem = ({
  active,
  animated,
  onPress,
  item,
  textContainerStyle,
  buttonSize,
  paddingTopBottom = 10,
}) => {
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    if (animated) {
      Animated.spring(animation.current, {
        toValue: active ? 1 : 0,
        useNativeDriver: false,
      }).start();
    }
  }, [animated, active]);

  const handleOnPress = () => {
    onPress(item);
  };

  const renderButton = () => {
    const buttonStyles = {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
    };
    const { icon, text } = item;

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View key="text" style={[styles.textContainer, textContainerStyle]}>
          <Text style={[styles.text]}>{text}</Text>
        </View>
        <View key="button" style={[styles.button, buttonStyles]}>
          {icon}
        </View>
      </View>
    );
  };

  const Touchable = getTouchableComponent(false);

  let animatedActionContainerStyle;

  if (animated) {
    animatedActionContainerStyle = {
      marginBottom: animation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 10],
      }),
    };
  } else {
    animatedActionContainerStyle = { marginBottom: 10 };
  }

  return (
    <Touchable activeOpacity={0.4} style={styles.container} onPress={handleOnPress}>
      <Animated.View
        style={[
          styles.actionContainer,
          animatedActionContainerStyle,
          {
            paddingTop: paddingTopBottom,
            paddingBottom: paddingTopBottom,
          },
        ]}
      >
        {renderButton()}
      </Animated.View>
    </Touchable>
  );
};

export default FloatingActionItem;
