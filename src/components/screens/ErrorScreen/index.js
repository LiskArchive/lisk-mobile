import React from 'react'
import { View, Text } from 'react-native'

import { useTheme } from 'hooks/useTheme'
import { PrimaryButton } from 'components/shared/toolBox/button'
import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg'

import getErrorScreenStyles from './styles'

export default function ErrorScreen({
  title,
  description,
  styles: baseStyles,
  onContinue,
  buttonText,
  children,
  disabled,
}) {
  const { styles } = useTheme({
    styles: getErrorScreenStyles(),
  })

  return (
    <View style={[styles.wrapper, styles.theme.wrapper, baseStyles?.wrapper]}>
      <View style={[styles.container]}>
        <View style={styles.illustration}>
          <CircleCrossedSvg height={48} width={48} style={[styles.icon]} />
        </View>

        {title && (
          <Text style={[styles.title, styles.theme.title, baseStyles?.title]}>{title}</Text>
        )}

        {description && (
          <Text style={[styles.description, styles.theme.description, baseStyles?.description]}>
            {description}
          </Text>
        )}

        {children}
      </View>

      <PrimaryButton
        noTheme
        title={buttonText}
        style={[styles.continueButton, baseStyles?.continueButton]}
        onPress={onContinue}
        disabled={disabled}
      />
    </View>
  )
}
