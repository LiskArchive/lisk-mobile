import React, { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import BaseSwipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

const Swipeable = ({
  children, leftActions, rightActions, style, enabled = true
}) => {
  const swipeableRef = useRef();

  const renderAction = (text, color, icon, onPress, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const close = () => {
      swipeableRef.current?.close();
    };

    const pressHandler = () => {
      close();
      onPress();
    };

    return (
      <Animated.View style={[{ flex: 1, transform: [{ translateX: trans }] }]}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color, paddingVertical: 5 }]}
          onPress={pressHandler}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'column',
            }}
          >
            {icon?.()}
            <Text style={styles.actionText}>{text}</Text>
          </View>
        </RectButton>
      </Animated.View>
    );
  };

  const renderLeftActions = (progress) => (
    <View
      style={{
        width: 70 * leftActions.length + 10,
        flexDirection: 'row',
        paddingRight: 10,
      }}
    >
      {leftActions.map((action, i) =>
        renderAction(
          action.title,
          action.color,
          action.icon,
          action.onPress,
          -(70 * leftActions.length + i),
          progress
        ))}
    </View>
  );

  const renderRightActions = (progress) => (
    <View
      style={{
        width: 70 * rightActions.length,
        flexDirection: 'row',
      }}
    >
      {rightActions.map((action, i) =>
        renderAction(
          action.title,
          action.color,
          action.icon,
          action.onPress,
          70 * (rightActions.length - i),
          progress
        ))}
    </View>
  );

  const updateRef = (ref) => {
    swipeableRef.current = ref;
  };

  return (
    <BaseSwipeable
      enabled={enabled}
      ref={updateRef}
      containerStyle={style}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderLeftActions={leftActions && leftActions.length && renderLeftActions}
      renderRightActions={rightActions && rightActions.length && renderRightActions}
    >
      {children}
    </BaseSwipeable>
  );
};

export default Swipeable;
