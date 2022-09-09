import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from 'hooks/useTheme'
import AccountsManager from 'modules/Accounts/components/AccountsManager'
import Splash from '../components/splash'

import getAccountsManagerScreenStyles from './styles'

export default function AccountsManagerScreen() {
  const { styles } = useTheme({
    styles: getAccountsManagerScreenStyles(),
  })

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <Splash animate={false} />

      <AccountsManager style={{ container: styles.container }} />
    </SafeAreaView>
  )
}
