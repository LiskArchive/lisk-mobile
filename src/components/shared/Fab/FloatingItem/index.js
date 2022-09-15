/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';

import { getTouchableComponent } from '../utils/touchable';
import styles from './styles';

const FloatingActionItem = ({ active, onPress, item, buttonSize, paddingTopBottom = 10 }) => {
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animation.current, {
      toValue: active ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [active]);

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
        <View key="text" style={[styles.textContainer]}>
          <Text style={[styles.text]}>{text}</Text>
        </View>
        <View key="button" style={[styles.button, buttonStyles]}>
          {icon}
        </View>
      </View>
    );
  };

  const Touchable = getTouchableComponent(false);

  const animatedActionContainerStyle = {
    marginBottom: animation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 10],
    }),
  };

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
