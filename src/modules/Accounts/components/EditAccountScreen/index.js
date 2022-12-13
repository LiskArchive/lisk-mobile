import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useAccounts } from '../../hooks/useAccounts';
import EditAccountForm from '../EditAccountForm';

import getEditAccountScreenStyles from './styles';

export default function EditAccountScreen({ route }) {
  const navigation = useNavigation();

  const { getAccount } = useAccounts();

  const account = getAccount(route.params.metadata.address);

  const { styles } = useTheme({
    styles: getEditAccountScreenStyles(),
  });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title="Edit account name" onPress={navigation.goBack} />

      <EditAccountForm
        mode="screen"
        account={account}
        style={{ container: styles.formContainer }}
      />
    </SafeAreaView>
  );
}
