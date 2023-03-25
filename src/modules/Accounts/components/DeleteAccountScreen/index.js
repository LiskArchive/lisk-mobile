import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import DeleteAccountForm from '../DeleteAccountForm';

import getDeleteAccountScreenStyles from './styles';

export default function DeleteAccountScreen({ route }) {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getDeleteAccountScreenStyles(),
  });

  const account = route.params;

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title="Remove account?" onPress={navigation.goBack} />

      <DeleteAccountForm
        mode="screen"
        account={account}
        style={{ container: styles.formContainer }}
        onCompleted={navigation.goBack}
      />
    </SafeAreaView>
  );
}
