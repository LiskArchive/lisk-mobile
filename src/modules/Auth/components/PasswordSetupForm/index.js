import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18next from 'i18next';
import { Switch } from 'react-native-gesture-handler';

import { useTheme } from 'contexts/ThemeContext';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Input from 'components/shared/toolBox/input';
import { P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import colors from 'constants/styleGuide/colors';
import { usePasswordSetupForm } from '../../hooks/usePasswordSetupForm';

import getStyles from './styles';

export default function PasswordSetupForm() {
  const navigation = useNavigation();

  const route = useRoute();

  const { passphrase } = route.params;

  useScreenshotPrevent();

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

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate({
        name: 'PasswordSetupSuccess',
        params: { encryptedAccount, onContinue: () => navigation.navigate('Main') },
      });
    }
  }, [navigation, isSuccess, encryptedAccount]);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton title="auth.setup.passwordSetupTitle" onPress={navigation.goBack} />

      <ScrollView contentContainerStyle={styles.container}>
        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.setup.passwordSetupDescription')}
        </P>

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
          <View style={styles.switch} testID="agree-switch">
            <Switch
              value={isAgreedField.value}
              onValueChange={(value) => isAgreedField.onChange(value)}
              trackColor={{ true: colors.light.ultramarineBlue }}
            />
          </View>

          <P style={[styles.actionText, styles.theme.description]}>
            {i18next.t('auth.form.termsAgreementText')}
          </P>
        </View>
      </ScrollView>

      <View style={[styles.footer]}>
        <PrimaryButton
          onPress={handleSubmit}
          disabled={!isAgreedField.value || isLoading}
          testID="save-account"
        >
          {isLoading ? 'Loading...' : i18next.t('auth.setup.buttons.saveAccountButton')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
