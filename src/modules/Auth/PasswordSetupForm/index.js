import React, { useEffect, useState } from 'react';
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
import DropDownHolder from 'utilities/alert';
import { useAccounts, useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { passwordValidator } from '../validators';
import PasswordSetupSuccess from '../PasswordSetupSuccess';
import { useEncryptAccount } from '../hooks/useEncryptAccount';

import getStyles from './styles';

// eslint-disable-next-line max-statements
export default function PasswordSetupForm({ route }) {
  const navigation = useNavigation();

  const { encryptAccount } = useEncryptAccount();
  const { setAccount } = useAccounts();
  const [, setCurrentAccount] = useCurrentAccount();
  const { passphrase } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [encryptedJSON, setEncryptedJSON] = useState();

  const { styles } = useTheme({ styles: getStyles() });

  // eslint-disable-next-line max-statements, consistent-return
  const handleSubmit = async () => {
    try {
      if (!passwordValidator(password)) {
        return setPasswordError('auth.form.errors.passwordError');
      }
      if (password !== confirmPassword) {
        return setConfirmPasswordError('auth.form.errors.confirmPasswordError');
      }
      const data = await encryptAccount({
        recoveryPhrase: passphrase,
        password,
        name: accountName,
      });
      setEncryptedJSON(data);
      setIsSuccess(true);
      setAccount(data);
      setCurrentAccount(data);
    } catch (error) {
      return DropDownHolder.error(
        i18next.t('Error'),
        i18next.t('auth.setup.decryptPassphraseError')
      );
    }
  };

  useEffect(() => {
    setPasswordError('');
    setConfirmPasswordError('');
  }, [password, confirmPassword]);

  const onContinue = () => navigation.navigate('AccountsManagerScreen');

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      {isSuccess ? (
        <PasswordSetupSuccess encryptedJson={encryptedJSON} onContinue={onContinue} />
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
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              label={i18next.t('auth.form.enterPassword')}
              secureTextEntry
              onChange={setPassword}
              value={password}
              error={passwordError && i18next.t(passwordError)}
            />

            <Input
              testID="confirm-password"
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              label={i18next.t('auth.form.confirmPassword')}
              secureTextEntry
              onChange={setConfirmPassword}
              value={confirmPassword}
              error={confirmPasswordError && i18next.t(confirmPasswordError)}
            />

            <Input
              testID="account-name"
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              label={i18next.t('auth.form.accountName')}
              onChange={setAccountName}
              value={accountName}
            />

            <View style={styles.actionContainer}>
              <View style={styles.switch}>
                <Switch
                  value={isAgreed}
                  onValueChange={setIsAgreed}
                  trackColor={{ true: colors.light.ultramarineBlue }}
                />
              </View>

              <Text style={[styles.actionText, styles.theme.description]}>
                I agree to store my encrypted secret recovery phrase on this device
              </Text>
            </View>
          </ScrollView>

          <View style={[styles.footer]}>
            <PrimaryButton
              title={i18next.t('auth.setup.buttons.saveAccount')}
              onPress={handleSubmit}
              disabled={!isAgreed}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
