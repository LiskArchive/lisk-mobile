import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { themes } from 'constants/styleGuide';
import withTheme from '../../withTheme';
import getStyles from './styles';
import EyeSvg from '../../../../assets/svgs/EyeSvg';

class Input extends React.Component {
  state = {
    isFocused: false,
    secureTextEntry: this.props.secureTextEntry,
  };

  toggleSecureTextEntry = () => this.setState((prevState) => ({ secureTextEntry: !prevState.secureTextEntry }));

  onFocus = (e) => {
    this.setState({ isFocused: true });

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  };

  onBlur = (e) => {
    this.setState({ isFocused: false });

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  };

  render() {
    const {
      reference,
      innerStyles,
      label,
      styles,
      theme,
      value,
      onChange,
      error,
      multiline,
      autoFocus,
      autoCorrect,
      keyboardType,
      secureTextEntry,
      placeholder,
      testID,
      accessibilityLabel,
      returnKeyType,
      placeholderTextColor,
      disabled,
    } = this.props;

    let { keyboardAppearance } = this.props;
    if (!keyboardAppearance) {
      keyboardAppearance = theme === themes.dark ? 'dark' : 'light';
    }

    let inputStyle = [styles.input, styles.theme.input, innerStyles.input];

    if (this.state.isFocused) {
      inputStyle = [...inputStyle, styles.inputFocused, styles.theme.inputFocused];
    }

    if (error) {
      inputStyle = [...inputStyle, styles.theme.inputErrorStyle];
    }

    return (
      <View style={[styles.inputContainer, innerStyles.containerStyle]}>
        {label ? (
          <Text style={[styles.inputLabel, styles.theme.inputLabel, innerStyles.inputLabel]}>{label}</Text>
        ) : null}
        <View style={styles.inputRow}>
          <TextInput
            testID={testID}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            style={inputStyle}
            autoCapitalize="none"
            multiline={multiline}
            ref={(input) => reference(input)}
            value={value}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            keyboardAppearance={keyboardAppearance}
            autoFocus={autoFocus}
            onChangeText={onChange}
            autoCorrect={autoCorrect}
            onFocus={this.onFocus}
            allowFontScaling={false}
            secureTextEntry={this.state.secureTextEntry}
            onBlur={this.onBlur}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            accessibilityLabel={accessibilityLabel}
          />
          {secureTextEntry && (
            <TouchableOpacity onPress={this.toggleSecureTextEntry} style={styles.inputIcon}>
              <EyeSvg />
            </TouchableOpacity>
          )}
        </View>

        {error ? (
          <View style={styles.errorMessageContainer}>
            <Text style={[styles.errorMessage, styles.theme.errorMessage]}>{error}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

Input.defaultProps = {
  reference: () => {},
  innerStyles: {},
  keyboardType: 'default',
  placeholder: '',
};

export default withTheme(Input, getStyles());
