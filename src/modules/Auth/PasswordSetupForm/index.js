import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { translate } from 'react-i18next';
import { Switch } from 'react-native-gesture-handler';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import colors from 'constants/styleGuide/colors';
import {
  useAccounts,
  useCurrentAccount,
} from 'modules/Accounts/hooks/useAccounts';
import getStyles from './styles';
import { passwordValidator } from '../validators';
import PasswordSetupSuccess from '../PasswordSetupSuccess';
import { useEncryptAccount } from '../hooks/useEncryptAccount';

// eslint-disable-next-line max-statements
const PasswordSetupForm = ({
  navigation, styles, t, route
}) => {
  const { encryptAccount } = useEncryptAccount();
  const { setAccount } = useAccounts();
  const [, setCurrentAccount] = useCurrentAccount();
  const { passphrase } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [encryptedJSON, setEncryptedJSON] = useState();

  // eslint-disable-next-line consistent-return
  const submitForm = async () => {
    if (!passwordValidator(password)) {
      return setPasswordError('auth.form.errors.passwordError');
    }
    if (password !== confirmPassword) {
      return setconfirmPasswordError('auth.form.errors.confirmPasswordError');
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
  };

  useEffect(() => {
    setPasswordError('');
    setconfirmPasswordError('');
  }, [password, confirmPassword]);

  const onContinue = () => navigation.navigate('Main');

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      {isSuccess ? (
        <PasswordSetupSuccess
          encryptedJson={encryptedJSON}
          onContinue={onContinue}
        />
      ) : (
        <View>
          <HeaderBackButton
            title="auth.setup.passwordSetupTitle"
            onPress={navigation.goBack}
            containerStyle={styles.header}
          />
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.description, styles.theme.description]}>
              {t('auth.setup.passwordSetupDescription')}
            </Text>
            <View>
              <Input
                testID="enter-password"
                innerStyles={{
                  containerStyle: styles.inputContainer,
                  input: styles.input,
                }}
                label={t('auth.form.enterPassword')}
                secureTextEntry
                onChange={setPassword}
                value={password}
                error={passwordError && t(passwordError)}
              />
              <Input
                testID="confirm-password"
                innerStyles={{
                  containerStyle: styles.inputContainer,
                  input: styles.input,
                }}
                label={t('auth.form.confirmPassword')}
                secureTextEntry
                onChange={setConfirmPassword}
                value={confirmPassword}
                error={confirmPasswordError && t(confirmPasswordError)}
              />
              <Input
                testID="account-name"
                innerStyles={{
                  containerStyle: styles.inputContainer,
                  input: styles.input,
                }}
                label={t('auth.form.accountName')}
                onChange={setAccountName}
                value={accountName}
              />
            </View>
          </ScrollView>
          <View style={styles.container}>
            <View style={styles.actionContainer}>
              <View style={styles.switch}>
                <Switch
                  value={isAgreed}
                  onValueChange={setIsAgreed}
                  trackColor={{ true: colors.light.ultramarineBlue }}
                />
              </View>
              <Text style={[styles.actionText, styles.theme.description]}>
                I agree to store my encrypted secret recovery phrase on this
                device
              </Text>
            </View>
            <PrimaryButton
              title={t('auth.setup.buttons.save_account')}
              onPress={submitForm}
              disabled={!isAgreed}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default withTheme(translate()(PasswordSetupForm), getStyles());
