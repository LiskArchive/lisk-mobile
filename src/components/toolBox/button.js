import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import theme from './styles';

const labelStyle = (propsStyle, disabled) => {
  const style = [theme.button];
  if (disabled) style.push(theme.disabledButtonColor);
  else style.push(theme.primaryButtonColor);
  if (propsStyle !== undefined && propsStyle instanceof Object) propsStyle = [propsStyle];

  return style.concat(propsStyle);
};

const primaryStyle = (propsStyle, disabled) => {
  const style = [theme.button];
  if (disabled) {
    style.push(theme.disabledButtonColor);
    style.push(theme.disabledButtonBg);
  } else {
    style.push(theme.primaryButtonColor);
    style.push(theme.primaryButtonBg);
  }
  if (propsStyle !== undefined && propsStyle instanceof Object) propsStyle = [propsStyle];

  return style.concat(propsStyle);
};

const modifyProps = (props) => {
  const modifiedProps = Object.keys(props)
    .filter(key => !(/onClick|children|style/.test(key)))
    .reduce((acc, key) => { acc[key] = props[key]; return acc; }, {});
  modifiedProps.onPress = () => props.onClick();

  return modifiedProps;
};

export const Button = (props) => {
  const modifiedProps = modifyProps(props);

  return (<TouchableHighlight {...modifiedProps} style={theme.primaryButton}>
    <Text style={props.style || {}}>{props.children || ''}</Text>
  </TouchableHighlight>);
};

export const PrimaryButton = props =>
  <Button {...props} style={primaryStyle(props.style, props.disabled)} />;

export const LabelButton = props =>
  <Button {...props} style={labelStyle(props.style, props.disabled)} />;
