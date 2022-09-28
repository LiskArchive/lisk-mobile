import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg';
import colors from 'constants/styleGuide/colors';

import getStyles from './styles';

export default function ResultScreen({
  illustration: baseIllustration,
  title,
  description,
  onContinue,
  buttonText,
  children,
  disabled,
  variant,
  styles: baseStyles,
}) {
  const { styles } = useTheme({ styles: getStyles() });

  let illustration = baseIllustration;

  if (!illustration) {
    switch (variant) {
      case 'success':
        illustration = <CircleCheckedSvg height={80} width={80} color={colors.light.ufoGreen} />;
        break;
      case 'error':
        illustration = <CircleCrossedSvg height={80} width={80} color={colors.light.furyRed} />;
        break;

      default:
        break;
    }
  }

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper, baseStyles?.wrapper]}>
      <View style={[styles.container, baseStyles?.container]}>
        {illustration && (
          <View style={[styles.illustration, baseStyles?.illustration]}>{illustration}</View>
        )}

        {title && (
          <Text style={[styles.title, styles.theme.title, baseStyles?.title]}>{title}</Text>
        )}

        {typeof description === 'string' ? (
          <Text style={[styles.description, styles.theme.description, baseStyles?.description]}>
            {description}
          </Text>
        ) : (
          description
        )}

        {children}
      </View>

      {onContinue && (
        <PrimaryButton
          noTheme
          title={buttonText}
          style={styles.continueButton}
          onPress={onContinue}
          disabled={disabled}
        />
      )}
    </SafeAreaView>
  );
}
