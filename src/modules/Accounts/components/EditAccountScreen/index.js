import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import EditAccountForm from '../EditAccountForm';

import getEditAccountScreenStyles from './styles';

export default function EditAccountScreen({ route }) {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getEditAccountScreenStyles(),
  });

  const account = route.params;

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title="Edit account name" onPress={navigation.goBack} />

      <EditAccountForm
        account={account}
        mode="screen"
        style={{ container: styles.formContainer }}
      />
    </SafeAreaView>
  );
}
