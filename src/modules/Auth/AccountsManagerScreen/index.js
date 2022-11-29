import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'hooks/useTheme';
import AccountsManager from 'modules/Accounts/components/AccountsManager';
import { useApplicationsMetaQuery } from 'modules/BlockchainApplication/api/useApplicationsMetaQuery';
import { useApplicationsManagement } from 'modules/BlockchainApplication/hooks/useApplicationsManagement';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';

import Splash from '../components/splash';

import getAccountsManagerScreenStyles from './styles';

export default function AccountsManagerScreen() {
  const { data: chainMetaData } = useApplicationsMetaQuery();
  const { addApplication } = useApplicationsManagement();
  const [, setCurrentApplication] = useCurrentApplication();
  const { styles } = useTheme({
    styles: getAccountsManagerScreenStyles(),
  });

  useEffect(() => {
    if (chainMetaData) {
      chainMetaData.data.map((data) => addApplication(data));
      setCurrentApplication(chainMetaData.data[0]);
    }
  }, [chainMetaData]);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <Splash animate={false} />

      <AccountsManager style={{ container: styles.container }} />
    </SafeAreaView>
  );
}
