import React, { Fragment, useState } from 'react';
import { useHeaderHeight } from '@react-navigation/stack';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardTrackingView } from 'react-native-keyboard-tracking-view';
import { withNavigation } from '@react-navigation/compat';
import { PrimaryButton } from './button';
import theme from './styles';
import { deviceType } from '../../../utilities/device';

const ScrollAwareActionBar = ({
  buttonTestID,
  noTheme,
  disabled,
  onSubmit,
  button,
  children,
  styles,
  viewIsInsideTab,
  noFooterButton,
  extraContent,
}) => {
  const [buttonStyle, SetButtonStyle] = useState(theme.footerButton);
  const headerHeight = useHeaderHeight();

  const toggleButtonView = status => {
    if (status) {
      SetButtonStyle(theme.footerButton);
    } else {
      SetButtonStyle(theme.keyboardStickyButton);
    }
  };

  const renderButton = style => {
    return (
      <PrimaryButton
        testID={buttonTestID}
        noTheme={noTheme}
        disabled={disabled}
        title={typeof button === 'string' ? button : button.title}
        onClick={onSubmit}
        style={style}
      />
    );
  };

  /*
   * KeyboardTrackingView library is not optimized for iPhone X and
   * is not compatible with SafeAreaView, so screens outside the
   * tab router need to add marginBottom in order to render
   * the correct botton's height. The following workaround fixes
   * this issue until the library supports SafeAreaView
   */
  const osType = deviceType();
  const shouldBeOptimizedForIphoneX = !viewIsInsideTab && osType === 'iOSx';

  const trackerView = {
    android: {
      width: '100%',
    },
    iOS: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      marginBottom: viewIsInsideTab ? -1 * (headerHeight - 10) : 0,
    },
    iOSx: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      marginBottom: viewIsInsideTab ? -1 * (headerHeight - 14) : 0,
    },
  };

  return (
    <Fragment>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={[
          styles ? styles.container : null,
          theme.scrollViewContainer,
        ]}
        onKeyboardWillHide={() => toggleButtonView(true)}
        onKeyboardDidHide={() => toggleButtonView(true)}
        onKeyboardWillShow={() => toggleButtonView(false)}
        onKeyboardDidShow={() => toggleButtonView(false)}
      >
        <View
          style={[
            styles ? styles.innerContainer : null,
            theme.scrollViewInnerContainer,
          ]}
        >
          {children}
          {!noFooterButton && buttonStyle === theme.footerButton && (
            <View
              style={[
                theme.footerButtonContainer,
                shouldBeOptimizedForIphoneX ? theme.iPhoneXMargin : null,
              ]}
            >
              {extraContent}
              {renderButton(theme.footerButton)}
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      {buttonStyle === theme.keyboardStickyButton && (
        <KeyboardTrackingView style={trackerView[osType]}>
          {extraContent}
          {renderButton([theme.keyboardStickyButton])}
        </KeyboardTrackingView>
      )}
    </Fragment>
  );
};

export default withNavigation(ScrollAwareActionBar);
