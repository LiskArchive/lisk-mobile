/* eslint-disable complexity */
import React from 'react';
import { Dimensions, View } from 'react-native';
import { translate } from 'react-i18next';
import { IconButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import { P } from 'components/shared/toolBox/typography';
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
  titleStyle,
  iconStyle,
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
        styles.mainContainer,
        safeArea ? styles.safeArea : null,
        { width: Dimensions.get('window').width },
        alwaysLight && styles.whiteBackground,
        containerStyle,
      ]}
    >
      <View style={[styles.container]}>
        {noIcon ? null : (
          <IconButton
            style={[styles.main, styles.theme.main, style, iconStyle]}
            icon={icon || 'back'}
            onClick={onPress}
            color={color}
            testID="header-left-icon"
          />
        )}

        {rightIcon ? (
          <IconButton
            style={[styles.main, styles.theme.main, style]}
            icon={rightIcon}
            onPress={onRightPress}
            color={rightColor}
            testID="header-right-icon"
          />
        ) : null}
        {rightIconComponent && rightIconComponent()}
      </View>
      {title && <P style={[styles.title, { color }, titleStyle]}>{t(title)}</P>}
      {step && <StepProgress currentIndex={currentIndex} length={length} />}
    </View>
  );
};

export default withTheme(translate()(HeaderBackButton), getStyles());
