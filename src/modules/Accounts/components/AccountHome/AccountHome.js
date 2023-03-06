/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { TouchableOpacity, ScrollView, RefreshControl, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from 'contexts/ThemeContext';
import { useAccountTransactionsQuery } from 'modules/Accounts/api/useAccountTransactionsQuery';
import { settingsUpdated } from 'modules/Settings/store/actions';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import ApplicationSwitcher from 'modules/BlockchainApplication/components/ApplicationSwitcher';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import IncognitoSvg from 'assets/svgs/IncognitoSvg';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';
import { useAccountTokensQuery } from '../../api/useAccountTokensQuery';
import { NO_OF_TRANSACTIONS_ON_OVERVIEW } from '../../../Transactions/components/TransactionList/TransactionList.constants';
import { NO_OF_TOKENS_ON_OVERVIEW } from '../TokenList/TokenList.constants';
import AccountDetails from '../AccountDetails/AccountDetails';

import getStyles from './AccountHome.styles';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In.
 */
function AccountHome() {
  const navigation = useNavigation();

  const [currentAccount] = useCurrentAccount();

  const { refetch: refetchTokens, isRefetching: isRefetchingTokens } = useAccountTokensQuery(
    currentAccount.metadata.address,
    {
      config: {
        params: { limit: NO_OF_TOKENS_ON_OVERVIEW },
      },
    }
  );

  const { refetch: refetchTransactions, isRefetching: isRefetchingTransactions } =
    useAccountTransactionsQuery(currentAccount.metadata.address, {
      config: {
        params: { limit: NO_OF_TRANSACTIONS_ON_OVERVIEW },
      },
    });

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

  const handleRefresh = () => {
    refetchTokens();
    refetchTransactions();
  };

  const isRefreshing = isRefetchingTokens || isRefetchingTransactions;

  return (
    <>
      <NavigationSafeAreaView>
        <ScrollView
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        >
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
        </ScrollView>
      </NavigationSafeAreaView>
    </>
  );
}

export default React.memo(AccountHome);
