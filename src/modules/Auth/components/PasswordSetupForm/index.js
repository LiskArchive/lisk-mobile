/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
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
import { Controller } from 'react-hook-form';
import { usePasswordSetupForm } from '../../hooks/usePasswordSetupForm';

import getStyles from './styles';

export default function PasswordSetupForm({
  sharedData: data,
  hideNav,
  move,
  currentIndex,
  length,
}) {
  useScreenshotPrevent();

  const navigation = useNavigation();

  const route = useRoute();

  const passphrase = route.params?.passphrase || data.passphrase;

  const { derivationPath } = route.params ?? {};
  const { styles } = useTheme({ styles: getStyles() });

  const [
    { handleSubmit, accountNameField, isAgreedField, formState, control },
    { encryptedAccount, isLoading, isSuccess },
  ] = usePasswordSetupForm(passphrase, derivationPath);

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
      {hideNav ? (
        <HeaderBackButton
          title="auth.setup.passwordSetupTitle"
          onPress={() => move({ moves: -1, data })}
          withProgressBar
          currentIndex={currentIndex}
          length={length}
        />
      ) : (
        <HeaderBackButton title="auth.setup.passwordSetupTitle" onPress={navigation.goBack} />
      )}

      <ScrollView contentContainerStyle={styles.container} testID="password-setup-form">
        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.setup.passwordSetupDescription')}
        </P>

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              testID="enter-password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label={i18next.t('auth.form.passwordLabel')}
              secureTextEntry
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              error={
                formState.errors?.password?.message &&
                i18next.t(formState.errors?.password?.message)
              }
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              testID="confirm-password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label={i18next.t('auth.form.confirmPasswordLabel')}
              secureTextEntry
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              error={
                formState.errors?.confirmPassword?.message &&
                i18next.t(formState.errors?.confirmPassword?.message)
              }
            />
          )}
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
