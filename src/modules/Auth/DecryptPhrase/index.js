import React from 'react';
import { SafeAreaView } from 'react-native';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import PasswordForm from '../components/PasswordForm';
import getStyles from './styles';

const DecryptPhrase = ({ styles, navigation, route }) => {
  const { title, address, successRoute } = route.params;

  const onSubmit = () => {
    navigation.navigate(successRoute);
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
