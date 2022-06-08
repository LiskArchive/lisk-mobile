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
import getStyles from './styles';
import { passwordValidator } from '../validators';

const PasswordSetupForm = ({ navigation, styles, t }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // eslint-disable-next-line consistent-return
  const submitForm = () => {
    if (!passwordValidator(password)) {
      return setPasswordError('auth.form.errors.password_error');
    }
    if (password !== confirmPassword) {
      return setConfirmPasswordError('auth.form.errors.confirm_password_error');
    }
    // TODO: Call function to add account and navigate to next screen
  };

  useEffect(() => {
    setPasswordError('');
    setConfirmPasswordError('');
  }, [password, confirmPassword]);

  return <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]} >
    <HeaderBackButton
      title="auth.setup.password_setup_title"
      onRightPress={navigation.goBack}
      containerStyle={styles.header}
    />
    <ScrollView contentContainerStyle={styles.container} >
      <Text style={[styles.description, styles.theme.description]} >{t('auth.setup.password_setup_description')}</Text>
      <View>
        <Input
          testID="enter-password"
          innerStyles={{ containerStyle: styles.inputContainer, input: styles.input }}
          label={t('auth.form.enter_password')}
          secureTextEntry
          onChange={setPassword}
          value={password}
          error={passwordError && t(passwordError)}
        />
        <Input
          testID="confirm-password"
          innerStyles={{ containerStyle: styles.inputContainer, input: styles.input }}
          label={t('auth.form.confirm_password')}
          secureTextEntry
          onChange={setConfirmPassword}
          value={confirmPassword}
          error={confirmPasswordError && t(confirmPasswordError)}
        />
        <Input
          testID="account-name"
          innerStyles={{ containerStyle: styles.inputContainer, input: styles.input }}
          label={t('auth.form.account_name')}
          onChange={setAccountName}
          value={accountName}
        />
      </View>
    </ScrollView>
    <View style={styles.container} >
      <View style={styles.actionContainer} >
        <View style={styles.switch} >
          <Switch
            value={isAgreed}
            onValueChange={setIsAgreed}
            trackColor={{ true: colors.light.ultramarineBlue }}
          />
        </View>
        <Text style={[styles.actionText, styles.theme.description]} >
          I agree to store my encrypted secret recovery phrase on this device
        </Text>
      </View>
      <PrimaryButton
        title={t('auth.setup.buttons.save_account')}
        onPress={submitForm}
        disabled={!isAgreed}
      />
    </View>
  </SafeAreaView>;
};

export default withTheme(translate()(PasswordSetupForm), getStyles());