/* eslint-disable complexity */
import React from 'react';
import { Dimensions, View } from 'react-native';
import { translate } from 'react-i18next';
import { IconButton } from '../../../shared/toolBox/button';
import { colors, themes } from '../../../../constants/styleGuide';
import withTheme from '../../../shared/withTheme';
import getStyles from './styles';
import { H3 } from '../../../shared/toolBox/typography';
import StepProgress from '../../../shared/multiStep/stepProgress';

const HeaderBackButton = ({
  theme,
  styles,
  style,
  onPress,
  color,
  rightColor,
  icon,
  safeArea,
  title,
  t,
  noIcon,
  rightIcon,
  onRightPress,
  rightIconComponent,
  containerStyle,
  step,
  currentIndex,
  length,
}) => {
  if (!color) {
    color = theme === themes.light ? colors.light.black : colors.dark.white;
  }

  return (
    <View
      style={[
        styles.container,
        safeArea ? styles.safeArea : null,
        containerStyle,
        { width: Dimensions.get('window').width },
      ]}
    >
      {noIcon ? null : (
        <IconButton
          style={[styles.main, styles.theme.main, style]}
          icon={icon || 'back'}
          onClick={onPress}
          color={color}
        />
      )}
      {title && <H3 style={[styles.title, { color }, noIcon && styles.paddingLeft]}>{t(title)}</H3>}
      {rightIcon ? (
        <IconButton
          style={[styles.main, styles.theme.main, style]}
          icon={rightIcon}
          onPress={onRightPress}
          color={rightColor}
        />
      ) : null}
      {rightIconComponent && rightIconComponent()}
      {step && <StepProgress currentIndex={currentIndex} length={length} />}
    </View>
  );
};

export default withTheme(translate()(HeaderBackButton), getStyles());
