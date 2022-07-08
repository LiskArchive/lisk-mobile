import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import PasswordForm from '../components/PasswordForm';
import getStyles from './styles';

const DecryptPhrase = ({
  styles, account, route, nextStep
}) => {
  const navigation = useNavigation();
  const { title, address, successRoute } = route.params;

  const onSubmit = (password) => {
    if (nextStep && typeof nextStep === 'function') {
      const decrpytedAccount = decryptAccount(account, password);
      nextStep({ ...decrpytedAccount, encryptedAccount: account });
    } else {
      navigation.navigate(successRoute);
    }
  };

  return <SafeAreaView style={styles.container} >
    <HeaderBackButton
      title={title}
      onPress={navigation.goBack}
    />
    <PasswordForm address={address} onSubmit={onSubmit} />
  </SafeAreaView>;
};

export default withTheme(DecryptPhrase, getStyles());
