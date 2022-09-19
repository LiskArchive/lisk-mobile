/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useEffect, useRef, useState } from 'react'; // eslint-disable-line
import { Animated, LayoutAnimation, Platform, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddSvg from 'assets/svgs/AddSvg';
import { colors } from 'constants/styleGuide';

import FloatingActionItem from './FloatingItem';

import { getTouchableComponent, getRippleProps } from './utils/touchable';
import styles from './styles';

/**
 *
 * @param {Object[]} actions
 * @param {string} actions[].text
 * @param {Component} actions[].icon
 * @param {number} buttonSize sets the size of Fab and items
 * @param {boolean} openOnMount decides if the Fab should open when the component mounts
 * @param {boolean} listenKeyboard decides if the Fab should dismiss when keyboard is in view
 * @param {boolean} showBackground decides if an overlay is visible when fab is open
 * @param {Function} onClose function to call when fab closes
 * @param {Function} onOpen function to call when fab opens
 * @param {Function} onPressMain function to call when fab is pressed
 * @param {Function} onPressItem function to call when an item is pressed
 * @param {Function} actionsPaddingTopBottom padding to add to action items
 * @param {Function} color color used to get ripple color on android
 * @param {Function} bottom customizable distance from bottom of screen
 *
 * @returns {Component}
 *
 */

const Fab = ({
  mainVerticalDistance = 50,
  buttonSize = 50,
  openOnMount,
  showBackground = true,
  listenKeyboard,
  actions,
  onClose,
  onPressMain,
  onOpen,
  onPressItem,
  actionsPaddingTopBottom = 10,
  color = colors.light.ultramarineBlue,
  bottom = 0,
}) => {
  const [active, setActive] = useState(openOnMount);
  const mainBottomAnimation = useRef(new Animated.Value(mainVerticalDistance + bottom));
  const actionsBottomAnimation = useRef(new Animated.Value(buttonSize + bottom + 50));
  const animation = useRef(new Animated.Value(openOnMount ? 1 : 0));
  const actionsAnimation = useRef(new Animated.Value(0));
  const opacity = useRef(new Animated.Value(1));

  const onKeyboardShow = () => {
    Animated.spring(opacity.current, {
      bounciness: 0,
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const onKeyboardHideHide = () => {
    Animated.spring(opacity.current, {
      bounciness: 0,
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleReset = () => {
    Animated.spring(animation.current, { toValue: 0, useNativeDriver: false }).start();
    Animated.spring(actionsAnimation.current, { toValue: 0, useNativeDriver: false }).start();
    setActive(false);
    onClose?.();
  };

  const animateButton = () => {
    onPressMain?.(!active);

    if (!active) {
      Animated.spring(actionsAnimation.current, { toValue: 1, useNativeDriver: false }).start();
      // only execute it for the background to prevent extra calls
      LayoutAnimation.configureNext({
        duration: 180,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      });
      setActive(true);
      onOpen?.();
    } else {
      handleReset();
    }
  };

  const handlePressItem = (item) => {
    onPressItem(item);
    handleReset();
  };

  const renderActions = () => {
    if (!actions || actions.length === 0) {
      return undefined;
    }

    const animatedActionsStyle = {
      opacity: actionsAnimation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };

    const actionsStyles = [
      animatedActionsStyle,
      {
        bottom: actionsBottomAnimation.current,
      },
    ];

    return (
      <Animated.View style={[styles.buttonContainer, actionsStyles]} pointerEvents="box-none">
        {actions.map((action) => {
          const textBackground = action.textBackground || action.actionsTextBackground;

          return (
            <FloatingActionItem
              paddingTopBottom={actionsPaddingTopBottom}
              key={action.text}
              textBackground={textBackground}
              item={action}
              active={active}
              onPress={handlePressItem}
              buttonSize={buttonSize - 10}
            />
          );
        })}
      </Animated.View>
    );
  };

  useEffect(() => {
    Animated.spring(animation.current, {
      bounciness: 0,
      toValue: active ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [active]);

  useEffect(() => {
    if (openOnMount) {
      animateButton();
    }
    if (listenKeyboard) {
      const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
      Keyboard.addListener(showEvent, onKeyboardShow);
      Keyboard.addListener(hideEvent, onKeyboardHideHide);
    }
    return () => Keyboard.removeAllListeners();
  }, []);

  const handlePressBackdrop = () => {
    handleReset();
    onClose?.();
  };

  const animatedViewStyle = {
    transform: [
      {
        rotate: animation.current.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
    backgroundColor: animation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.light.ultramarineBlue, colors.light.white],
    }),
    width: animation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [buttonSize, buttonSize - 5],
    }),
    height: animation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [buttonSize, buttonSize - 5],
    }),
    opacity: opacity.current,
  };

  const Touchable = getTouchableComponent();
  const propStyles = {
    bottom: mainBottomAnimation.current,
  };

  const sizeStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
  };

  return (
    <Animated.View pointerEvents="box-none" style={[styles.overlay]}>
      {active && showBackground && (
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.overlay, styles.overlayColor]}
          onPress={handlePressBackdrop}
        />
      )}
      {renderActions()}
      <Animated.View
        style={[styles.buttonContainer, propStyles]}
        accessible
        accessibilityLabel="Floating Action Button"
      >
        <Touchable
          {...getRippleProps(color)}
          style={[styles.button]}
          activeOpacity={0.85}
          onPress={animateButton}
        >
          <Animated.View style={[styles.buttonTextContainer, sizeStyle, animatedViewStyle]}>
            <AddSvg
              color={animation.current.interpolate({
                inputRange: [0, 1],
                outputRange: [colors.light.white, colors.light.ultramarineBlue],
              })}
              size={20}
            />
          </Animated.View>
        </Touchable>
      </Animated.View>
    </Animated.View>
  );
};

export default Fab;
