import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import theme from './styles';

const labelStyle = (propsStyle, disabled) => {
  const style = [theme.button, theme.primaryButtonColor];

  const propStylesArr = propsStyle instanceof Array ? propsStyle : [propsStyle];
  propStylesArr.forEach(element => style.push(element));

  if (disabled) style.push(theme.disabledButtonColor);

  return style;
};

const primaryStyle = (propsStyle, disabled) => {
  const style = [
    theme.button,
    theme.primaryButtonColor,
    theme.primaryButtonBg,
  ];

  const propStylesArr = propsStyle instanceof Array ? propsStyle : [propsStyle];
  propStylesArr.forEach(element => style.push(element));

  if (disabled) {
    style.push(theme.disabledButtonColor);
    style.push(theme.disabledButtonBg);
  }

  return style;
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

  return (<TouchableHighlight underlayColor='transparent' {...modifiedProps} style={theme.primaryButton}>
    <Text style={props.style || {}}>{props.children || props.title}</Text>
  </TouchableHighlight>);
};

export const PrimaryButton = props =>
  <Button {...props} style={primaryStyle(props.style, props.disabled)} />;

export const LabelButton = props =>
  <Button {...props} style={labelStyle(props.style, props.disabled)} />;
