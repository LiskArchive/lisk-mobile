import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { Switch } from 'react-native-gesture-handler';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import colors from 'constants/styleGuide/colors';
import PasswordSetupSuccess from '../PasswordSetupSuccess';

import getStyles from './styles';
import { usePasswordSetupForm } from '../hooks/usePasswordSetupForm';

export default function PasswordSetupForm({ route }) {
  const navigation = useNavigation();

  const { passphrase } = route.params;

  const [
    {
      handleSubmit,
      passwordField,
      confirmPasswordField,
      accountNameField,
      isAgreedField,
      formState,
    },
    { encryptedAccount, isLoading, isSuccess },
  ] = usePasswordSetupForm(passphrase);

  const { styles } = useTheme({ styles: getStyles() });

  const handleContinue = () => navigation.navigate('Main');

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      {isSuccess ? (
        <PasswordSetupSuccess encryptedJson={encryptedAccount} onContinue={handleContinue} />
      ) : (
        <>
          <HeaderBackButton
            title="auth.setup.passwordSetupTitle"
            onPress={navigation.goBack}
            containerStyle={styles.header}
          />

          <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.description, styles.theme.description]}>
              {i18next.t('auth.setup.passwordSetupDescription')}
            </Text>

            <Input
              testID="enter-password"
              value={passwordField.value}
              onChange={passwordField.onChange}
              label={i18next.t('auth.form.passwordLabel')}
              secureTextEntry
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              error={formState.errors?.password?.message}
            />

            <Input
              testID="confirm-password"
              value={confirmPasswordField.value}
              onChange={confirmPasswordField.onChange}
              label={i18next.t('auth.form.confirmPasswordLabel')}
              secureTextEntry
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              error={formState.errors?.confirmPassword?.message}
            />

            <Input
              testID="account-name"
              value={accountNameField.value}
              onChange={accountNameField.onChange}
              label={i18next.t('auth.form.accountNameLabel')}
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
            />

            <View style={styles.actionContainer}>
              <View style={styles.switch}>
                <Switch
                  value={isAgreedField.value}
                  onValueChange={(value) => isAgreedField.onChange(value)}
                  trackColor={{ true: colors.light.ultramarineBlue }}
                />
              </View>

              <Text style={[styles.actionText, styles.theme.description]}>
                {i18next.t('auth.form.termsAgreementText')}
              </Text>
            </View>
          </ScrollView>

          <View style={[styles.footer]}>
            <PrimaryButton onPress={handleSubmit} disabled={!isAgreedField.value || isLoading}>
              {isLoading ? 'Loading...' : i18next.t('auth.setup.buttons.saveAccountButton')}
            </PrimaryButton>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
