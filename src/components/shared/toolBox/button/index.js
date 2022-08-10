import React, { Fragment } from 'react';
import { TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import { colors } from 'constants/styleGuide';
import getStyles from './styles';
import Icon from '../icon';
import withTheme from '../../withTheme';

/**
 * Button Component
 */
const BaseButton = (props) => {
  const {
    styles,
    textStyle,
    children,
    title,
    disabled,
    testID,
    noPredefinedStyle,
    onClick,
    onPress,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress || onClick}
      testID={testID}
      style={[
        noPredefinedStyle ? null : styles.buttonContainer,
        props.style,
        disabled ? styles.disabledButtonContainer : null,
      ]}
      disabled={disabled}
    >
      <Text style={[noPredefinedStyle ? null : styles.buttonText, textStyle]}>
        {children || title}
      </Text>
    </TouchableOpacity>
  );
};

export const Button = withTheme(BaseButton, getStyles());

/**
 * Primary Button Component
 */
const BasePrimaryButton = (props) => {
  const { styles, noTheme } = props;

  return (
    <Button
      {...props}
      style={[
        styles.primaryButtonContainer,
        noTheme ? null : styles.theme.primaryButtonContainer,
        props.style,
      ]}
      textStyle={[
        styles.primaryButtonText,
        noTheme ? null : styles.theme.primaryButtonText,
        props.textStyle,
      ]}
    />
  );
};

export const PrimaryButton = withTheme(BasePrimaryButton, getStyles());

const LabelButton = (props) => {
  const labelStyle = ({
    propsStyle, disabled, styles, style
  }) => {
    const mergestyle = [styles.button, styles.labelButton];

    const propStylesArr = propsStyle instanceof Array ? propsStyle : [propsStyle];
    propStylesArr.forEach((element) => mergestyle.push(element));

    if (disabled) mergestyle.push(styles.disabledButtonColor);
    mergestyle.push(style);
    return mergestyle;
  };

  return (
    <Button
      {...props}
      style={labelStyle(props)}
      textStyle={{ color: colors.light.ultramarineBlue, ...props.textStyle }}
    />
  );
};

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
    titleStyle, style, title, icon, color, iconSize, onClick, onPress, iconStyle, testID
  } = props;

  const viewProps = Object.keys(props)
    .filter((key) => !/titleStyle|style|title|icon|color/.test(key))
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

  return (
    <TouchableHighlight
      onPress={onClick || onPress}
      underlayColor="transparent"
      {...viewProps}
      testID={testID}
      style={[props.styles.iconButton, style]}
    >
      <Fragment>
        {React.isValidElement(icon) ? (
          icon
        ) : (
          <Icon style={iconStyle} name={icon} size={iconSize || 30} color={color || '#000'} />
        )}

        {title && <Text style={[props.styles.iconButtonTitle, titleStyle]}>{title}</Text>}
      </Fragment>
    </TouchableHighlight>
  );
};

const ThemedLabelButton = withTheme(LabelButton, getStyles());
const ThemedIconButton = withTheme(IconButton, getStyles());

export { ThemedLabelButton as LabelButton, ThemedIconButton as IconButton };
