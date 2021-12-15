import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { themes } from '../../../../constants/styleGuide';
import withTheme from '../../withTheme';
import getStyles from './styles';

class Input extends React.Component {
  state = {
    isFocused: false,
  };

  onFocus = e => {
    this.setState({ isFocused: true });

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  };

  onBlur = e => {
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
      placeholderTextColor
    } = this.props;

    let { keyboardAppearance } = this.props;
    if (!keyboardAppearance) {
      keyboardAppearance = theme === themes.dark ? 'dark' : 'light';
    }

    let inputStyle = [styles.input, styles.theme.input, innerStyles.input];

    if (this.state.isFocused) {
      inputStyle = [
        ...inputStyle,
        styles.inputFocused,
        styles.theme.inputFocused,
      ];
    }

    if (error) {
      inputStyle = [...inputStyle, styles.theme.inputErrorStyle];
    }

    return (
      <View style={[styles.inputContainer, innerStyles.containerStyle]}>
        {label ? (
          <Text
            style={[
              styles.inputLabel,
              styles.theme.inputLabel,
              innerStyles.inputLabel,
            ]}
          >
            {label}
          </Text>
        ) : null}

        <TextInput
          testID={testID}
          style={inputStyle}
          autoCapitalize="none"
          multiline={multiline}
          ref={input => reference(input)}
          value={value}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          keyboardAppearance={keyboardAppearance}
          autoFocus={autoFocus}
          onChangeText={onChange}
          autoCorrect={autoCorrect}
          onFocus={this.onFocus}
          allowFontScaling={false}
          secureTextEntry={secureTextEntry}
          onBlur={this.onBlur}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          accessibilityLabel={accessibilityLabel}
        />

        {error ? (
          <View style={styles.errorMessageContainer}>
            <Text style={[styles.errorMessage, styles.theme.errorMessage]}>
              {error}
            </Text>
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
