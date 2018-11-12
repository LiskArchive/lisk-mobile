import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from './icon';
import theme from './styles';
/**
 * This is thematic wrapper over Icon component of react native elements
 *
 * @param {Object} props
 * @param {String} props.tintColor - A valid Hex color code
 * @param {String} props.name - An icon name existing in our icons list
 * @param {Number} props.size - THe size of the icon in pixels, defaults to 35
 */
const Input = ({
  label, reference, innerStyles, value, onChange, error,
  multiline, onFocus, autoFocus, onBlur, autoCorrect,
  keyboardType, secureTextEntry,
}) => {
  const inputErrorStyle = error ? theme.inputErrorStyle : {};
  return (
    <View style={[theme.inputContainer, innerStyles.containerStyle]}>
      <Text style={[theme.inputLabel, innerStyles.inputLabel]}>
        {label}
      </Text>

      <TextInput
        style={[theme.input, inputErrorStyle, innerStyles.input]}
        autoCapitalize='none'
        multiline={multiline}
        ref={input => reference(input)}
        value={value}
        keyboardType={keyboardType || 'default'}
        autoFocus={autoFocus}
        onChangeText={onChange}
        autoCorrect={autoCorrect}
        onFocus={onFocus}
        allowFontScaling={false}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
      />

      {error ? (
        <View style={[theme.errorMessageContainer, innerStyles.errorMessage]}>
          <Icon size={16} name='error' style={theme.errorIcon} />
          <Text style={[theme.errorMessage]}>
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;
