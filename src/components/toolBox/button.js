import React, { Fragment } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableHighlight, Text } from 'react-native';
import theme from './styles';
import { colors } from '../../constants/styleGuide';
import Icon from './icon';

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
      [colors.white, colors.white] :
      [colors.action2, colors.action1]}
    style={[
      theme.buttonWrapper,
      props.style,
      props.disabled ? theme.disabledButtonBg : null,
    ]}>
    <Button {...props} style={primaryStyle(props.disabled)} />
  </LinearGradient>);


export const SecondaryButton = props => (<LinearGradient
  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
  colors={props.disabled ?
    [colors.white, colors.white] :
    [colors.primary4, colors.primary9]}
  style={[
    theme.buttonWrapper,
    props.style,
    props.disabled ? theme.disabledButtonBg : null,
  ]}>
  <Button {...props} style={primaryStyle(props.disabled)} />
</LinearGradient>);

export const LabelButton = props =>
  <Button {...props} style={labelStyle(props.style, props.disabled)} />;


/**
 * Creates a button with and icon on the side. direction of the icon and title
 * can be set in style property through flex properties.
 * any other property not mentioned here will be applied to the TouchableHighlight
 *
 * @param {Object} props
 * @param {Object|Number?} props.titleStyle - Will be applied to the Text element.
 *  can be a style object or a numeric style reference
 * @param {Object|Number?} props.style Will be applied to the clickable wrapper.
 *  can be a style object or a numeric style reference
 * @param {String?} props.title The title of the button
 * @param {String} props.icon The name of the icon defined in icon fonts
 * @param {String?} props.color The icon color. define the title color in titleStyle. default: #000
 * @param {Number?} props.iconSize The size of the icon in pixels
 */
export const IconButton = (props) => {
  const {
    titleStyle, style, title, icon, color, iconSize, onClick,
  } = props;
  const viewProps = Object.keys(props)
    .filter(key => !(/titleStyle|style|title|icon|color/.test(key)))
    .reduce((acc, key) => { acc[key] = props[key]; return acc; }, {});
  return (<TouchableHighlight
    onPress={onClick}
    underlayColor='transparent' {...viewProps}
    style={[theme.iconButton, style]}>
    <Fragment>
      <Icon name={icon} size={iconSize || 30} color={color || '#000'} />
      <Text style={[theme.iconButtonTitle, titleStyle]}>{ title || '' }</Text>
    </Fragment>
  </TouchableHighlight>);
};
