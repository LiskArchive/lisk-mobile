import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from 'hooks/useTheme'

import getNavigationSafeAreaViewStyles from './styles'

export default function NavigationSafeAreaView({ children, style }) {
  const tabBarHeight = useBottomTabBarHeight()

  const { styles } = useTheme({
    styles: getNavigationSafeAreaViewStyles(tabBarHeight),
  })

  return (
    <SafeAreaView style={[styles.container, styles.theme.container, style]}>
      {children}
    </SafeAreaView>
  )
}
