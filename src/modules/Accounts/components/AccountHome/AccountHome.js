/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from 'contexts/ThemeContext';
import IncognitoSvg from 'assets/svgs/IncognitoSvg';
import { settingsUpdated } from 'modules/Settings/actions';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import ApplicationSwitcher from '../../../BlockchainApplication/components/ApplicationSwitcher';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';

import getStyles from './AccountHome.styles';
import AccountDetails from '../AccountDetails/AccountDetails';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In.
 */
function AccountHome() {
  const navigation = useNavigation();

  const [currentAccount] = useCurrentAccount();

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
            <ApplicationSwitcher />
          </View>
        </View>

        <AccountDetails account={currentAccount.metadata} />
      </NavigationSafeAreaView>
    </>
  );
}

export default React.memo(AccountHome);
