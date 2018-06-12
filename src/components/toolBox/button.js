import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import theme from './styles';

export const PrimaryButton = (props) => {
  const modifiedProps = Object.keys(props)
    .filter(key => !(/onClick|children|style/.test(key)))
    .reduce((acc, key) => { acc[key] = props[key]; return acc; }, {});
  modifiedProps.onPress = props.onClick;

  // style includes the custom style on element
  // default button theme and active/disable state
  const style = [theme.button];
  if (modifiedProps.disabled) {
    style.push(theme.disabledButtonColor);
    style.push(theme.disabledButtonBg);
  } else {
    style.push(theme.primaryButtonColor);
    style.push(theme.primaryButtonBg);
  }
  if (props.style) style.push(props.style);

  return (<TouchableHighlight {...modifiedProps} style={theme.primaryButton}>
      <Text style={style}>{props.children || ''}</Text>
    </TouchableHighlight>);
};

export const LabelButton = (props) => {
  const modifiedProps = Object.keys(props)
    .filter(key => !(/onClick|children|style/.test(key)))
    .reduce((acc, key) => { acc[key] = props[key]; return acc; }, {});
  modifiedProps.onPress = props.onClick;

  // style includes the custom style on element
  // default button theme and active/disable state
  const style = [theme.button];
  if (modifiedProps.disabled) style.push(theme.disabledButtonColor);
  else style.push(theme.primaryButtonColor);
  if (props.style) style.push(props.style);

  return (<TouchableHighlight {...modifiedProps} style={theme.primaryButton}>
      <Text style={style}>{props.children || ''}</Text>
    </TouchableHighlight>);
};
