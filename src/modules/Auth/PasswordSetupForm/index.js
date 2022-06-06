import React, { useState } from 'react';
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

const PasswordSetupForm = ({ navigation, styles, t }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accepted, setAccepted] = useState(false);

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
        />
        <Input
          testID="confirm-password"
          innerStyles={{ containerStyle: styles.inputContainer, input: styles.input }}
          label={t('auth.form.confirm_password')}
          secureTextEntry
          onChange={setConfirmPassword}
          value={confirmPassword}
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
            value={accepted}
            onValueChange={setAccepted}
            trackColor={{ true: colors.light.ultramarineBlue }}
          />
        </View>
        <Text style={[styles.actionText, styles.theme.description]} >
          I agree to store my encrypted secret recovery phrase on this device
        </Text>
      </View>
      <PrimaryButton
        title={t('auth.setup.buttons.save_account')}
        onPress={() => { }}
        disabled={!accepted}
      />
    </View>
  </SafeAreaView>;
};

export default withTheme(translate()(PasswordSetupForm), getStyles());
