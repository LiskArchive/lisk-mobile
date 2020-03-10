import React, { Fragment } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardTrackingView } from 'react-native-keyboard-tracking-view';
import { withNavigation } from 'react-navigation';
import { PrimaryButton } from './button';
import theme from './styles';
import { deviceType } from '../../../utilities/device';

class ScrollAwareActionBar extends React.Component {
  state = {
    buttonStyle: theme.footerButton,
  };

  toggleButtonView = status => {
    if (status) {
      this.setState({ buttonStyle: theme.footerButton });
    } else {
      this.setState({ buttonStyle: theme.keyboardStickyButton });
    }
  };

  renderButton = style => {
    const {
      buttonTestID, noTheme, disabled, onSubmit, button
    } = this.props;

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

  render() {
    const {
      children,
      styles,
      viewIsInsideTab,
      noFooterButton,
      extraContent,
    } = this.props;
    const { buttonStyle } = this.state;

    /*
     * KeyboardTrackingView library is not optimized for iPhone X and
     * is not compatible with SafeAreaView, so screens outside the
     * tab router need to add marginBottom in order to render
     * the correct botton's height. The following workaround fixes
     * this issue until the library supports SafeAreaView
     */
    const shouldBeOptimizedForIphoneX =
      !viewIsInsideTab && deviceType() === 'iOSx';

    return (
      <Fragment>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={[
            styles ? styles.container : null,
            theme.scrollViewContainer,
          ]}
          onKeyboardWillHide={() => this.toggleButtonView(true)}
          onKeyboardDidHide={() => this.toggleButtonView(true)}
          onKeyboardWillShow={() => this.toggleButtonView(false)}
          onKeyboardDidShow={() => this.toggleButtonView(false)}
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
                {this.renderButton(theme.footerButton)}
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        {buttonStyle === theme.keyboardStickyButton && (
          <KeyboardTrackingView
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
            }}
          >
            {extraContent}
            {this.renderButton(theme.keyboardStickyButton)}
          </KeyboardTrackingView>
        )}
      </Fragment>
    );
  }
}

export default withNavigation(ScrollAwareActionBar);
