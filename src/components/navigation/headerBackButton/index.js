/* eslint-disable complexity */
import React from 'react';
import { Dimensions, View } from 'react-native';
import { translate } from 'react-i18next';
import { IconButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import { H3 } from 'components/shared/toolBox/typography';
import StepProgress from 'components/shared/Stepper/StepProgress';
import getStyles from './styles';

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
  alwaysLight,
}) => {
  if (!color) {
    color = theme === themes.light ? colors.light.black : colors.dark.white;
  }
  if (alwaysLight) {
    color = colors.dark.black;
  }

  return (
    <View
      style={[
        styles.container,
        safeArea ? styles.safeArea : null,
        containerStyle,
        { width: Dimensions.get('window').width },
        alwaysLight && styles.whiteBackground,
      ]}
    >
      {noIcon ? null : (
        <IconButton
          style={[styles.main, styles.theme.main, style]}
          icon={icon || 'back'}
          onClick={onPress}
          color={color}
          testID="header-left-icon"
        />
      )}
      {title && (
          <H3 style={[styles.title, { color }, noIcon && styles.paddingLeft]}>
            {t(title)}
          </H3>
      )}
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
