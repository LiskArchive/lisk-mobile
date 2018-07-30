import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
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
  label, reference, styles, value, onChange, error,
  multiline, onFocus, autoFocus, onBlur, autoCorrect,
}) => {
  const inputErrorStyle = error ? theme.inputErrorStyle : {};
  return (<View>
    <FormLabel labelStyle={[theme.inputLabel, styles.inputLabel]}>{label}</FormLabel>
    <FormInput
      containerStyle={[theme.input, inputErrorStyle]}
      inputStyle={[theme.inputText, styles.input]}
      autoCapitalize = 'none'
      multiline = {multiline}
      ref={input => reference(input)}
      value={value}
      autoFocus={autoFocus}
      onChangeText={onChange}
      autoCorrect={autoCorrect}
      onFocus={onFocus}
      onBlur={onBlur} />
    {error ? <View style={[theme.errorMessageContainer, styles.errorMessage] }>
      <Icon size={16} name='error' style={theme.errorIcon} />
      <FormValidationMessage labelStyle={[theme.errorMessage]}>
        { error }
      </FormValidationMessage>
    </View> : null }
  </View>);
};

export default Input;
