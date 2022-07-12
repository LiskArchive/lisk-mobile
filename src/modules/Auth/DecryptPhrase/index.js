import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import PasswordForm from '../components/PasswordForm';
import getStyles from './styles';

const DecryptPhrase = ({
  styles, account, route, nextStep, sharedData
}) => {
  const navigation = useNavigation();
  const { title } = route.params;
  let address;
  if (sharedData?.encryptedAccount) {
    address = sharedData?.encryptedAccount?.metadata?.address;
  } else {
    address = route.params.address;
  }

  const onSubmit = (password) => {
    const { successRoute } = route.params;
    if (nextStep && typeof nextStep === 'function') {
      const decrpytedAccount = decryptAccount(account, password);
      nextStep({
        ...decrpytedAccount,
        encryptedAccount: sharedData ? sharedData.encryptedAccount : account,
      });
    } else {
      navigation.navigate(successRoute);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBackButton title={title} onPress={navigation.goBack} />
      <PasswordForm address={address} onSubmit={onSubmit} />
    </SafeAreaView>
  );
};

export default withTheme(DecryptPhrase, getStyles());
