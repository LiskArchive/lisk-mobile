import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from '../icon';
import withTheme from '../../withTheme';
import getStyles from './styles';

/**
 * This is thematic wrapper over Icon component of react native elements
 *
 * @param {Object} props
 * @param {String} props.tintColor - A valid Hex color code
 * @param {String} props.name - An icon name existing in our icons list
 * @param {Number} props.size - THe size of the icon in pixels, defaults to 35
 */
const Input = ({
  reference = () => {}, innerStyles = {}, styles = {},
  label, value, error, multiline, autoFocus, autoCorrect, secureTextEntry,
  keyboardType = 'default', returnKeyType = 'default',
  onChange, onFocus, onBlur, onSubmitEditing,
}) => {
  const inputStyle = [
    styles.input,
    styles.theme.input,
    innerStyles.input,
    (error ? styles.inputErrorStyle : {}),
    (error ? styles.theme.inputErrorStyle : {}),
  ];

  return (
    <View style={[styles.inputContainer, innerStyles.containerStyle]}>
      <Text style={[styles.inputLabel, styles.theme.inputLabel, innerStyles.inputLabel]}>
        {label}
      </Text>

      <TextInput
        style={inputStyle}
        autoCapitalize='none'
        multiline={multiline}
        ref={input => reference(input)}
        value={value}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        onChangeText={onChange}
        autoCorrect={autoCorrect}
        onFocus={onFocus}
        allowFontScaling={false}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />

      {error ? (
        <View style={[styles.errorMessageContainer, innerStyles.errorMessage]}>
          <Icon
            size={16}
            name='error'
            style={[styles.errorIcon, styles.theme.errorIcon]}
          />
          <Text style={[styles.errorMessage, styles.theme.errorMessage]}>
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default withTheme(Input, getStyles());
