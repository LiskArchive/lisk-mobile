import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableHighlight, Text } from 'react-native';
import theme from './styles';
import Colors from '../../constants/styleGuide/colors';

const labelStyle = (propsStyle, disabled) => {
  const style = [theme.button, theme.labelButton];

  const propStylesArr = propsStyle instanceof Array ? propsStyle : [propsStyle];
  propStylesArr.forEach(element => style.push(element));

  if (disabled) style.push(theme.disabledButtonColor);

  return style;
};

const primaryStyle = (disabled) => {
  const style = [
    theme.button,
    theme.primaryButton,
  ];

  if (disabled) {
    style.push(theme.disabledButtonColor);
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

  return (<TouchableHighlight underlayColor='transparent' {...modifiedProps}>
    <Text style={props.style}>{props.children || props.title}</Text>
  </TouchableHighlight>);
};

export const PrimaryButton = props => (<LinearGradient
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    colors={props.disabled ?
      [Colors.white, Colors.white] :
      [Colors.action4, Colors.action2]}
    style={props.disabled ?
      [theme.disabledButtonBg, props.style] :
      [theme.buttonWrapper, props.style]
    }>
    <Button {...props} style={primaryStyle(props.disabled)} />
  </LinearGradient>);


export const SecondaryButton = props => (<LinearGradient
  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
  colors={props.disabled ?
    [Colors.grayScale3, Colors.grayScale3] :
    [Colors.primary4, Colors.primary9]}
  style={props.disabled ?
    [theme.disabledButtonBg, props.style] :
    [theme.buttonWrapper, props.style]
  }>
  <Button {...props} style={primaryStyle(props.disabled)} />
</LinearGradient>);

export const LabelButton = props =>
  <Button {...props} style={labelStyle(props.style, props.disabled)} />;
