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
  }

  toggleButtonView = (status) => {
    if (status) {
      this.setState({ buttonStyle: theme.footerButton });
    } else {
      this.setState({ buttonStyle: theme.keyboardStickyButton });
    }
  }

  render() {
    const {
      children, disabled, onSubmit, noTheme,
      styles, button, footerContent,
      buttonTestID, viewIsInsideTab,
    } = this.props;
    const { buttonStyle } = this.state;

    /*
     * KeyboardTrackingView library is not optimized for iPhone X and
     * is not compatible with SafeAreaView, so screens outside the
     * tab router need to reduce the marginBottom in order to render
     * the correct botton's height. The following workaround fixes
     * this issue until the library supports SafeAreaView
     */
    const shouldBeOptimizedForIphoneX = !viewIsInsideTab && buttonStyle === theme.keyboardStickyButton && deviceType() === 'iOSx';

    return (
      <Fragment>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={[styles ? styles.container : null, theme.scrollViewContainer]}
          onKeyboardWillHide={() => this.toggleButtonView(true)}
          onKeyboardDidHide={() => this.toggleButtonView(true)}
          onKeyboardWillShow={() => this.toggleButtonView(false)}
          onKeyboardDidShow={() => this.toggleButtonView(false)}
        >
          <View style={[styles ? styles.innerContainer : null]}>
            { children }
            <View>
              { footerContent }
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardTrackingView>
          <PrimaryButton
            testID={buttonTestID}
            noTheme={noTheme}
            disabled={disabled}
            title={typeof button === 'string' ? button : button.title}
            onClick={onSubmit}
            style={[buttonStyle, shouldBeOptimizedForIphoneX ? theme.iPhoneXOptimization : null]}
          />
        </KeyboardTrackingView>
      </Fragment>);
  }
}

export default withNavigation(ScrollAwareActionBar);
