import React, { Fragment } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableHighlight, Text } from 'react-native';
import getStyles from './styles';
import { colors, themes } from '../../../constants/styleGuide';
import Icon from '../icon';
import withTheme from '../../withTheme';

const labelStyle = ({ propsStyle, disabled, styles }) => {
  const style = [styles.button, styles.labelButton];

  const propStylesArr = propsStyle instanceof Array ? propsStyle : [propsStyle];
  propStylesArr.forEach(element => style.push(element));

  if (disabled) style.push(styles.disabledButtonColor);

  return style;
};

const primaryStyle = ({ styles, disabled, style }) => {
  const mergestyle = [
    styles.button,
    styles.primaryButton,
  ];

  if (disabled) {
    mergestyle.push(styles.disabledButtonColor);
    mergestyle.push(styles.theme.disabledButtonColor);
  }
  mergestyle.push(style);
  return mergestyle;
};

const modifyProps = (props) => {
  const modifiedProps = Object.keys(props)
    .filter(key => !(/onClick|children|style/.test(key)))
    .reduce((acc, key) => { acc[key] = props[key]; return acc; }, {});
  modifiedProps.onPress = () => props.onClick();

  return modifiedProps;
};

const Button = (props) => {
  const modifiedProps = modifyProps(props);
  return (<TouchableHighlight underlayColor='transparent' {...modifiedProps}>
    <Text style={props.style}>{props.children || props.title}</Text>
  </TouchableHighlight>);
};

const PrimaryButton = (props) => {
  const {
    theme, disabled, styles, noTheme,
  } = props;
  const disableColor = (noTheme || theme === themes.light) ?
    colors.light.white : colors.dark.screenBgNavy;
  const disabledStyle = disabled ?
    [styles.disabledButtonBg, styles.theme.disabledButtonBg] : [];
  return (<LinearGradient
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    colors={props.disabled ?
      [disableColor, disableColor] :
      [colors.light.actionRedAccent, colors.light.actionRed]}
    style={[
      styles.buttonWrapper,
      ...disabledStyle,
      props.style,
    ]}>
    <Button {...props} style={primaryStyle(props)} />
  </LinearGradient>);
};

const SecondaryButton = (props) => {
  const {
    theme, disabled, styles, noTheme,
  } = props;
  const disableColor = (noTheme || theme === themes.light) ?
    colors.light.white : colors.dark.screenBgNavy;
  const disabledStyle = disabled ?
    [styles.disabledButtonBg, styles.theme.disabledButtonBg] : [];
  return (<LinearGradient
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    colors={disabled ?
      [disableColor, disableColor] :
      [colors.light.actionBlueAccent, colors.light.actionBlue]}
    style={[
      styles.buttonWrapper,
      ...disabledStyle,
      props.style,
    ]}>
    <Button {...props} style={primaryStyle(props)} />
  </LinearGradient>);
};


const LabelButton = props =>
  <Button {...props} style={labelStyle(props)} />;


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
const IconButton = (props) => {
  const {
    titleStyle, style, title, icon, color, iconSize, onClick,
  } = props;
  const viewProps = Object.keys(props)
    .filter(key => !(/titleStyle|style|title|icon|color/.test(key)))
    .reduce((acc, key) => { acc[key] = props[key]; return acc; }, {});
  return (<TouchableHighlight
    onPress={onClick}
    underlayColor='transparent' {...viewProps}
    style={[props.styles.iconButton, style]}>
    <Fragment>
      <Icon name={icon} size={iconSize || 30} color={color || '#000'} />
      <Text style={[props.styles.iconButtonTitle, titleStyle]}>{ title || '' }</Text>
    </Fragment>
  </TouchableHighlight>);
};

const pb = withTheme(PrimaryButton, getStyles());
const sb = withTheme(SecondaryButton, getStyles());
const lb = withTheme(LabelButton, getStyles());
const ib = withTheme(IconButton, getStyles());
const b = withTheme(Button, getStyles());

export {
  pb as PrimaryButton,
  sb as SecondaryButton,
  lb as LabelButton,
  ib as IconButton,
  b as Button,
};
