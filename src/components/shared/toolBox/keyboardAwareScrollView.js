/* eslint-disable complexity */
import React, { Fragment } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  extraContent
}) => {
  const renderButton = (style) => {
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

  return (
    <Fragment>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={[styles ? styles.container : null, theme.scrollViewContainer]}
      >
        <View style={[styles ? styles.innerContainer : null, theme.scrollViewInnerContainer]}>
          {children}
          {!noFooterButton && (
            <View
              style={[
                theme.footerButtonContainer,
                shouldBeOptimizedForIphoneX ? theme.iPhoneXMargin : null
              ]}
            >
              {extraContent}
              {renderButton(theme.footerButton)}
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
  );
};

export default withNavigation(ScrollAwareActionBar);
