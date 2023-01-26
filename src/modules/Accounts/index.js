/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from 'contexts/ThemeContext';
import ApplicationManagerModal from 'modules/BlockchainApplication/components/ApplicationManagerModal';
import { P } from 'components/shared/toolBox/typography';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { colors } from 'constants/styleGuide';
import SwitchSvg from 'assets/svgs/SwitchSvg';
import IncognitoSvg from 'assets/svgs/IncognitoSvg';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { settingsUpdated } from 'modules/Settings/actions';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import ApplicationSwitcher from '../BlockchainApplication/components/ApplicationSwitcher';
import { useCurrentAccount } from './hooks/useCurrentAccount';
import getStyles from './styles';
import TransactionList from '../Transactions/components/TransactionList';
import AccountsManagerModal from './components/AccountsManagerModal';
import TokenList from './components/TokenList/TokenList';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In.
 */
export default function Home() {
  const navigation = useNavigation();
  const [showManageAccountsModal, setShowManageAccountsModal] = useState(false);
  const [showManageApplicationsModal, setShowManageApplicationsModal] = useState(false);
  const [currAccount] = useCurrentAccount();
  const { address, name: username } = currAccount.metadata;
  const discrete = useSelector((state) => state.settings.discrete);
  const dispatch = useDispatch();
  const { accounts } = useAccounts();

  const { styles } = useTheme({ styles: getStyles() });

  const toggleIncognito = () => {
    ReactNativeHapticFeedback.trigger('selection');
    dispatch(
      settingsUpdated({
        discrete: !discrete,
      })
    );
  };
  const handleRequestTokensClick = () => navigation.navigate('Request');
  const handleSendTokensClick = () => navigation.navigate('Send');

  useEffect(() => {
    if (!accounts?.length) {
      navigation.navigate('AuthMethod');
    }
  }, [accounts, navigation]);

  return (
    <>
      <NavigationSafeAreaView>
        <View
          style={[styles.row, styles.alignItemsCenter, styles.topContainer]}
          testID="accounts-home-container"
        >
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
                <P style={[styles.username, styles.theme.username]} testID="username-label">
                  {username}
                </P>
                <View>
                  <CopyToClipboard
                    value={address}
                    labelStyle={[styles.address, styles.theme.address]}
                    label={stringShortener(address, 7, 6)}
                    iconColor={colors.light.platinumGray}
                    testID="address-copy-to-clipboard"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.switchContainer]}
                onPress={() => setShowManageAccountsModal(true)}
                testID="switch-account"
              >
                <SwitchSvg />
              </TouchableOpacity>
            </View>

            <View style={[styles.row, styles.buttonContainer]}>
              <TouchableOpacity style={[styles.button]} onPress={handleRequestTokensClick}>
                <P style={[styles.buttonText]}>Request</P>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.sendButton]}
                onPress={handleSendTokensClick}
              >
                <P style={[styles.buttonText, styles.sendButtonText]}>Send</P>
              </TouchableOpacity>
            </View>
          </View>

          <TokenList mode="overview" style={{ container: { marginTop: 16 } }} />

          <TransactionList mode="overview" style={{ container: { marginTop: 16 } }} />
        </View>
      </NavigationSafeAreaView>

      <AccountsManagerModal show={showManageAccountsModal} setShow={setShowManageAccountsModal} />

      <ApplicationManagerModal
        show={showManageApplicationsModal}
        setShow={setShowManageApplicationsModal}
      />
    </>
  );
}
