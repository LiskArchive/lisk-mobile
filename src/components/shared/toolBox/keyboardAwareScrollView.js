import React, { Fragment } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardTrackingView } from 'react-native-keyboard-tracking-view';
import { withNavigation } from 'react-navigation';
import { PrimaryButton } from './button';
import theme from './styles';

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
      styles, button, footerContent, onStickyButton,
      buttonTestID,
    } = this.props;
    const { buttonStyle } = this.state;

    return (
      <Fragment>
        <KeyboardAwareScrollView
          style={{ overflow: 'hidden' }}
          enableOnAndroid={true}
          contentContainerStyle={styles ? styles.container : null}
          onKeyboardWillHide={() => this.toggleButtonView(true)}
          onKeyboardDidHide={() => this.toggleButtonView(true)}
          onKeyboardWillShow={() => this.toggleButtonView(false)}
          onKeyboardDidShow={() => this.toggleButtonView(false)}
        >
          <View style={styles ? styles.innerContainer : null}>
            { children }
            {
              !onStickyButton && buttonStyle === theme.hiddenStickyButton ?
              <View>
                { footerContent }
              </View> : null
            }
          </View>
        </KeyboardAwareScrollView>
        <KeyboardTrackingView>
          <PrimaryButton
            testID={buttonTestID}
            noTheme={noTheme}
            disabled={disabled}
            title={typeof button === 'string' ? button : button.title}
            onClick={onSubmit}
            style={[buttonStyle]}
          />
        </KeyboardTrackingView>
      </Fragment>);
  }
}

export default withNavigation(ScrollAwareActionBar);
