import React, { Fragment } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { SecondaryButton } from './button';
import theme from './styles';

class ScrollAwareActionBar extends React.Component {
  state = {
    buttonStyle: theme.keyboardStickyButton,
  }

  componentDidMount() {
    this.shrinkButton(true);
  }

  shrinkButton = (status) => {
    const { button } = this.props;
    const inBoxButton = button && button.type === 'inBox';
    if (status && inBoxButton) {
      this.setState({ buttonStyle: theme.hiddenStickyButton });
    } else if (status && !inBoxButton) {
      this.setState({ buttonStyle: theme.offKeyboardButton });
    } else {
      this.setState({ buttonStyle: theme.keyboardStickyButton });
    }
  }

  render() {
    const {
      children, disabled, onSubmit, noTheme,
      styles, button, hasTabBar, extras,
    } = this.props;
    const { buttonStyle } = this.state;

    return (
      <Fragment>
        <KeyboardAwareScrollView
          automaticallyAdjustContentInsets={false}
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          contentContainerStyle={[theme.scrollViewContainer, styles ? styles.container : null]}
          onKeyboardWillHide={() => this.shrinkButton(true)}
          onKeyboardDidHide={() => this.shrinkButton(true)}
          onKeyboardWillShow={() => this.shrinkButton(false)}
          onKeyboardDidShow={() => this.shrinkButton(false)}>
          <View style={[theme.scrollViewInnerContainer, styles ? styles.innerContainer : null]}>
            { children }
            {
              buttonStyle === theme.hiddenStickyButton ?
              <SecondaryButton
                noTheme={noTheme}
                style={theme.offKeyboardButton}
                disabled={disabled}
                title={typeof button === 'string' ? button : button.title}
                onClick={onSubmit} /> : null
            }
          </View>
        </KeyboardAwareScrollView>
        <KeyboardAccessoryView
          style={[
            theme.keyboard,
            buttonStyle === theme.keyboardStickyButton ? theme.overlay : null,
            buttonStyle === theme.offKeyboardButton ? theme.pullUp : null,
            hasTabBar ? theme.hasTabBar : null]}
          animationOn='none'
          alwaysVisible={true}>
          { extras }
          <SecondaryButton
            noTheme={noTheme}
            disabled={disabled}
            title={typeof button === 'string' ? button : button.title}
            onClick={onSubmit}
            style={buttonStyle} />
        </KeyboardAccessoryView>
      </Fragment>);
  }
}

export default ScrollAwareActionBar;
