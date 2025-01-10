/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from 'contexts/ThemeContext';
import IncognitoSvg from 'assets/svgs/IncognitoSvg';
import { settingsUpdated } from 'modules/Settings/store/actions';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';

import getStyles from './AccountHome.styles';
import AccountDetails from '../AccountDetails/AccountDetails';

function AccountHome() {
  const navigation = useNavigation();
  const [currentAccount] = useCurrentAccount();
  const [refreshControl, setRefreshControl] = useState(false);
  const discrete = useSelector((state) => state.settings.discrete);
  const dispatch = useDispatch();
  const { accounts } = useAccounts();
  const { styles } = useTheme({ styles: getStyles() });

  useEffect(() => {
    if (refreshControl) {
      let timeout = setTimeout(() => setRefreshControl(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [refreshControl]);

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
      navigation.navigate('MigrateToL2');
    }
  }, [accounts, navigation]);

  return (
    <NavigationSafeAreaView>
      <ScrollView>
        <View
          style={[styles.row, styles.alignItemsCenter, styles.topContainer]}
          testID="accounts-home-container"
        >
          <TouchableOpacity style={[styles.discreteContainer]} onPress={toggleIncognito}>
            <IncognitoSvg size={1.2} disabled={discrete} />
          </TouchableOpacity>
        </View>

        <AccountDetails account={currentAccount.metadata} />
      </ScrollView>
    </NavigationSafeAreaView>
  );
}

export default React.memo(AccountHome);
