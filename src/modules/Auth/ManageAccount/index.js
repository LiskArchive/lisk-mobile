/* eslint-disable max-len */
import React from 'react';
import {
  View,
  SafeAreaView,
} from 'react-native';
import { translate } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import withTheme from 'components/shared/withTheme';
import { H2 } from 'components/shared/toolBox/typography';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { IconButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import Splash from '../components/splash';
import AccountItem from '../components/AccountItem';
import getStyles from './styles';

const ManageAccount = ({
  styles,
  t,
  theme,
  navigation,
}) => {
  const { accounts } = useAccounts();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <ScrollView style={styles.container} >
        <Splash animate={false} />
        <View style={[styles.body]}>
          <H2 style={styles.title} >{t('auth.setup.manage_accounts')}</H2>
          {accounts.map(account =>
            <AccountItem key={account.metadata.address} username={account.metadata.name} address={account.metadata.address} />)}
        </View>
      </ScrollView>
      <View style={styles.bottom} >
        <IconButton
          onPress={() => navigation.navigate('AuthMethod')}
          color={colors.light.ultramarineBlue}
          icon="user"
          iconStyle={styles.icon}
          iconSize={20}
          title={t('auth.setup.buttons.add_another_account')}
          style={[styles.button, styles.outline]}
        />
        <IconButton
          onPress={() => { }}
          color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
          icon="delete-bookmark"
          iconStyle={styles.icon}
          iconSize={20}
          titleStyle={[styles.theme.remove]}
          title={t('auth.setup.buttons.remove_account')}
          style={[styles.button, styles.outline]}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(
  translate()(ManageAccount),
  getStyles()
);
