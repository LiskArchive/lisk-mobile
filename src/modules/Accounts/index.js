/* eslint-disable max-statements */
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from 'hooks/useTheme'
import ApplicationManagerModal from 'modules/BlockchainApplication/components/ApplicationManagerModal'
import { P } from 'components/shared/toolBox/typography'
import Avatar from 'components/shared/avatar'
import { stringShortener } from 'utilities/helpers'
import { colors } from 'constants/styleGuide'
import SwitchSvg from 'assets/svgs/SwitchSvg'
import IncognitoSvg from 'assets/svgs/IncognitoSvg'
import CopyToClipboard from 'components/shared/copyToClipboard'
import { settingsUpdated } from 'modules/Settings/actions'
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView'
import ApplicationSwitcher from '../BlockchainApplication/components/ApplicationSwitcher'
import { useCurrentAccount } from './hooks/useAccounts/useCurrentAccount'
import TokensTab from './components/TokensTab'
import getStyles from './styles'
import TransactionList from '../Transactions/components/TransactionList'
import AccountsManagerModal from './components/AccountsManagerModal'

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In
 *
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
export default function Home() {
  const navigation = useNavigation()
  const [showManageAccountsModal, setShowManageAccountsModal] = useState(false)
  const [showManageApplicationsModal, setShowManageApplicationsModal] = useState(false)
  const [currAccount] = useCurrentAccount()
  const { address, name: username } = currAccount.metadata
  const discrete = useSelector((state) => state.settings.discrete)
  const dispatch = useDispatch()

  const { styles } = useTheme({ styles: getStyles() })

  const toggleIncognito = () => {
    ReactNativeHapticFeedback.trigger('selection')
    dispatch(
      settingsUpdated({
        discrete: !discrete,
      })
    )
  }
  const requestTokens = () => navigation.navigate('Request')
  const sendTokens = () => navigation.navigate('Send')

  return (
    <>
      <NavigationSafeAreaView>
        <View style={[styles.row, styles.alignItemsCenter, styles.topContainer]}>
          <TouchableOpacity style={[styles.discreteContainer]} onPress={toggleIncognito}>
            <IncognitoSvg size={1.2} disabled={discrete} />
          </TouchableOpacity>
          <View style={styles.flex}>
            <ApplicationSwitcher onPress={() => setShowManageApplicationsModal(true)} />
          </View>
        </View>
        <View style={[styles.body]}>
          <View style={[styles.accountCard]}>
            <View style={[styles.row]}>
              <Avatar address={address} size={50} />
              <View style={[styles.accountDetails]}>
                <P style={[styles.username, styles.theme.username]}>{username}</P>
                <View>
                  <CopyToClipboard
                    labelStyle={[styles.address, styles.theme.address]}
                    label={stringShortener(address, 7, 6)}
                    iconColor={colors.light.platinumGray}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={[styles.switchContainer]}
                onPress={() => setShowManageAccountsModal(true)}
              >
                <SwitchSvg />
              </TouchableOpacity>
            </View>
            <View style={[styles.row, styles.buttonContainer]}>
              <TouchableOpacity style={[styles.button]} onPress={requestTokens}>
                <P style={[styles.buttonText]}>Request</P>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.sendButton]} onPress={sendTokens}>
                <P style={[styles.buttonText, styles.sendButtonText]}>Send</P>
              </TouchableOpacity>
            </View>
          </View>

          <TokensTab />

          <TransactionList />
        </View>
      </NavigationSafeAreaView>

      <AccountsManagerModal show={showManageAccountsModal} setShow={setShowManageAccountsModal} />
      <ApplicationManagerModal
        show={showManageApplicationsModal}
        setShow={setShowManageApplicationsModal}
      />
    </>
  )
}
