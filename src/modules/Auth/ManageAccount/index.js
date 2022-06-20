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
import { IconButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import Splash from '../components/splash';
import AccountItem from '../components/AccountItem';
import getStyles from './styles';

const accounts = [
  { username: 'lisker', address: 'lskh358ygvdyvu3wzghrqk4g4dhvurjokyocysjrq' },
  { address: 'lskne6ckg83pzknmwudxw573c9ha7ohnnxdu52gwx' }
];

const ManageAccount = ({
  styles,
  t,
  theme,
}) => {
  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <ScrollView style={styles.container} >
        <Splash animate={false} />
        <View style={[styles.body]}>
          <H2 style={styles.title} >{t('auth.setup.manage_accounts')}</H2>
          {accounts.map(account =>
            <AccountItem key={account.address} username={account.username} address={account.address} />)}
        </View>
      </ScrollView>
      <View style={styles.bottom} >
        <IconButton
          onPress={() => { }}
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
          title={t('auth.setup.buttons.add_another_account')}
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
