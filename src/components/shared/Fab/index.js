/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useEffect, useRef, useState } from 'react'; // eslint-disable-line
import { Animated, LayoutAnimation, Platform, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddSvg from 'assets/svgs/AddSvg';
import { colors } from 'constants/styleGuide';

import FloatingActionItem from './FloatingItem';

import { isIphoneX } from './utils/platform';
import { getTouchableComponent, getRippleProps } from './utils/touchable';
import styles from './styles';

/**
 *
 * Sample:
 * const actions = [{ text: 'Paste URI', icon: <Component /> }]
 * <Fab actions={actions} onPressItem={(item) => console.log(item)} />
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
  dismissKeyboardOnPress,
  onPressMain,
  onOpen,
  onPressItem,
  distanceToEdge,
  actionsPaddingTopBottom = 10,
  color = colors.light.ultramarineBlue,
  bottom = 0,
}) => {
  const [active, setActive] = useState(openOnMount);
  const mainBottomAnimation = useRef(new Animated.Value(mainVerticalDistance + bottom));
  const actionsBottomAnimation = useRef(new Animated.Value(buttonSize + bottom + 50));
  const animation = useRef(new Animated.Value(openOnMount ? 1 : 0));
  const actionsAnimation = useRef(new Animated.Value(0));

  const onKeyboardShow = (e) => {
    const { height } = e.endCoordinates;
    Animated.parallel([
      Animated.spring(actionsBottomAnimation.current, {
        bounciness: 0,
        toValue: buttonSize + height - (isIphoneX() ? 40 : 0),
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.spring(mainBottomAnimation.current, {
        bounciness: 0,
        toValue: height - (isIphoneX() ? 40 : 0),
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const onKeyboardHideHide = () => {
    Animated.parallel([
      Animated.spring(actionsBottomAnimation.current, {
        bounciness: 0,
        toValue: buttonSize + actionsPaddingTopBottom,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.spring(mainBottomAnimation.current, {
        bounciness: 0,
        toValue: mainVerticalDistance,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const reset = () => {
    Animated.spring(animation.current, { toValue: 0, useNativeDriver: false }).start();
    Animated.spring(actionsAnimation.current, { toValue: 0, useNativeDriver: false }).start();
    setActive(false);
    onClose?.();
  };

  const animateButton = () => {
    if (dismissKeyboardOnPress) {
      Keyboard.dismiss();
    }

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
      reset();
    }
  };

  const handlePressItem = (item) => {
    onPressItem(item);
    reset();
  };

  const renderMainButton = () => {
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
              size={1.3}
            />
          </Animated.View>
        </Touchable>
      </Animated.View>
    );
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
              distanceToEdge={distanceToEdge}
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
    setActive(false);
    onClose?.();
  };

  const renderTappableBackground = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.overlay, styles.overlayColor]}
        onPress={handlePressBackdrop}
      />
    );
  };

  return (
    <Animated.View pointerEvents="box-none" style={[styles.overlay]}>
      {active && showBackground && renderTappableBackground()}
      {renderActions()}
      {renderMainButton()}
    </Animated.View>
  );
};

export default Fab;
